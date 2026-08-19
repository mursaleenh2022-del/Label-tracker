import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("Success:", result.response.text());
  } catch (e) {
    console.error("Error:", e.message);
  }
}
main();
