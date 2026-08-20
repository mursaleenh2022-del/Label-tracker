import fs from 'fs';
import { Groq } from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function runComparison() {
  const imagePath = process.argv[2];
  if (!imagePath || !fs.existsSync(imagePath)) {
    console.error('Usage: npx tsx compare_ai.ts <path_to_label_image>');
    process.exit(1);
  }

  const groqApiKey = process.env.GROQ_API_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  let mimeType = 'image/jpeg';
  if (imagePath.endsWith('.png')) mimeType = 'image/png';
  if (imagePath.endsWith('.pdf')) mimeType = 'application/pdf';

  const products = await prisma.product.findMany({ where: { isActive: true }, select: { id: true, name: true } });
  const productListText = products.map(p => `ID: ${p.id} | Name: ${p.name}`).join('\n');

  const prompt = `Analyze this document/image. It is a product label, invoice, or receipt.
  Identify the product name, the quantity received, and a unique reference.

  Here is the list of valid products in our database:
  ${productListText}

  Task 1: Find the closest matching product from the list above. If it exists, return its ID in 'productId' and set 'newProductName' to null.
  Task 2: If the product is ENTIRELY NEW, or you cannot find a match, YOU MUST set 'productId' to null, and YOU MUST extract a descriptive name from the label and return it in 'newProductName'. Do not leave both null.
  Task 3: Identify the Quantity (default to 1 if not found).
  Task 4: Identify a unique 'reference' string from the label (Tracking Number, Order ID, or Recipient Name/Address).

  Return ONLY a raw JSON object with exactly these four keys, and no markdown formatting:
  {"productId": 12, "newProductName": null, "quantity": 50, "reference": "1Z9999"}`;

  console.log('--- 🤖 RUNNING GEMINI ---');
  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey as string);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent([prompt, { inlineData: { data: base64Image, mimeType } }]);
    let text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    console.log(JSON.stringify(JSON.parse(text), null, 2));
  } catch (err: any) {
    console.error('Gemini Failed:', err.message);
  }

  console.log('\n--- 🏎️ RUNNING GROQ (Llama 3.2 Vision) ---');
  try {
    const groq = new Groq({ apiKey: groqApiKey });
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Image}` } },
          ],
        },
      ],
      model: 'llama-3.2-11b-vision-preview',
      temperature: 0
    });
    let text = chatCompletion.choices[0]?.message?.content || '';
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    console.log(JSON.stringify(JSON.parse(text), null, 2));
  } catch (err: any) {
    console.error('Groq Failed:', err.message);
  }

  await prisma.$disconnect();
}
runComparison();
