import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyBTOK9VsvjtmRRw1pr6t_Ak8gmWUVysmzY";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main(prompt) {
  if (!prompt || prompt.trim() === "") {
    return "Please enter a valid prompt.";
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  // v1.x — response.text is a plain string, not a function
  const text =
    typeof response.text === "string"
      ? response.text
      : response?.candidates?.[0]?.content?.parts?.[0]?.text
      ?? "No response received.";

  return String(text);
}

export default main;
