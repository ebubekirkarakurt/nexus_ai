
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (prompt: string, systemInstruction: string = "") => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: systemInstruction || "You are a helpful document assistant named Nexus.",
    }
  });
  return response.text || "Sorry, I couldn't generate a response.";
};

export const analyzeDocument = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this document text and identify 3 potential issues (Spelling, Clarity, Tone). Return in JSON format. Text: ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            type: { type: Type.STRING },
            page: { type: Type.NUMBER },
            originalText: { type: Type.STRING },
            suggestion: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["id", "type", "page", "originalText", "suggestion"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};
