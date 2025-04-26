"use server";

import { generatePdfSummaryFromGEMINI } from "@/lib/geminiai";
import fetchAndExtractPdfText from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

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
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("summary", summary);
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generatePdfSummaryFromGEMINI(pdfText);
        } catch (error) {
          console.log("Gemini API failed after OpenAI quota exceeded", error);
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
    return {
      success: true,
      message: "Summary generated successfully",
      data: {
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
