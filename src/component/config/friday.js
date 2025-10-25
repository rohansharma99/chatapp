

import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY="AIzaSyDq7Gi1VqAlOy8jRt77iPPjfUYq8tT0-wI"
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:GEMINI_API_KEY});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
     
  });
  
  console.log(response.text);
  return response.text;
 
}

 export default  main;




