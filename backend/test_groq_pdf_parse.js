const fs = require('fs');
const pdf = require('pdf-parse');
const { Groq } = require('groq-sdk');
require('dotenv').config();

async function run() {
  const dataBuffer = fs.readFileSync("D:/Dashboard ecommerce/backend/1unit Stronger With You Intensely by Armani cologne men's EDP 3.3po.pdf");
  const data = await pdf(dataBuffer);
  const text = data.text;
  
  const g = new Groq();
  const prompt = `Analyze this label text:\n"${text}"\n\nTask 1: Find the closest matching product from the list. If it exists, return its ID in productId and set newProductName to null.\nTask 2: If the product is ENTIRELY NEW, set productId to null and return a descriptive name in newProductName.\nTask 3: Identify Quantity.\nTask 4: Identify reference string.\n\nList: \nID: 15 | Name: Armani Stronger With You Intensely 100ml\n\nReturn EXACT JSON.`;
  
  try {
    const res = await g.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'qwen/qwen3.6-27b'
    });
    console.log(res.choices[0].message.content);
  } catch(e) {
    console.error(e);
  }
}
run();
