
import { GoogleGenAI, Type } from "@google/genai";
import { RoleProfile, CandidateProfile } from "../types";

const MANAGER_SYSTEM_PROMPT = `
You are an expert AI Hiring Agent designed for Indian startup founders. 
Your goal is to collect role requirements in a conversational, WhatsApp-style text interaction.
Follow this flow:
1. Ask for Role Title.
2. Ask for Must-have vs Nice-to-have skills.
3. Ask for Team personality traits.
4. Ask for Trade-offs (e.g. "Will you take a junior who learns fast?").
5. Ask for application instructions (Email/Link).

Keep it professional, concise, and focused on extracting structured data.
`;

const CANDIDATE_SYSTEM_PROMPT = `
You are a helpful AI Career Agent. You pre-screen candidates for exclusive roles.
Flow:
1. Ask for experience summary (Plain English).
2. Ask for top technical/core skills.
3. Ask for work preferences.
4. Ask personality-based questions to gauge fit.

Be encouraging but thorough. Don't let them apply yet.
`;

export const getAgentResponse = async (history: {role: string, content: string}[], userType: 'MANAGER' | 'CANDIDATE') => {
  // Fix: Initialize GoogleGenAI inside the function using process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  const systemInstruction = userType === 'MANAGER' ? MANAGER_SYSTEM_PROMPT : CANDIDATE_SYSTEM_PROMPT;
  
  const response = await ai.models.generateContent({
    model,
    contents: history.map(h => ({ 
      role: h.role === 'assistant' ? 'model' : 'user', 
      parts: [{ text: h.content }] 
    })),
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });

  return response.text;
};

export const generateMatch = async (role: RoleProfile, candidate: CandidateProfile) => {
  // Fix: Initialize GoogleGenAI inside the function using process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-pro-preview';
  const prompt = `
    Analyze fit between Role and Candidate.
    Role: ${JSON.stringify(role)}
    Candidate: ${JSON.stringify(candidate)}
    
    Output JSON with:
    - scores: { skills (0-100), personality (0-100), overall (0-100) }
    - reasoning: Detailed explanation of the fit and trade-offs.
    - category: "personality-first", "skills-first", or "hybrid".
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          scores: {
            type: Type.OBJECT,
            properties: {
              skills: { type: Type.NUMBER },
              personality: { type: Type.NUMBER },
              overall: { type: Type.NUMBER }
            },
            required: ["skills", "personality", "overall"]
          },
          reasoning: { type: Type.STRING },
          category: { type: Type.STRING }
        },
        required: ["scores", "reasoning", "category"]
      }
    }
  });

  // Fix: access text as a property and handle potential undefined
  const responseText = response.text || '{}';
  return JSON.parse(responseText);
};
