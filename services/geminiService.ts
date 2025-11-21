import { GoogleGenAI } from "@google/genai";
import { PurchaseRequest } from "../types";

// Initialize Gemini Client
// Note: Process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateConfirmationMessage = async (request: PurchaseRequest): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    const prompt = `
      A customer named ${request.customerName} just purchased a digital artwork named "${request.artTitle}" for $${request.price}.
      Write a short, elegant, and artistic "Thank You" note or a "Certificate of Authenticity" snippet that we can include in their email receipt.
      Keep it under 50 words. Professional and sophisticated tone.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Thank you for your purchase. Your art piece is being prepared.";
  } catch (error) {
    console.error("Gemini generation failed:", error);
    return "Thank you for your purchase. We have received your order.";
  }
};