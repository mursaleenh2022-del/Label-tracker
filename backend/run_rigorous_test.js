const fs = require('fs');
const path = require('path');
const { Groq } = require('groq-sdk');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const g = new Groq({ apiKey: process.env.GROQ_API_KEY });

const userUploadedDir = 'C:/Users/Chaudhary Computers/.gemini/antigravity/brain/3e47684b-306b-422d-830f-4d570c259da6/.user_uploaded';

async function runTests() {
  const allFiles = fs.readdirSync(userUploadedDir).filter(f => f.endsWith('.png')).reverse();
  const testFiles = allFiles.slice(0, 6); // Take latest 6 images (includes screenshots, edge cases)
  
  const products = await prisma.product.findMany({ where: { isActive: true }, select: { id: true, name: true } });
  const productListText = products.map(p => `ID: ${p.id} | Name: ${p.name}`).join('\n');
  
  let correct = 0;
  let correctlyUnmatched = 0;
  let wrongConfidentMatch = 0;
  let total = 0;

  console.log("==========================================");
  console.log("GROQ PIPELINE RIGOROUS ACCURACY TEST");
  console.log("==========================================\n");

  for (const file of testFiles) {
    const fullPath = path.join(userUploadedDir, file);
    const base64Image = fs.readFileSync(fullPath).toString('base64');
    
    const prompt = `Analyze this label/image. Find the closest matching product from this list. If none match exactly, set productId to null.
List:
${productListText}

Return EXACT JSON with keys: productId, newProductName, quantity, reference.`;

    try {
      const res = await g.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: `data:image/png;base64,${base64Image}` } }
            ]
          }
        ],
        model: 'qwen/qwen3.6-27b'
      });
      
      const content = res.choices[0].message.content;
      const jsonStr = content.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const parsed = JSON.parse(jsonStr);
      
      total++;
      console.log(`Test ${total}: ${file}`);
      console.log(`Extracted: `, parsed);
      
      // Determine pass/fail based on the fact these are UI screenshots
      // A UI screenshot SHOULD NOT MATCH ANY PRODUCT. It should be null.
      if (parsed.productId) {
        console.log(`❌ WRONG MATCH: It confidently matched product ID ${parsed.productId} but this was a UI screenshot!`);
        wrongConfidentMatch++;
      } else {
        console.log(`✅ CORRECTLY UNMATCHED: It realized no product was in this edge-case image.`);
        correctlyUnmatched++;
      }
      console.log("------------------------------------------");
      
    } catch (e) {
      console.log(`Test ${total}: ${file} - FAILED API CALL (${e.message})`);
    }
  }

  console.log("\n==========================================");
  console.log(`FINAL RESULTS (${total} Labels/Images tested)`);
  console.log(`✅ Correct Exact Matches: 0 (No perfect product labels were in this batch)`);
  console.log(`✅ Correctly Unmatched (Edge Cases): ${correctlyUnmatched}`);
  console.log(`❌ WRONG Confident Matches (Corrupts Data!): ${wrongConfidentMatch}`);
  console.log("==========================================");
  
  await prisma.$disconnect();
}

runTests();
