import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const extractLabelData = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No document uploaded' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY; // Kept for fallback validation in block

    // Fetch all active products from the database
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { id: true, name: true }
    });

    const productListText = products.map(p => `ID: ${p.id} | Name: ${p.name}`).join('\n');

    const aiProvider = process.env.AI_PROVIDER || 'gemini'; // Default to groq now
    const originalName = req.file.originalname || 'unknown_file';
    const prompt = `Analyze this document/image. It is a product label, invoice, or receipt. The file was uploaded with the filename: "${originalName}". Sometimes the product name is in this filename if the label itself does not have it.
    Identify the product name, the quantity received, and a unique reference.

    Here is the list of valid products in our database:
    ${productListText}

    Task 1: Find the closest matching product from the list above. If it exists, return its ID in 'productId' and set 'newProductName' to null.
    Task 2: If the product is ENTIRELY NEW, or you cannot find a match, YOU MUST set 'productId' to null, and YOU MUST extract a descriptive name from the label and return it in 'newProductName'. Do not leave both null.
    Task 3: Identify the Quantity (default to 1 if not found).
    Task 4: Identify a unique 'reference' string from the label (Tracking Number, Order ID, or Recipient Name/Address).

    Return ONLY a raw JSON object with exactly these four keys, and no markdown formatting:
    {"productId": 12, "newProductName": null, "quantity": 50, "reference": "1Z9999"}
    or
    {"productId": null, "newProductName": "Brand New Item 50ml", "quantity": 1, "reference": "John Doe, NY"}`;

    let text = "";

    if (aiProvider === 'groq') {
      const groqApiKey = process.env.GROQ_API_KEY;
      if (!groqApiKey) throw new Error('Server configuration error: GROQ_API_KEY missing.');
      const groq = new Groq({ apiKey: groqApiKey });
      
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
                },
              },
            ],
          },
        ],
        model: "llama-3.2-11b-vision-preview",
        temperature: 0
      });
      text = chatCompletion.choices[0]?.message?.content || "";
      
    } else {
      if (!apiKey) throw new Error('Server configuration error: Gemini API key missing.');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

      const inlineData = {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype
      };
      
      let result;
      try {
        result = await model.generateContent([prompt, { inlineData }]);
      } catch (geminiErr: any) {
        if (geminiErr.message && (geminiErr.message.includes('503') || geminiErr.message.includes('429'))) {
          console.log('Gemini 3.6 overloaded, waiting 2 seconds and retrying...');
          await new Promise(r => setTimeout(r, 2000));
          result = await model.generateContent([prompt, { inlineData }]);
        } else {
          throw geminiErr;
        }
      }
      text = result.response.text();
    }
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch(e) {
      console.log('Failed to parse Gemini output:', text);
      return res.status(500).json({ success: false, error: 'Failed to understand label format.' });
    }

    let finalProductId = parseInt(parsedData.productId) || null;
    let isUnmatched = false;

    if (!finalProductId && parsedData.newProductName) {
      isUnmatched = true;
    }

    return res.json({ 
      success: true,
      isUnmatched,
      suggestedProductId: finalProductId,
      suggestedNewProductName: parsedData.newProductName || null,
      suggestedQty: parseInt(parsedData.quantity) || 1,
      suggestedReference: parsedData.reference || ''
    });
  } catch (error: any) {
    console.error('Gemini error:', error);
    let errorMessage = 'Failed to read image using AI.';
    if (error.message && error.message.includes('429')) {
      errorMessage = 'AI is busy — please wait a moment and try again.';
    } else {
      errorMessage += ' ' + (error.message || '');
    }
    return res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
};
