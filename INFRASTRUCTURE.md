# KeyView Platform - Current Infrastructure Documentation

**Last Updated**: 2025-12-26 11:20 AEST
**Status**: Phase 9 - Landing Page Generator Deployed
**Live URLs**:
- Website: https://keyview-website-6yap3jdvaa-ts.a.run.app ✅
- N8N: https://n8n-service-6yap3jdvaa-ts.a.run.app ✅
- Landing Page Generator: https://landing-page-generator-6yap3jdvaa-ts.a.run.app ✅

---

## Table of Contents
1. [Overview](#overview)
2. [Repository Structure](#repository-structure)
3. [Google Cloud Platform Setup](#google-cloud-platform-setup)
4. [GitHub Setup](#github-setup)
5. [Deployment Pipeline](#deployment-pipeline)
6. [Files & Configuration](#files--configuration)
7. [Credentials & Secrets](#credentials--secrets)
8. [External Integrations](#external-integrations)
9. [Next Steps](#next-steps)

---

## Overview

### What We've Built
A static website deployment system with automated CI/CD that:
- Hosts a static HTML website on Google Cloud Run
- Automatically deploys when code is pushed to GitHub
- Uses Docker containers with nginx for serving content
- Has proper security and permissions configured

### Current Architecture
```
Developer Machine (Local)
    │
    ├─ Repository: /Users/garrymans/Documents/App Dev/Key-View-website/
    │   ├─ public/index.html (website content)
    │   ├─ Dockerfile (container definition)
    │   ├─ nginx.conf (web server config)
    │   ├─ cloudbuild.yaml (GCP build instructions)
    │   └─ .github/workflows/deploy-to-cloud-run.yml (CI/CD pipeline)
    │
    ▼ (git push)
    │
GitHub Repository
    │   Repository: https://github.com/DaGMan1/keyview-website.git
    │   Owner: DaGMan1
    │   Branch: main
    │
    ▼ (triggers on push to main)
    │
GitHub Actions Workflow
    │   Workflow: "Deploy to Cloud Run"
    │   Uses Secret: GCP_SA_KEY (service account credentials)
    │
    ▼ (authenticates & submits build)
    │
Google Cloud Platform
    │   Project ID: key-view-website
    │   Project Number: 225226659046
    │   Region: australia-southeast1
    │
    ├─ Cloud Build
    │   │   Builds Docker image from Dockerfile
    │   │   Tags: gcr.io/key-view-website/keyview-website:$COMMIT_SHA
    │   └─ Pushes to Container Registry
    │
    ├─ Container Registry (GCR)
    │   │   Stores Docker images
    │   └─ URL: gcr.io/key-view-website/keyview-website
    │
    └─ Cloud Run
        │   Service Name: keyview-website
        │   Region: australia-southeast1
        │   Port: 8080
        │   Public Access: Enabled (--allow-unauthenticated)
        └─ Live URL: https://keyview-website-6yap3jdvaa-ts.a.run.app
```

---

## Repository Structure

### Current Files
```
Key-View-website/
├── .git/                           # Git repository data
├── .github/
│   └── workflows/
│       └── deploy-to-cloud-run.yml # GitHub Actions CI/CD pipeline
├── public/
│   └── index.html                  # Static website homepage
├── .dockerignore                   # Files to exclude from Docker build
├── .gitignore                      # Files to exclude from Git
├── Dockerfile                      # Docker container definition
├── GCP_SA_KEY.json                 # Service account credentials (NOT in Git)
├── cloudbuild.yaml                 # Cloud Build configuration
├── nginx.conf                      # Nginx web server configuration
├── ROADMAP.md                      # Project roadmap (where we're going)
├── INFRASTRUCTURE.md               # This file (where we are)
└── README.md                       # Project README
```

### File Purposes

#### `.github/workflows/deploy-to-cloud-run.yml`
**Purpose**: Automated deployment pipeline
**Triggers**: Push to `main` branch or manual trigger
**What it does**:
1. Checks out code from GitHub
2. Authenticates to GCP using service account
3. Submits build to Cloud Build
4. Deploys to Cloud Run
5. Outputs the live URL

**Key Configuration**:
- Project ID: `key-view-website`
- Region: `australia-southeast1`
- Service Name: `keyview-website`
- Uses GitHub Secret: `GCP_SA_KEY`

#### `public/index.html`
**Purpose**: Website homepage
**Current Content**: Welcome page with gradient background
**Features**:
- Responsive design
- Shows service status
- Lists tech stack badges (Cloud Run, Docker, nginx, CI/CD)

#### `Dockerfile`
**Purpose**: Defines the Docker container
**Base Image**: `nginx:alpine`
**What it does**:
1. Copies `public/` folder to nginx html directory
2. Copies custom nginx configuration
3. Exposes port 8080 (Cloud Run requirement)
4. Starts nginx web server

**Port**: 8080 (Cloud Run requires non-root ports)

#### `nginx.conf`
**Purpose**: Web server configuration
**Key Settings**:
- Listens on port 8080
- Serves files from `/usr/share/nginx/html`
- Default file: `index.html`
- Gzip compression enabled
- MIME types configured

#### `cloudbuild.yaml`
**Purpose**: Instructions for Google Cloud Build
**Steps**:
1. Build Docker image
2. Push to Container Registry
3. Deploy to Cloud Run with configuration

**Configuration**:
- Image tag includes commit SHA for versioning
- Auto-provisions SSL certificates
- Allows unauthenticated access (public website)

#### `.dockerignore`
**Purpose**: Exclude files from Docker build
**Excludes**:
- .git/ (version control)
- .github/ (CI/CD configs)
- node_modules/ (dependencies)
- GCP_SA_KEY.json (credentials - CRITICAL)
- Documentation files

#### `.gitignore`
**Purpose**: Exclude files from Git repository
**Critical Exclusions**:
- `GCP_SA_KEY.json` - Service account credentials (NEVER commit)
- `.env` files - Environment variables
- `node_modules/` - Dependencies
- OS files (.DS_Store)

---

## Google Cloud Platform Setup

### Project Details
- **Project Name**: key-view-website
- **Project ID**: `key-view-website`
- **Project Number**: `225226659046`
- **Region**: `australia-southeast1` (Sydney)
- **Owner**: garry@keyview.com.au

### Service Account
**Name**: `github-action-deploy@key-view-website.iam.gserviceaccount.com`
**Purpose**: Allows GitHub Actions to deploy to GCP
**Key File**: `GCP_SA_KEY.json` (stored locally, NOT in Git)

**Assigned IAM Roles**:
1. **Cloud Build Editor** (`roles/cloudbuild.builds.editor`)
   - Submit and manage Cloud Build jobs
   - Required to trigger builds from GitHub

2. **Cloud Run Admin** (`roles/run.admin`)
   - Deploy and manage Cloud Run services
   - Update service configurations

3. **Service Account User** (`roles/iam.serviceAccountUser`)
   - Act as service accounts during deployment
   - Required for Cloud Run to use default compute service account

4. **Storage Admin** (`roles/storage.admin`)
   - Push/pull container images to/from Container Registry
   - Manage GCS buckets used by Cloud Build

### Enabled APIs
- Cloud Build API
- Cloud Run API
- Container Registry API
- Cloud Resource Manager API
- IAM Service Account Credentials API

### Resources Created

#### Cloud Run Service
- **Name**: `keyview-website`
- **Region**: `australia-southeast1`
- **URL**: https://keyview-website-6yap3jdvaa-ts.a.run.app
- **Container Port**: 8080
- **Access**: Public (unauthenticated)
- **Scaling**: Auto (0-100 instances)
- **Memory**: 512Mi (default)
- **CPU**: 1 (default)
- **Request Timeout**: 300s (default)

#### Container Registry
- **Location**: `gcr.io/key-view-website/`
- **Images Stored**: `keyview-website`
- **Tagging Strategy**: Commit SHA
- **Example**: `gcr.io/key-view-website/keyview-website:0c149e3`

#### Cloud Build
- **Trigger**: Manual (via GitHub Actions)
- **Build Time**: ~2-3 minutes
- **Config File**: `cloudbuild.yaml`
- **Logs**: Available in GCP Console

---

## GitHub Setup

### Repository
- **URL**: https://github.com/DaGMan1/keyview-website.git
- **Owner**: DaGMan1
- **Default Branch**: `main`
- **Visibility**: Private (assumed)

### GitHub Secrets
**Location**: Repository Settings → Secrets and variables → Actions

| Secret Name | Purpose | Status |
|------------|---------|--------|
| `GCP_SA_KEY` | Service account JSON key for GCP authentication | ✅ Configured |

**Value**: Complete JSON content from `GCP_SA_KEY.json`

### GitHub Actions Workflows
**Active Workflows**: 1

| Workflow Name | File | Trigger | Status |
|--------------|------|---------|--------|
| Deploy to Cloud Run | `.github/workflows/deploy-to-cloud-run.yml` | Push to `main` or manual | ✅ Active |

**Recent Runs**:
- ✅ Run #20510865114 - Success (2025-12-25)
- ❌ Run #20510760053 - Failed (permissions issue, fixed)
- ❌ Run #20510584083 - Failed (no GCP_SA_KEY, fixed)

---

## Deployment Pipeline

### How It Works

#### 1. Developer Makes Changes
```bash
# Developer edits files locally
vim public/index.html

# Commits changes
git add .
git commit -m "Update homepage"

# Pushes to GitHub
git push origin main
```

#### 2. GitHub Actions Triggered
- Push to `main` branch triggers workflow
- Workflow file: `.github/workflows/deploy-to-cloud-run.yml`
- Runs on: `ubuntu-latest` runner

#### 3. Workflow Steps
```yaml
Step 1: Checkout code
  → Pulls latest code from repository

Step 2: Authenticate to Google Cloud
  → Uses GCP_SA_KEY secret
  → Activates service account credentials

Step 3: Set up Cloud SDK
  → Installs gcloud CLI tools
  → Sets project to key-view-website

Step 4: Configure Docker for GCR
  → Authenticates Docker to push to Container Registry

Step 5: Submit build to Cloud Build
  → Runs: gcloud builds submit --config=cloudbuild.yaml
  → Passes commit SHA as substitution variable

Step 6: Get Cloud Run URL
  → Retrieves service URL after deployment

Step 7: Deployment Summary
  → Outputs deployment info to GitHub UI
```

#### 4. Cloud Build Process
```yaml
Step 1: Build Docker image
  → docker build -t gcr.io/key-view-website/keyview-website:COMMIT_SHA .
  → Uses Dockerfile in repository root

Step 2: Push to Container Registry
  → docker push gcr.io/key-view-website/keyview-website:COMMIT_SHA

Step 3: Deploy to Cloud Run
  → gcloud run deploy keyview-website
  → Uses new container image
  → Region: australia-southeast1
  → Allows unauthenticated access
  → Port: 8080
```

#### 5. Website Live
- Cloud Run provisions new instances
- Traffic automatically routed to new version
- Old version remains available for rollback
- URL remains consistent: https://keyview-website-6yap3jdvaa-ts.a.run.app

### Deployment Timeline
**Total Time**: ~2-3 minutes
- GitHub Actions checkout: ~5 seconds
- GCP authentication: ~3 seconds
- Cloud Build (build + push): ~90 seconds
- Cloud Run deployment: ~30 seconds

---

## Files & Configuration

### Environment Variables

#### In GitHub Actions Workflow
```yaml
PROJECT_ID: key-view-website
REGION: australia-southeast1
SERVICE_NAME: keyview-website
```

#### In Cloud Build
```yaml
COMMIT_SHA: ${{ github.sha }}  # Passed from GitHub Actions
```

#### In Docker Container (Runtime)
```
PORT: 8080  # Set by Cloud Run
```

### Ports Configuration
- **Dockerfile EXPOSE**: 8080
- **nginx.conf listen**: 8080
- **Cloud Run containerPort**: 8080
- **Why 8080**: Cloud Run requires non-privileged ports (>1024)

---

## Credentials & Secrets

### Location of Sensitive Data

#### Local Machine
```
File: GCP_SA_KEY.json
Location: /Users/garrymans/Documents/App Dev/Key-View-website/
Status: ✅ Exists, ❌ NOT in Git (via .gitignore)
Purpose: Service account credentials for GCP
Format: JSON
```

#### GitHub
```
Secret: GCP_SA_KEY
Location: Repository Settings → Secrets → Actions
Status: ✅ Configured
Access: GitHub Actions workflows only
```

#### Google Cloud Platform
```
Service Account: github-action-deploy@key-view-website.iam.gserviceaccount.com
Key ID: 08a0e098d7d1e097adc6dc9f78edb395969b1dd3
Status: ✅ Active
Roles: Cloud Build Editor, Cloud Run Admin, Service Account User, Storage Admin
```

### Security Notes
- ✅ `GCP_SA_KEY.json` is in `.gitignore` (will never be committed)
- ✅ Service account has minimum required permissions
- ✅ GitHub Secret is encrypted and only accessible to workflows
- ⚠️ Cloud Run service is publicly accessible (intended for website)

---

## External Integrations

### Notion
**Status**: ✅ Integrated
**Integration Name**: Key_View
**Token**: Stored in environment variable `NOTION_TOKEN` (see .env file, not in Git)
**Page**: https://www.notion.so/KeyView-Platform-Roadmap-2c64ca3fb25f81f0bef0daeba408fb30
**Purpose**: Project roadmap and task tracking
**Sync Script**: `notion-sync.js` (in repository root)

**Files**:
```
notion-sync.js          # Node.js script to sync roadmap to Notion
.env                    # Environment variables (NOT in Git)
```

**How to Sync**:
```bash
# Set environment variables first
export NOTION_TOKEN="your_token_here"
export NOTION_PAGE_ID="2c64ca3fb25f81f0bef0daeba408fb30"

# Run sync
node notion-sync.js
```

---

## DNS & Domains

### Registered Domains
**Domain**: keyview.com.au
**Registrar**: (To be documented)
**Status**: ⚠️ Not yet mapped to Cloud Run

### Planned Subdomain Mapping
| Subdomain | Purpose | Target | Status |
|-----------|---------|--------|--------|
| keyview.com.au | Main website | Cloud Run (website service) | ⏳ Pending |
| digital.keyview.com.au | TBD | Cloud Run (website or separate) | ⏳ Pending |
| chat.keyview.com.au | N8N instance | Cloud Run (n8n service) | ⏳ Pending |

**Current State**:
- Services accessible via Cloud Run URLs only
- Custom domains not yet configured
- SSL certificates will be auto-provisioned when domains are mapped

---

## Git History

### Commits
```
dd2e2c3 - Add comprehensive project roadmap (2025-12-25)
0c149e3 - Initial commit: KeyView website with Cloud Run deployment (2025-12-25)
```

### Branches
- `main` (default, protected by deployment workflow)

---

## Cost Analysis

### Current Monthly Costs (Estimated)

#### Cloud Run
- **Pricing**: Pay-per-use
- **Current Traffic**: Minimal (testing phase)
- **Estimated Cost**: ~$0-5/month
  - First 2 million requests free
  - 180,000 vCPU-seconds free
  - 360,000 GiB-seconds free

#### Container Registry
- **Storage**: ~50MB per image
- **Current Images**: ~3-5 (during testing)
- **Estimated Cost**: ~$0.10/month
  - $0.026 per GB-month storage

#### Cloud Build
- **Free Tier**: 120 build-minutes/day
- **Current Usage**: ~3 minutes per deployment
- **Estimated Cost**: $0/month (within free tier)

**Total Current Cost**: ~$0.10-5/month

### Future Cost Projections
**Phase 2 (N8N Added)**:
- Cloud Run (N8N always-on): ~$15-30/month
- Cloud SQL PostgreSQL: ~$10-50/month (depends on instance size)
- Total: ~$25-85/month

---

## Next Steps

### Immediate (This Session)
1. ✅ Document current infrastructure (this file)
2. ⏳ Push documentation to GitHub
3. ⏳ Sync to Notion
4. ⏳ Decide on database strategy (Cloud SQL vs Supabase)

### Phase 2 (N8N Deployment)
1. Set up database (PostgreSQL)
2. Create N8N Dockerfile and configuration
3. Deploy N8N to Cloud Run
4. Configure Google Sheets integration
5. Test N8N workflows

### Phase 3 (Custom Domains)
1. Map keyview.com.au to website service
2. Map chat.keyview.com.au to N8N service
3. Update DNS records
4. Verify SSL certificates
5. Test all domains

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: GitHub Actions fails with "PERMISSION_DENIED"
**Cause**: Service account lacks required IAM roles
**Solution**: Grant roles via:
```bash
gcloud projects add-iam-policy-binding key-view-website \
  --member="serviceAccount:github-action-deploy@key-view-website.iam.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.editor"
```

#### Issue: "Could not find block with ID" in Notion sync
**Cause**: Notion page not shared with integration
**Solution**: In Notion page → ••• → Add connections → Select "Key_View"

#### Issue: Website shows 404
**Cause**: nginx not serving files correctly
**Solution**: Check nginx.conf and Dockerfile file paths match

#### Issue: Container fails to start
**Cause**: Port mismatch
**Solution**: Ensure Dockerfile EXPOSE, nginx.conf listen, and Cloud Run --port all use 8080

---

## Team Access

### Google Cloud Platform
- **Owner**: garry@keyview.com.au

### GitHub
- **Repository Owner**: DaGMan1

### Notion
- **Workspace Owner**: (To be documented)

---

## Monitoring & Logs

### GitHub Actions
**Location**: https://github.com/DaGMan1/keyview-website/actions
**Purpose**: View workflow runs, logs, and deployment status

### Google Cloud Console
**Cloud Run Logs**: https://console.cloud.google.com/run?project=key-view-website
**Cloud Build History**: https://console.cloud.google.com/cloud-build/builds?project=key-view-website
**Container Images**: https://console.cloud.google.com/gcr/images/key-view-website?project=key-view-website

### Live Service
**URL**: https://keyview-website-6yap3jdvaa-ts.a.run.app
**Status**: ✅ Operational

---

## Quick Reference Commands

### Local Development
```bash
# Build and test Docker container locally
docker build -t keyview-website .
docker run -p 8080:8080 keyview-website
# Visit: http://localhost:8080

# Push changes to deploy
git add .
git commit -m "Your message"
git push origin main
```

### GCP Management
```bash
# Authenticate with service account
gcloud auth activate-service-account --key-file=GCP_SA_KEY.json

# View Cloud Run services
gcloud run services list --region=australia-southeast1

# View recent builds
gcloud builds list --limit=5

# Describe Cloud Run service
gcloud run services describe keyview-website --region=australia-southeast1
```

### GitHub CLI
```bash
# View workflow runs
gh run list --repo DaGMan1/keyview-website

# Watch a workflow run
gh run watch <run-id> --repo DaGMan1/keyview-website

# Trigger workflow manually
gh workflow run "Deploy to Cloud Run" --repo DaGMan1/keyview-website
```

### Notion Sync
```bash
# Sync roadmap to Notion
node notion-sync.js
```

---

**End of Infrastructure Documentation**

For project roadmap and future plans, see: [ROADMAP.md](ROADMAP.md)

---

## N8N Service Infrastructure (Phase 2)

### Cloud SQL Database
**Instance Name**: keyview-db
**Database Version**: PostgreSQL 15
**Tier**: db-f1-micro (smallest tier)
**Region**: australia-southeast1-a
**Public IP**: 34.151.76.197
**Status**: ✅ Running

**Configuration**:
- Storage: 10GB SSD with auto-increase
- Backups: Daily at 3:00 AM AEST
- Maintenance Window: Sundays at 4:00 AM AEST
- Database: `n8n`
- User: `postgres`
- Password: Stored in Secret Manager (`DB_PASSWORD`)

**Cost**: ~$10-15/month (24/7 running)

### Secret Manager
**Status**: ✅ Configured
**Secrets Stored**:
1. `DB_HOST` - Database IP address (34.151.76.197)
2. `DB_NAME` - Database name (n8n)
3. `DB_USER` - Database user (postgres)
4. `DB_PASSWORD` - Database password (auto-generated 32-char)
5. `N8N_BASIC_AUTH_USER` - N8N admin username (admin)
6. `N8N_BASIC_AUTH_PASSWORD` - N8N admin password (auto-generated 24-char)

**IAM Access**:
- Service Account: `225226659046-compute@developer.gserviceaccount.com`
- Role: `roles/secretmanager.secretAccessor`
- Applied to: All 6 secrets

### N8N Service Configuration
**Service Name**: n8n-service
**Status**: 🔄 Deployment Debugging
**Docker Image**: Based on `n8nio/n8n:latest`
**Port**: 8080
**Resources**:
- Memory: 1Gi
- CPU: 1
- Min Instances: 1 (always-on)
- Max Instances: 10

**Environment Variables**:
- N8N_PORT=8080
- N8N_PROTOCOL=https
- DB_TYPE=postgresdb
- DB_POSTGRESDB_PORT=5432
- N8N_BASIC_AUTH_ACTIVE=true
- EXECUTIONS_PROCESS=main
- EXECUTIONS_MODE=regular
- GENERIC_TIMEZONE=Australia/Sydney

**Cloud SQL Connection**:
- Method: Cloud SQL Proxy (via Cloud Run --add-cloudsql-instances)
- Instance: key-view-website:australia-southeast1:keyview-db

**Current Issues**:
- Container startup timeout - debugging in progress
- See [SESSION-SUMMARY.md](SESSION-SUMMARY.md) for details

### Updated Multi-Service Architecture
```
Developer Machine
    │
    └─ Repository: keyview-website/
        ├─ services/
        │   ├─ website/
        │   │   ├─ Dockerfile
        │   │   ├─ nginx.conf
        │   │   ├─ cloudbuild.yaml
        │   │   └─ public/index.html
        │   └─ n8n/
        │       ├─ Dockerfile
        │       └─ cloudbuild.yaml
        ├─ .github/workflows/
        │   └─ deploy-services.yml
        ├─ INFRASTRUCTURE.md
        ├─ ROADMAP.md
        ├─ SESSION-SUMMARY.md
        └─ .env (local, not in Git)

        ▼ (git push)

GitHub Actions
    ├─ Website: Auto-deploy on push to main
    └─ N8N: Manual deploy via workflow_dispatch

        ▼

Google Cloud Platform
    ├─ Cloud Run Services
    │   ├─ keyview-website (✅ running)
    │   └─ n8n-service (🔄 deploying)
    ├─ Cloud SQL
    │   └─ keyview-db (✅ running)
    ├─ Secret Manager
    │   └─ 6 secrets (✅ configured)
    ├─ Cloud Storage
    │   └─ keyview-brand-documents (✅ running)
    └─ Container Registry
        ├─ keyview-website images
        ├─ n8n images
        └─ landing-page-generator images
```

---

## Landing Page Generator Service (Phase 9)

### Service Overview
**Service Name**: landing-page-generator
**Status**: ✅ Deployed and Running
**Live URL**: https://landing-page-generator-6yap3jdvaa-ts.a.run.app
**Purpose**: AI-powered brand document upload and 3D landing page generation

### Technology Stack
- **Framework**: Next.js 14 with TypeScript
- **UI**: React with Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **3D Graphics**: React Three Fiber + Three.js (planned)
- **File Storage**: Google Cloud Storage
- **AI Integration**: OpenAI/Claude API (planned)

### Cloud Run Configuration
**Resources**:
- Memory: 2Gi
- CPU: 2 cores
- Min Instances: 0 (cost-optimized)
- Max Instances: 10
- Port: 8080
- Public Access: ✅ Enabled (allUsers invoker role)

**Environment Variables**:
- `GCP_PROJECT_ID`: key-view-website
- `GCS_BUCKET_NAME`: keyview-brand-documents

**Authentication**:
- Uses Application Default Credentials (no explicit key file)
- Compute service account: 225226659046-compute@developer.gserviceaccount.com

### Cloud Storage Bucket
**Bucket Name**: keyview-brand-documents
**Region**: australia-southeast1
**Access Control**: Uniform bucket-level access
**Status**: ✅ Created and Configured

**IAM Permissions**:
- `allUsers` → `roles/storage.objectViewer` (public read access to uploaded files)
- `serviceAccount:225226659046-compute@developer.gserviceaccount.com` → `roles/storage.objectAdmin` (read/write from Cloud Run)

**Allowed File Types**:
- PDF documents
- DOCX documents
- Images (JPG, PNG, WEBP)
- Maximum file size: 10MB

### Features Implemented (Phase 9.1 & 9.2)

#### 1. Brand Document Upload System
- Secure file upload API endpoint (`/api/upload`)
- File type validation (PDF, DOCX, images)
- File size validation (max 10MB)
- Automatic unique filename generation with timestamp
- Direct upload to Google Cloud Storage
- Public URL generation for uploaded files

#### 2. Multi-Step Brand Questionnaire Form
**Step 1: Upload Brand Document**
- Drag-and-drop file upload interface
- Real-time upload progress
- Upload success confirmation

**Step 2: Company Information**
- Company name (required)
- Tagline (optional)
- Industry (required)
- Email (required)
- Website URL (optional)

**Step 3: Brand Details**
- Target audience description (required)
- Brand personality selection (8 options):
  - Professional, Playful, Luxurious, Minimal, Bold, Elegant, Modern, Traditional
- Preferred style (6 options):
  - Minimalist, Vibrant, Dark, Light, Gradient, Corporate
- Primary & secondary color pickers
- Key features/services (required)
- Call-to-action text (required)

**Step 4: Review & Submit**
- Form data review
- Submit for AI processing

### Form Validation
- Schema-based validation using Zod
- Real-time error messages
- Required field enforcement
- Email format validation
- URL format validation

### Next Steps (Remaining Phase 9 Tasks)

#### Phase 9.3: AI Content Analysis (In Progress)
- [ ] Choose AI provider (OpenAI GPT-4 or Claude)
- [ ] Implement document parsing system
- [ ] Extract brand guidelines from PDFs/DOCX
- [ ] Generate landing page content (headlines, copy, CTAs)
- [ ] Create dynamic color palettes from brand colors
- [ ] Generate typography suggestions

#### Phase 9.4: 3D Landing Page Generator
- [ ] Implement React Three Fiber setup
- [ ] Create 3D landing page templates
- [ ] Build animated hero section with 3D objects
- [ ] Add parallax scrolling effects
- [ ] Implement dynamic content injection
- [ ] Optimize performance for mobile devices

#### Phase 9.5: N8N Workflow Integration
- [ ] Create N8N workflow for end-to-end automation:
  1. Form submission webhook trigger
  2. File upload to Cloud Storage
  3. AI API call for content generation
  4. Landing page generation from template
  5. Deployment to unique URL
  6. Email notification with preview link

#### Phase 9.6: Preview & Deployment System
- [ ] Generate unique preview URLs
- [ ] Allow client edits and regeneration
- [ ] One-click deployment to custom domain
- [ ] Version history and rollback capability
- [ ] Code export functionality

### Cost Estimates
**Current Monthly Costs**:
- Cloud Run (landing-page-generator): ~$0-5/month (with min instances = 0)
- Cloud Storage: ~$0.02/GB/month + $0.01 per 10,000 operations
- Estimated per landing page generation: $0.06-0.11

**Total Additional Infrastructure Cost**: ~$5-10/month (depending on usage)

### Deployment
**Method**: GitHub Actions workflow
**Trigger**: Manual via `workflow_dispatch` with `service=landing-page-generator`
**Build Time**: ~4-5 minutes
**Dockerfile**: Multi-stage build with standalone Next.js output

**Command**:
```bash
gh workflow run deploy-services.yml -f service=landing-page-generator
```

### Files Structure
```
services/landing-page-generator/
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── route.ts                    # File upload API endpoint
│   ├── components/
│   │   └── BrandUploadForm.tsx            # Multi-step form component
│   ├── globals.css                         # Tailwind CSS styles
│   ├── layout.tsx                          # Root layout
│   └── page.tsx                            # Homepage (renders form)
├── lib/
│   └── schema.ts                           # Zod validation schema
├── public/                                  # Static assets
├── .dockerignore                           # Docker ignore rules
├── .env.local                              # Local environment variables (not in Git)
├── .env.example                            # Environment variables template
├── cloudbuild.yaml                         # Cloud Build configuration
├── Dockerfile                              # Multi-stage Next.js container
├── next.config.ts                          # Next.js configuration (standalone output)
├── package.json                            # Dependencies
└── tsconfig.json                           # TypeScript configuration
```

### Testing
**Live URL**: https://landing-page-generator-6yap3jdvaa-ts.a.run.app

Test the upload form:
1. Visit the URL
2. Upload a brand document (PDF, DOCX, or image)
3. Fill out the multi-step questionnaire
4. Submit (currently shows alert, AI generation not yet implemented)

**Development Testing**:
```bash
cd services/landing-page-generator
npm run dev
# Visit http://localhost:3000
```

