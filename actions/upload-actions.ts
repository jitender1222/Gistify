"use server";

import { getDbConnection } from "@/lib/db";
import { formatFileNameAsTitle } from "@/lib/formattedFileName";
import { generatePdfSummaryFromGEMINI } from "@/lib/geminiai";
import fetchAndExtractPdfText from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";

interface PDfSummaryType {
  userId?: string;
  summary: string;
  fileUrl: string;
  title: string;
  fileName: string;
}

export const generatePdfSummary = async (
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) => {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "url generation failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("pdfText", pdfText);
    let summary;
    try {
      summary = await generatePdfSummaryFromGEMINI(pdfText);
      console.log("summary", summary);
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromOpenAI(pdfText);
        } catch (error) {
          console.log("OpenAI quota exceeded after GEMINI API failed ", error);
        }
        throw new Error(
          "Failed to generate summary with available AI providers"
        );
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
    const formattedFileName = formatFileNameAsTitle(fileName);
    console.log(formattedFileName);
    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

const savedPdfSummary = async ({
  userId,
  summary,
  fileUrl,
  title,
  fileName,
}: {
  userId: string;
  summary: string;
  fileUrl: string;
  title: string;
  fileName: string;
}) => {
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`INSERT into pdf_summaries(
      user_id,
      summary_text,
      original_file_url,
      title,
      file_name
    ) VALUES(
      ${userId},
      ${summary},
      ${fileUrl},
      ${title},
      ${fileName}
    ) RETURNING id,summary_text `;
    return savedSummary;
  } catch (error) {
    console.log("error while saving the pdf", error);
  }
};

export const storePDFSummary = async ({
  summary,
  fileUrl,
  title,
  fileName,
}: PDfSummaryType) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    let savedSummary: any = await savedPdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save the summary,please try again",
      };
    }

    return {
      success: true,
      message: "PDF Summary saved successfully",
      data: savedSummary,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error Saving PDF summary",
    };
  }
};
