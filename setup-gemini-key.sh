#!/bin/bash

# Setup script for Gemini API Key in Google Secret Manager

echo "========================================="
echo "Gemini API Key Setup for KeyView Platform"
echo "========================================="
echo ""

# Check if API key is provided
if [ -z "$1" ]; then
    echo "❌ Error: No API key provided"
    echo ""
    echo "Usage: ./setup-gemini-key.sh YOUR_GEMINI_API_KEY"
    echo ""
    echo "To get your Gemini API key:"
    echo "1. Visit: https://aistudio.google.com/app/apikey"
    echo "2. Sign in with your Google account"
    echo "3. Click 'Create API Key'"
    echo "4. Copy the key (starts with AIza...)"
    echo ""
    echo "Then run:"
    echo "  ./setup-gemini-key.sh AIzaSy...your_key_here"
    echo ""
    exit 1
fi

API_KEY="$1"

echo "✓ API Key provided: ${API_KEY:0:10}...${API_KEY: -4}"
echo ""

# Create or update the secret
echo "Creating/updating secret in Google Secret Manager..."
echo "$API_KEY" | gcloud secrets create GEMINI_API_KEY --data-file=- 2>/dev/null

if [ $? -ne 0 ]; then
    echo "Secret already exists. Updating..."
    echo "$API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-
fi

if [ $? -eq 0 ]; then
    echo "✓ Secret created/updated successfully"
else
    echo "❌ Failed to create/update secret"
    exit 1
fi

echo ""
echo "Granting access to Cloud Run service account..."

# Grant access to the Cloud Run compute service account
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
    --member="serviceAccount:225226659046-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor" \
    --quiet

if [ $? -eq 0 ]; then
    echo "✓ IAM permissions granted"
else
    echo "❌ Failed to grant IAM permissions"
    exit 1
fi

echo ""
echo "Updating local .env.local file..."

# Update local .env.local file
ENV_FILE="services/landing-page-generator/.env.local"
if [ -f "$ENV_FILE" ]; then
    # Check if GEMINI_API_KEY already exists in file
    if grep -q "GEMINI_API_KEY" "$ENV_FILE"; then
        # Update existing line
        sed -i.bak "s/GEMINI_API_KEY=.*/GEMINI_API_KEY=$API_KEY/" "$ENV_FILE"
        rm -f "$ENV_FILE.bak"
        echo "✓ Updated GEMINI_API_KEY in $ENV_FILE"
    else
        # Add new line
        echo "GEMINI_API_KEY=$API_KEY" >> "$ENV_FILE"
        echo "✓ Added GEMINI_API_KEY to $ENV_FILE"
    fi
else
    echo "⚠️  $ENV_FILE not found. Creating it..."
    cat > "$ENV_FILE" <<EOL
GCP_PROJECT_ID=key-view-website
GCS_BUCKET_NAME=keyview-brand-documents
GCP_KEY_FILE=/Users/garrymans/Documents/App Dev/Key-View-website/GCP_SA_KEY.json
GEMINI_API_KEY=$API_KEY
EOL
    echo "✓ Created $ENV_FILE with API key"
fi

echo ""
echo "========================================="
echo "✅ Gemini API Key Setup Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Test locally:"
echo "   cd services/landing-page-generator"
echo "   npm run dev"
echo ""
echo "2. Deploy to Cloud Run:"
echo "   gh workflow run deploy-services.yml -f service=landing-page-generator"
echo ""
echo "3. Test the AI analysis:"
echo "   - Visit: https://landing-page-generator-6yap3jdvaa-ts.a.run.app"
echo "   - Upload a brand document"
echo "   - Click 'Analyze Document with AI'"
echo ""
