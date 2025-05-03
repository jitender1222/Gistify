import { SUMMARY_SYSTEM_PROMPT } from "@/app/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generatePdfSummaryFromGEMINI(pdfText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });
    console.log("inside model", model);
    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, 
        easy-to-read summary with contextually relevant 
        emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };
    console.log("prompt", prompt);
    const result = await model.generateContent(prompt);
    console.log("respnse Gemini", result);
    const response = await result.response;

    if (!response.text()) {
      throw new Error("Empty response from Gemini Api");
    }
    return response.text();
  } catch (error) {
    console.log("error while generating the code", error);
  }
}
