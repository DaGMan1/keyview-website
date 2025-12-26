# KeyView Platform - Complete Roadmap

## Project Overview

**Vision**: Create a white-label business automation platform that can be deployed to any cloud provider (GCP/AWS/Cloudflare) with:
- Static website frontend
- N8N automation/AI workflows (including AI Receptionist)
- Flexible database options (Cloud SQL, Supabase, Google Sheets)
- Social media authentication and sync
- Complete GitHub Actions CI/CD pipeline

**Business Model**: Template repository that clients can clone and deploy to their own infrastructure

---

## Project Phases

### Phase 1: Infrastructure Foundation ✅ (Partially Complete)
**Goal**: Set up core infrastructure and deployment pipeline

#### 1.1 Current Website Deployment ✅ (COMPLETED)
- [x] Create repository structure
- [x] Dockerfile with nginx configuration
- [x] GitHub Actions workflow for Cloud Run
- [x] GCP service account with proper IAM roles
- [x] Initial deployment successful
- [x] Live URL: https://keyview-website-6yap3jdvaa-ts.a.run.app

#### 1.2 Project Management Setup (COMPLETED)
- [x] Create comprehensive roadmap document (ROADMAP.md)
- [x] Create infrastructure documentation (INFRASTRUCTURE.md)
- [x] Create session tracking (SESSION-SUMMARY.md)
- [x] Set up Notion workspace
- [x] Create Notion integration (Key_View)
- [x] Integrate roadmap with Notion
- [x] Create sync script (notion-sync.js)

#### 1.3 Multi-Service Architecture Setup (COMPLETED)
- [x] Restructure repo for multiple services:
  ```
  keyview-platform/
  ├── services/
  │   ├── website/  (Dockerfile, nginx.conf, cloudbuild.yaml, public/)
  │   └── n8n/      (Dockerfile, cloudbuild.yaml)
  ├── .github/workflows/
  │   └── deploy-services.yml  (multi-service deployment)
  ├── INFRASTRUCTURE.md
  ├── ROADMAP.md
  ├── SESSION-SUMMARY.md
  └── .env (local secrets)
  ```
- [x] Update GitHub Actions for multi-service deployment
- [x] Separate cloudbuild.yaml per service

---

### Phase 2: N8N Automation Platform
**Goal**: Deploy N8N with database and persistent storage

#### 2.1 Database Setup
**Decision**: ✅ Cloud SQL (PostgreSQL) - Stay in Google ecosystem

**Tasks**:
- [x] Decide on database strategy (Cloud SQL chosen)
- [x] Set up PostgreSQL database (Cloud SQL instance: keyview-db)
- [x] Configure database backups (Daily at 3 AM)
- [x] Set up database connection secrets (Secret Manager)
- [x] Create database (n8n database created)

#### 2.2 N8N Service Deployment
- [x] Create N8N Dockerfile configuration
- [x] Configure N8N environment variables
- [x] Set up Secret Manager for credentials
- [x] Create Cloud Build configuration
- [x] Create GitHub Actions workflow
- [x] Configure Cloud SQL proxy connection
- [ ] Deploy N8N to Cloud Run (IN PROGRESS - debugging container startup)
- [ ] Configure N8N to use PostgreSQL database
- [ ] Test N8N workflow execution
- [ ] Set up N8N webhook endpoints

#### 2.3 Google Sheets Integration
- [ ] Set up Google Sheets API access
- [ ] Create service account for Sheets access
- [ ] Build N8N workflows for Sheets read/write
- [ ] Create template sheets for client data
- [ ] Document Sheets as database pattern

---

### Phase 3: Custom Domain Configuration
**Goal**: Map custom domains to services

#### 3.1 Domain Mapping Setup
**Domains**:
- `keyview.com.au` - Main website
- `digital.keyview.com.au` - Main website (alias or separate?)
- `chat.keyview.com.au` - N8N instance

**Tasks**:
- [ ] Map keyview.com.au to Cloud Run website service
- [ ] Map digital.keyview.com.au to Cloud Run website service
- [ ] Map chat.keyview.com.au to Cloud Run N8N service
- [ ] Configure SSL certificates (automatic via Cloud Run)
- [ ] Get DNS records from GCP
- [ ] Update DNS at domain registrar
- [ ] Verify domain ownership
- [ ] Test all domain endpoints

---

### Phase 4: AI Receptionist Workflow
**Goal**: Build and deploy always-on AI receptionist

#### 4.1 N8N Workflow Development
- [ ] Design AI receptionist conversation flow
- [ ] Choose AI provider (OpenAI, Anthropic, etc.)
- [ ] Set up API keys and credentials
- [ ] Build N8N workflow for receptionist
- [ ] Configure webhook triggers
- [ ] Set up response templates
- [ ] Add conversation logging (to Sheets/DB)

#### 4.2 Integration & Testing
- [ ] Test receptionist responses
- [ ] Configure always-on execution
- [ ] Set up error handling and notifications
- [ ] Monitor performance and costs
- [ ] Create admin dashboard in Sheets

---

### Phase 5: Social Media Integration
**Goal**: Automated social media auth and sync

#### 5.1 Platform Authentication
**Platforms**: Facebook, Instagram, LinkedIn, Twitter/X, TikTok (?)

- [ ] Research OAuth requirements per platform
- [ ] Set up OAuth apps for each platform
- [ ] Build N8N authentication flows
- [ ] Store tokens securely (database/secrets)
- [ ] Implement token refresh logic

#### 5.2 Content Sync Workflows
- [ ] Build content posting workflows
- [ ] Create content scheduling system
- [ ] Set up cross-posting capabilities
- [ ] Build engagement monitoring
- [ ] Create analytics dashboard (Sheets)

---

### Phase 6: Website Development
**Goal**: Build professional frontend for all services

#### 6.1 Main Website (keyview.com.au)
- [ ] Design homepage
- [ ] Create service pages
- [ ] Build contact forms (integrate with N8N)
- [ ] Add blog/content section (optional)
- [ ] Implement SEO optimization
- [ ] Add analytics tracking

#### 6.2 Digital Portal (digital.keyview.com.au)
**Decision Point**: What is this site for?
- [ ] Define purpose of digital subdomain
- [ ] Design appropriate interface
- [ ] Build required functionality
- [ ] Integrate with N8N backend

#### 6.3 N8N Admin Interface (chat.keyview.com.au)
- [ ] Configure N8N UI branding
- [ ] Set up user authentication
- [ ] Create client dashboards
- [ ] Document workflow usage

---

### Phase 7: Template & Documentation
**Goal**: Make this a sellable white-label product

#### 7.1 Configuration System
- [ ] Create environment variable templates
- [ ] Build configuration wizard script
- [ ] Make domains configurable
- [ ] Make branding customizable
- [ ] Create deployment checklist

#### 7.2 Documentation
- [ ] Write deployment guide
- [ ] Document all workflows
- [ ] Create troubleshooting guide
- [ ] Build video tutorials
- [ ] Create client handoff documentation

#### 7.3 Template Repository
- [ ] Clean up code and remove hardcoded values
- [ ] Create GitHub template repository
- [ ] Add one-click deployment options
- [ ] Build automated setup scripts
- [ ] Create pricing/licensing model

---

### Phase 8: Multi-Cloud Support (Future)
**Goal**: Support AWS, Cloudflare, and other providers

#### 8.1 AWS Deployment
- [ ] Create AWS-specific configurations
- [ ] Build ECS/Fargate deployment
- [ ] Set up RDS for database
- [ ] Update GitHub Actions for AWS

#### 8.2 Cloudflare Deployment
- [ ] Configure Cloudflare Workers/Pages
- [ ] Set up Cloudflare D1 database
- [ ] Update deployment workflows

---

## Technical Architecture

### Services Overview
```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Website  │  │   N8N    │  │ Database │             │
│  │ Service  │  │ Service  │  │  Config  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
                      │
                      │ GitHub Actions
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  Google Cloud Platform                   │
│                                                          │
│  ┌──────────────┐        ┌──────────────┐              │
│  │  Cloud Run   │        │  Cloud Run   │              │
│  │   Website    │        │     N8N      │              │
│  │              │        │              │              │
│  │ keyview.     │        │ chat.        │              │
│  │ com.au       │        │ keyview.     │              │
│  └──────────────┘        │ com.au       │              │
│                          └──────────────┘              │
│                                 │                        │
│                                 ▼                        │
│                          ┌──────────────┐              │
│                          │  Cloud SQL   │              │
│                          │ PostgreSQL   │              │
│                          └──────────────┘              │
│                                                          │
│  ┌────────────────────────────────────────────┐        │
│  │        Container Registry (GCR)             │        │
│  │  - Website Image                            │        │
│  │  - N8N Image                                │        │
│  └────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
        ┌──────────────────────────┐
        │   Google Sheets API      │
        │  (Alternative Database)  │
        └──────────────────────────┘
```

### Data Flow
```
User → Domain → Cloud Run → N8N Workflows → Database/Sheets
                                ↓
                          AI Services
                          Social Media APIs
```

---

## Current Status

### Completed ✅
- Basic website deployment to Cloud Run
- GitHub Actions CI/CD pipeline
- GCP service account with proper permissions
- Repository structure and configuration files

### In Progress 🔄
- Project roadmap and planning
- Notion integration setup

### Next Immediate Steps 🎯
1. Set up Notion workspace and database
2. Push this roadmap to Notion
3. Decide on database strategy (Cloud SQL vs Supabase)
4. Begin N8N service setup

---

## Decision Log

### Key Decisions Needed
1. **Database Choice**: Cloud SQL vs Supabase vs Hybrid
2. **Digital Subdomain Purpose**: What will digital.keyview.com.au be used for?
3. **Multi-tenant vs White-label**: Confirmed white-label template approach
4. **AI Provider**: Which AI service for the receptionist?

### Decisions Made
- ✅ Cloud provider: Start with GCP, expand later
- ✅ Deployment method: GitHub Actions as orchestrator
- ✅ Repository model: Template repository for white-label
- ✅ Domain strategy: Multiple subdomains for different services

---

## Success Metrics

### Phase 1-3 Success Criteria
- [ ] All services deployed and accessible via custom domains
- [ ] SSL certificates working on all domains
- [ ] GitHub Actions successfully deploying all services
- [ ] Database connected and operational

### Phase 4-5 Success Criteria
- [ ] AI receptionist responding correctly
- [ ] Social media authentication working
- [ ] Content posting workflows functional
- [ ] All data properly stored and accessible

### Phase 6-7 Success Criteria
- [ ] Professional websites live on all domains
- [ ] Complete documentation available
- [ ] Template repository ready for clients
- [ ] First test client successfully deployed

---

## Notes & Considerations

### Technical Considerations
- N8N on Cloud Run may have cold start issues (consider minimum instances)
- Database costs need monitoring (Cloud SQL can be expensive)
- Google Sheets has rate limits (5 million cells per sheet)
- OAuth tokens need secure storage and refresh handling

### Business Considerations
- Pricing model for template vs managed service
- Support model for clients using the template
- Update strategy for template improvements
- License terms and restrictions

---

**Last Updated**: 2025-12-25
**Status**: Phase 1 - Infrastructure Foundation
**Next Review**: After Notion integration complete

---

## Phase 9: AI-Powered Landing Page Generator
**Goal**: Create a system to generate custom 3D cinematic landing pages from brand documents

### 9.1 Brand Document Upload System
- [ ] Design file upload interface
- [ ] Implement secure file storage (Cloud Storage)
- [ ] Support multiple file formats (PDF, DOCX, images)
- [ ] File validation and virus scanning
- [ ] Create upload API endpoint

### 9.2 Questionnaire Form
- [ ] Design brand questionnaire (company info, tone, style, etc.)
- [ ] Build dynamic form interface
- [ ] Form validation and error handling
- [ ] Save form responses to database
- [ ] Progress tracking for multi-step form

**Key Questions to Capture**:
- Company name and tagline
- Target audience
- Brand personality (professional, playful, luxurious, etc.)
- Color preferences
- Key features/services to highlight
- Call-to-action goals

### 9.3 AI Content Analysis & Generation
- [ ] Choose AI provider (OpenAI GPT-4, Claude, etc.)
- [ ] Build document parsing system
- [ ] Extract brand guidelines from documents
- [ ] Generate landing page content (headlines, copy, CTAs)
- [ ] Create style guide from brand analysis
- [ ] Generate color palette and typography suggestions

### 9.4 3D Cinematic Landing Page Generator
- [ ] Choose 3D library (Three.js, React Three Fiber, or Spline)
- [ ] Create landing page templates
- [ ] Implement 3D animations and transitions
- [ ] Dynamic content injection
- [ ] Responsive design for all devices
- [ ] Performance optimization

**3D Elements to Include**:
- Animated hero section with 3D objects
- Parallax scrolling effects
- Interactive 3D product showcases
- Smooth scroll animations
- Particle effects
- Background animations

### 9.5 Integration & N8N Workflow
- [ ] Create N8N workflow to orchestrate the process:
  1. Trigger on form submission
  2. Upload brand document to Cloud Storage
  3. Call AI API to analyze document
  4. Generate landing page content
  5. Create 3D landing page from template
  6. Deploy to unique URL
  7. Send confirmation email with preview link

### 9.6 Preview & Deployment System
- [ ] Generate preview URLs for clients
- [ ] Allow edits and regeneration
- [ ] One-click deployment to custom domain
- [ ] Version history and rollback
- [ ] Export landing page code

---

## Technology Stack Recommendations

### Frontend (Landing Page Generator)
- **Framework**: Next.js 14 (React)
- **3D Graphics**: React Three Fiber + Three.js
- **Animations**: Framer Motion + GSAP
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation

### Backend
- **API**: Next.js API routes or separate Node.js service
- **File Storage**: Google Cloud Storage
- **AI**: OpenAI GPT-4 or Claude API
- **Database**: PostgreSQL (existing Cloud SQL)

### Infrastructure
- **Hosting**: Cloud Run (containerized Next.js)
- **CDN**: Cloud CDN for assets
- **Domain**: Subdomain like `create.keyview.com.au`

### N8N Integration
- **Trigger**: Webhook from form submission
- **Actions**:
  1. Save to database
  2. Upload files to Cloud Storage
  3. Call AI API
  4. Generate landing page
  5. Deploy to Cloud Run
  6. Send notification email

---

## Implementation Approach

### Quick Prototype (1-2 weeks)
1. Simple upload form with basic questions
2. Manual AI analysis (you paste brand guidelines)
3. Pre-built template with basic 3D effects
4. Static deployment

### Full MVP (4-6 weeks)
1. Automated AI analysis
2. Multiple 3D templates to choose from
3. Dynamic content injection
4. N8N workflow automation
5. Client preview and approval system

### Future Enhancements
- Real-time collaboration
- A/B testing different designs
- Analytics integration
- Custom 3D model uploads
- White-label for agencies

---

## Cost Estimates

### Development Costs
- 3D library: Free (Three.js)
- AI API calls: ~$0.03-0.10 per generation
- Cloud Storage: ~$0.02/GB/month
- Additional Cloud Run instance: ~$15-30/month

### Per Landing Page Generation
- AI analysis: ~$0.05-0.10
- Storage: ~$0.01
- **Total per generation**: ~$0.06-0.11

---

## Next Steps

1. Review and approve this feature addition
2. Decide on technology stack
3. Create detailed wireframes for upload form
4. Choose 3D template style
5. Begin Phase 9.1 (file upload system)

