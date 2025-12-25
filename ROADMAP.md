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

#### 1.2 Project Management Setup (IN PROGRESS)
- [ ] Create comprehensive roadmap document
- [ ] Set up Notion workspace
- [ ] Create Notion database for task tracking
- [ ] Integrate roadmap with Notion
- [ ] Set up automatic sync process

#### 1.3 Multi-Service Architecture Setup (PENDING)
- [ ] Restructure repo for multiple services:
  ```
  keyview-platform/
  ├── services/
  │   ├── website/
  │   ├── n8n/
  │   └── database/
  ├── infrastructure/
  │   ├── gcp/
  │   ├── aws/ (future)
  │   └── cloudflare/ (future)
  ├── .github/workflows/
  └── config/
  ```
- [ ] Update GitHub Actions for multi-service deployment
- [ ] Create service dependency management

---

### Phase 2: N8N Automation Platform
**Goal**: Deploy N8N with database and persistent storage

#### 2.1 Database Setup
**Decision Point**: Choose database strategy
- **Option A**: Cloud SQL (PostgreSQL) - Managed, reliable, costs $
- **Option B**: Supabase - Free tier, includes auth, real-time features
- **Option C**: Hybrid - Cloud SQL + Google Sheets for user-facing data

**Tasks**:
- [ ] Decide on database strategy
- [ ] Set up PostgreSQL database (Cloud SQL or Supabase)
- [ ] Configure database backups
- [ ] Set up database connection secrets in GitHub
- [ ] Create database initialization scripts

#### 2.2 N8N Service Deployment
- [ ] Create N8N Dockerfile configuration
- [ ] Configure N8N environment variables
- [ ] Set up persistent volume for workflow data
- [ ] Deploy N8N to Cloud Run
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
