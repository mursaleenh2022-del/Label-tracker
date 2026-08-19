import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const extractLabelData = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No document uploaded' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Server configuration error: Gemini API key missing.');
    }

    // Fetch all active products from the database
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { id: true, name: true }
    });

    const productListText = products.map(p => `ID: ${p.id} | Name: ${p.name}`).join('\n');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const inlineData = {
      data: req.file.buffer.toString("base64"),
      mimeType: req.file.mimetype
    };

    const prompt = `Analyze this document/image. It is a product label, invoice, or receipt.
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

    const result = await model.generateContent([prompt, { inlineData }]);
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch(e) {
      console.log('Failed to parse Gemini output:', text);
      return res.status(500).json({ success: false, error: 'Failed to understand label format.' });
    }

    let finalProductId = parseInt(parsedData.productId) || null;
    let newlyCreatedProduct = null;

    // Auto-create new product if the AI identified one that wasn't in the list
    if (!finalProductId && parsedData.newProductName) {
      try {
        const created = await prisma.product.create({
          data: { name: parsedData.newProductName }
        });
        finalProductId = created.id;
        newlyCreatedProduct = created;
      } catch (err) {
        // If it fails (e.g., unique constraint on name), just find the existing one
        const existing = await prisma.product.findUnique({
          where: { name: parsedData.newProductName }
        });
        if (existing) {
          finalProductId = existing.id;
        }
      }
    }

    return res.json({ 
      success: true, 
      suggestedProductId: finalProductId,
      suggestedQty: parseInt(parsedData.quantity) || 1,
      suggestedReference: parsedData.reference || '',
      newlyCreatedProduct
    });
  } catch (error: any) {
    console.error('Gemini error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to read image using AI. ' + (error.message || '') 
    });
  }
};
