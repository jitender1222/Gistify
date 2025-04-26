"use server";

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
