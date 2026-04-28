# Deployment Guide — Google Cloud Platform

This guide explains how to deploy the Photo Gallery SPA to **Google Cloud Run** for the project: `single-page-app-494714`.

## 1. Prerequisites

- [Google Cloud SDK (gcloud)](https://cloud.google.com/sdk/docs/install) installed.
- **Billing Enabled** for project `single-page-app-494714` in GCP Console.

---

## 2. Setup Project

Login and set your project context:
```bash
gcloud auth login
gcloud config set project single-page-app-494714
```

Enable required APIs (Cloud Run, Registry, and Build):
```bash
gcloud services enable run.googleapis.com \
                       artifactregistry.googleapis.com \
                       cloudbuild.googleapis.com
```

---

## 3. Create Container Registry

Create a repository in **Artifact Registry**:
```bash
gcloud artifacts repositories create gallery-repo \
    --repository-format=docker \
    --location=asia-southeast1 \
    --description="Gallery App Repository"
```

---

## 4. Build and Push

Build the image using **Cloud Build** (Serverless build):
```bash
gcloud builds submit --tag asia-southeast1-docker.pkg.dev/single-page-app-494714/gallery-repo/gallery-app .
```

---

## 5. Deploy to Cloud Run

Deploy the container as a public service:
```bash
gcloud run deploy gallery-app \
    --image asia-southeast1-docker.pkg.dev/single-page-app-494714/gallery-repo/gallery-app \
    --platform managed \
    --region asia-southeast1 \
    --allow-unauthenticated \
    --port 3000
```

Once completed, you will get a URL like: `https://gallery-app-xxxxxx.a.run.app`

---

## 6. Cleanup (Optional)

To stay safely within the free tier, you can remove old images if you deploy multiple times:
```bash
# List images
gcloud artifacts docker images list asia-southeast1-docker.pkg.dev/single-page-app-494714/gallery-repo/gallery-app
```
