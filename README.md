# KeyView Website

A static website deployed on Google Cloud Run using automated CI/CD with GitHub Actions.

## Architecture

- **Frontend**: Static HTML/CSS/JS served by nginx
- **Container**: Docker with nginx:alpine
- **Hosting**: Google Cloud Run
- **CI/CD**: GitHub Actions
- **Region**: australia-southeast1

## Deployment

The website automatically deploys to Google Cloud Run when changes are pushed to the main branch.

### Deployment Pipeline

1. Push to main branch triggers GitHub Actions
2. GitHub Actions authenticates with GCP using service account
3. Cloud Build builds the Docker image
4. Container is pushed to Google Container Registry
5. Cloud Run deploys the new container
6. Website is live at the Cloud Run URL

## Local Development

### Prerequisites

- Docker installed

### Run Locally

```bash
# Build the Docker image
docker build -t keyview-website .

# Run the container
docker run -p 8080:8080 keyview-website
```

Visit http://localhost:8080 to view the website.

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy-to-cloud-run.yml
├── public/
│   └── index.html
├── Dockerfile
├── nginx.conf
├── cloudbuild.yaml
├── .dockerignore
├── .gitignore
└── README.md
```

## Configuration

- **GCP Project**: key-view-website
- **Service Name**: keyview-website
- **Region**: australia-southeast1
- **Port**: 8080

## GitHub Secrets

The following secret must be configured in GitHub repository settings:

- `GCP_SA_KEY`: Service account JSON key with Cloud Run and Cloud Build permissions

## License

All rights reserved.
