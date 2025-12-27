# Gemini AI Setup for Landing Page Generator

This service uses **Google Gemini AI** to analyze brand documents and generate landing page content.

## Getting Your Gemini API Key

1. **Visit Google AI Studio**: https://aistudio.google.com/app/apikey

2. **Sign in** with your Google account

3. **Create API Key**:
   - Click "Get API Key" or "Create API Key"
   - Choose "Create API key in new project" or select an existing project
   - Copy the generated API key (starts with `AIza...`)

4. **Store the API Key**:

### For Local Development:
```bash
# Add to services/landing-page-generator/.env.local
GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

### For Cloud Run Deployment:
```bash
# Create secret in Google Secret Manager
echo "AIzaSy...your_actual_key_here" | gcloud secrets create GEMINI_API_KEY --data-file=-

# Grant Cloud Run service account access to the secret
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:225226659046-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

## Gemini Model Information

**Model Used**: `gemini-1.5-flash`
- **Why**: Fast, cost-effective, excellent for document analysis
- **Context Window**: 1M tokens (can handle very large documents)
- **Cost**: ~$0.075 per 1M input tokens
- **Speed**: ~2-5 seconds for typical brand document analysis

**Alternative Models**:
- `gemini-1.5-pro`: More powerful, slower, ~$1.25 per 1M tokens
- `gemini-1.5-flash-8b`: Even faster/cheaper, slightly less capable

## What Gemini Analyzes

The AI extracts:
1. **Brand Identity**
   - Company name
   - Tagline suggestions
   - Industry classification
   - Brand personality
   - Target audience

2. **Visual Design**
   - Color palette (HEX codes)
   - Typography recommendations
   - Visual style (minimalist, vibrant, dark, etc.)
   - 3D concepts for landing page

3. **Content Generation**
   - Hero headline and subheadline
   - Value propositions
   - Feature descriptions
   - Call-to-action text
   - Company description

4. **Strategic Recommendations**
   - Brand strengths
   - Growth opportunities
   - Design direction

## Supported Document Types

- **PDF** (.pdf) - Full text extraction
- **DOCX** (.docx) - Full text extraction
- **Images** (.jpg, .png, .webp) - Visual analysis via Gemini Vision

## API Usage Limits

**Free Tier** (AI Studio API Key):
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

For production use, consider:
- **Vertex AI**: Higher limits, better SLAs
- **Pay-as-you-go**: Remove rate limits

## Troubleshooting

### Error: "API key not valid"
- Check that your API key is correctly copied
- Ensure no extra spaces or newlines
- Verify the key is enabled in Google AI Studio

### Error: "Quota exceeded"
- You've hit the free tier limit
- Wait for the rate limit to reset (1 minute)
- Or upgrade to Vertex AI for higher limits

### Analysis returns incomplete data
- The document may be too complex
- Try switching to `gemini-1.5-pro` for better analysis
- Check that the document has clear, readable text

## Cost Estimates

**Per Document Analysis**:
- Average brand doc: 2,000-10,000 tokens
- Cost: ~$0.0002-0.001 per analysis
- **Effectively free** for low/moderate usage

**Monthly Estimates**:
- 100 analyses/month: ~$0.02
- 1,000 analyses/month: ~$0.20
- 10,000 analyses/month: ~$2.00

## Privacy & Security

- API keys are stored in Google Secret Manager
- Documents are sent to Gemini API for processing
- Gemini does NOT use your data for model training (per Google's terms)
- All communication is over HTTPS
- Documents are temporarily stored in Cloud Storage (encrypted at rest)

## Next Steps

After setting up Gemini:
1. Test locally: `cd services/landing-page-generator && npm run dev`
2. Upload a brand document
3. Click "Analyze Document with AI"
4. Review the auto-filled form fields
5. Deploy to Cloud Run with the secret configured

## Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [AI Studio](https://aistudio.google.com/)
- [Pricing](https://ai.google.dev/pricing)
- [Vertex AI (Production)](https://cloud.google.com/vertex-ai/docs/generative-ai/start/quickstarts/api-quickstart)
