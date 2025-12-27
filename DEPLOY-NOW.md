# Deploy Landing Page Generator with Gemini AI

## Quick Deploy Instructions

Run these commands in order:

### 1. Create Placeholder Secret (1 minute)
```bash
# Create placeholder Gemini API key secret
echo "PLACEHOLDER_UPDATE_LATER" | gcloud secrets create GEMINI_API_KEY --data-file=-

# Grant Cloud Run access to the secret
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:225226659046-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 2. Deploy to Cloud Run (5 minutes)
```bash
cd /Users/garrymans/Documents/App\ Dev/Key-View-website
gh workflow run deploy-services.yml -f service=landing-page-generator
```

### 3. Watch Deployment
```bash
# Get the run ID
gh run list --workflow=deploy-services.yml --limit=1

# Watch it (replace with actual ID)
gh run watch <RUN_ID>
```

---

## After Deployment - Update with Real API Key

### Get Gemini API Key
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

### Update the Secret
```bash
# Update the placeholder with your real key
echo "AIzaSy...your_real_key" | gcloud secrets versions add GEMINI_API_KEY --data-file=-
```

That's it! The service will automatically use the new key on the next request.

---

## Test URLs

**Landing Page Generator**: https://landing-page-generator-6yap3jdvaa-ts.a.run.app

**Test Flow**:
1. Upload a brand document (PDF/DOCX)
2. Click "Analyze Document with AI"
3. Form will auto-fill (once you add real API key)

---

## Troubleshooting

### If secret already exists
```bash
# Just update it instead
echo "PLACEHOLDER_UPDATE_LATER" | gcloud secrets versions add GEMINI_API_KEY --data-file=-
```

### Check deployment status
```bash
gcloud run services describe landing-page-generator --region=australia-southeast1
```

### View logs
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=landing-page-generator" --limit=20
```
