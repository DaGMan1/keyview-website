import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Storage } from '@google-cloud/storage';
import * as pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Initialize Cloud Storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  ...(process.env.GCP_KEY_FILE && { keyFilename: process.env.GCP_KEY_FILE }),
});

const bucketName = process.env.GCS_BUCKET_NAME || 'keyview-brand-documents';

async function extractTextFromFile(fileUrl: string, fileType: string): Promise<string> {
  try {
    // Download file from Cloud Storage
    const fileName = fileUrl.split('/').pop() || '';
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const [buffer] = await file.download();

    // Extract text based on file type
    if (fileType === 'application/pdf') {
      const data = await (pdfParse as any).default(buffer);
      return data.text;
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await (mammoth as any).extractRawText({ buffer });
      return result.value;
    } else if (fileType.startsWith('image/')) {
      // For images, we'll send them directly to Gemini for vision analysis
      return '[IMAGE_FILE]';
    } else {
      return buffer.toString('utf-8');
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    throw new Error('Failed to extract text from file');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentUrl, fileType, formData } = body;

    if (!documentUrl) {
      return NextResponse.json(
        { error: 'No document URL provided' },
        { status: 400 }
      );
    }

    // Extract text from the uploaded document
    const documentText = await extractTextFromFile(documentUrl, fileType);

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    // Create the prompt for brand analysis
    const prompt = `You are a professional brand strategist analyzing a brand document. Extract key brand information and generate compelling landing page content.

BRAND DOCUMENT:
${documentText}

${formData ? `
ADDITIONAL CONTEXT FROM USER:
Company Name: ${formData.companyName || 'Not provided'}
Industry: ${formData.industry || 'Not provided'}
Target Audience: ${formData.targetAudience || 'Not provided'}
Brand Personality: ${formData.brandPersonality || 'Not provided'}
Preferred Style: ${formData.preferredStyle || 'Not provided'}
Key Features: ${formData.keyFeatures || 'Not provided'}
Call to Action: ${formData.callToAction || 'Not provided'}
` : ''}

Please analyze this brand document and provide a structured JSON response with the following:

{
  "brandAnalysis": {
    "companyName": "extracted company name",
    "tagline": "suggested tagline based on brand values",
    "industry": "identified industry",
    "brandPersonality": "one of: professional, playful, luxurious, minimal, bold, elegant, modern, traditional",
    "targetAudience": "description of target audience",
    "brandVoice": "description of brand voice and tone"
  },
  "colorPalette": {
    "primary": "#HEX code for primary color",
    "secondary": "#HEX code for secondary color",
    "accent": "#HEX code for accent color",
    "background": "#HEX code for background",
    "text": "#HEX code for text"
  },
  "typography": {
    "headingFont": "recommended font for headings",
    "bodyFont": "recommended font for body text",
    "fontPairing": "explanation of why these fonts work together"
  },
  "landingPageContent": {
    "heroHeadline": "powerful, attention-grabbing headline (max 10 words)",
    "heroSubheadline": "supporting subheadline that expands on the main message (max 20 words)",
    "valuePropositions": [
      "value proposition 1 (1 sentence)",
      "value proposition 2 (1 sentence)",
      "value proposition 3 (1 sentence)"
    ],
    "features": [
      {
        "title": "feature 1 title",
        "description": "brief description of feature 1"
      },
      {
        "title": "feature 2 title",
        "description": "brief description of feature 2"
      },
      {
        "title": "feature 3 title",
        "description": "brief description of feature 3"
      }
    ],
    "callToAction": {
      "primary": "main CTA text (max 3 words)",
      "secondary": "secondary CTA text (max 3 words)"
    },
    "aboutSection": "2-3 sentence company description"
  },
  "visualConcepts": {
    "style": "one of: minimalist, vibrant, dark, light, gradient, corporate",
    "mood": "overall mood/feeling of the brand",
    "keyVisualElements": ["element 1", "element 2", "element 3"],
    "threeDConcepts": [
      "3D concept 1 for landing page",
      "3D concept 2 for landing page"
    ]
  },
  "recommendations": {
    "strengths": ["brand strength 1", "brand strength 2"],
    "opportunities": ["opportunity 1", "opportunity 2"],
    "designDirection": "overall design direction recommendation"
  }
}

IMPORTANT:
1. Extract actual color HEX codes from the document if provided, otherwise suggest appropriate colors based on the brand personality
2. Keep all text concise and impactful
3. Ensure the tone matches the brand personality
4. Make specific recommendations for 3D elements that would enhance the landing page
5. Return ONLY valid JSON, no markdown or additional text`;

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response (Gemini sometimes wraps in markdown code blocks)
    let analysisData;
    try {
      // Remove markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.log('Raw response:', text);
      return NextResponse.json(
        { error: 'Failed to parse AI response', rawResponse: text },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      analysis: analysisData,
      documentUrl,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze document',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
