
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ProjectArchitecture } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.VITE_GOOGLE_API_KEY || '' });
  }

  async generateArchitecture(prompt: string): Promise<ProjectArchitecture> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Design a professional Next.js architecture for: ${prompt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectName: { type: Type.STRING },
            description: { type: Type.STRING },
            folderStructure: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            techStack: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            keyComponents: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  purpose: { type: Type.STRING }
                },
                required: ["name", "purpose"]
              }
            }
          },
          required: ["projectName", "description", "folderStructure", "techStack", "keyComponents"]
        },
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    return JSON.parse(response.text || '{}') as ProjectArchitecture;
  }

  async fetchTrends() {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "What are the top 5 trending technologies and patterns in the Next.js ecosystem for 2024? Include real sources.",
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'External Resource',
      uri: chunk.web?.uri || '#'
    })) || [];

    return {
      text: response.text,
      sources
    };
  }
}

export const geminiService = new GeminiService();
