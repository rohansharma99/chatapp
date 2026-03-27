import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyBlFqzJjXGGxIq5svPgaXoHF5qOVlAVZe8";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main(prompt) {
  if (!prompt || prompt.trim() === "") {
    return "Please enter a valid prompt.";
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const text =
    response?.text?.() ??
    response?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "No response received.";

  return String(text);
}

export default main;
