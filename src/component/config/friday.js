

import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY="AIzaSyBlFqzJjXGGxIq5svPgaXoHF5qOVlAVZe8"
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:GEMINI_API_KEY});

async function main(prompt) {
  if (!prompt || prompt.trim() === "") {  // ✅ Empty check
    return "Please enter a valid prompt.";
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",  // ✅ Model fix
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],  // ✅ Format fix
      }
    ],
  });
  
  return response.text;
}

export default main;




