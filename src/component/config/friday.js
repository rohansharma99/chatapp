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
      }
    ],
  });

  // Safely extract text with fallbacks
  const text =
    response?.text?.() ??                                          // older SDK
    response?.candidates?.[0]?.content?.parts?.[0]?.text ??       // newer SDK
    "No response received.";

  return String(text); // guarantee a string is always returned
}

export default main;
