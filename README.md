# 📷 Photo Gallery SPA

A high-performance Single-Page Application (SPA) photo gallery built with **Next.js 15** and **TypeScript**, deployed on **Google Cloud Platform**.

> Developed as a Full-Stack Developer job test submission for **Diversition Digital Solutions**.

**Live Demo:** https://gallery-app-295418808209.asia-southeast1.run.app/

---

## ✨ Features

- **Masonry Grid Layout** — Pinterest-style responsive photo grid (2–5 columns)
- **Infinite Scroll** — Smooth loading via Intersection Observer API (12 images/page)
- **Hashtag Filtering** — Real-time filtering synced with URL query parameters (`?tag=...`)
- **Category Dropdown** — Quick tag selection with branded styling
- **Skeleton Loaders** — Premium perceived-performance loading experience
- **Back to Top Button** — Smooth scroll button that appears after 1000px
- **Dynamic Page Titles** — Browser tab updates on tag selection

---

## 🏗️ Architecture & Tech Stack

### Frontend / BFF
| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS + CSS Modules |
| API Layer | Next.js Route Handlers (BFF Pattern) |

### Cloud Infrastructure (GCP)

```
Developer Machine
      │
      │  git push
      ▼
GitHub Repository
      │
      │  Trigger
      ▼
Cloud Build (CI/CD)
      │
      │  docker build + push
      ▼
Artifact Registry
(Docker Image Store)
      │
      │  Deploy new revision
      ▼
Google Cloud Run (Serverless)
  [Next.js App Container]
      │
      ├──────────────────────┐
      ▼                      ▼
User Browser         External Image API
(HTTPS)              (placehold.co)
```

| GCP Service | Role |
|---|---|
| **Cloud Run** | Serverless compute hosting the Next.js container |
| **Artifact Registry** | Docker image storage |
| **Cloud Build** | CI/CD pipeline — build and push on demand |

> See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for full production specs including server specifications, OS/runtime, cost estimation, and scalability path.

---

## 📁 Project Structure

```
single-page-app/
├── app/
│   ├── api/images/     # Route Handler (BFF API)
│   ├── globals.css     # Global design tokens
│   ├── layout.tsx      # Root layout with SEO metadata
│   └── page.tsx        # Home page
├── components/
│   ├── Gallery.tsx             # Main gallery with infinite scroll
│   ├── Gallery.module.css      # Gallery component styles
│   ├── ImageCard.tsx           # Individual image card (Pinterest hover)
│   └── ImageCard.module.css    # ImageCard component styles
├── constants/
│   └── gallery.ts      # Centralized constants (TAGS, PAGE_LIMIT)
├── hooks/
│   └── useInfiniteScroll.ts    # Custom Intersection Observer hook
├── lib/
│   ├── mock-data.ts    # Mock database generator
│   └── utils.ts        # Utility functions
├── types/
│   └── gallery.ts      # Shared TypeScript interfaces
├── Dockerfile          # Multi-stage optimized Docker build
├── ARCHITECTURE.md     # Full system architecture documentation
└── DEPLOYMENT.md       # Step-by-step GCP deployment guide
```

---

## 🚀 Getting Started (Local Development)

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment (Google Cloud Run)

See the full step-by-step guide in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

```bash
# Build Docker image via Cloud Build
gcloud builds submit --tag asia-southeast1-docker.pkg.dev/single-page-app-494714/gallery-repo/gallery-app .

# Deploy to Cloud Run
gcloud run deploy gallery-app \
    --image asia-southeast1-docker.pkg.dev/single-page-app-494714/gallery-repo/gallery-app \
    --platform managed \
    --region asia-southeast1 \
    --allow-unauthenticated \
    --port 3000
```

---

## 👤 Author

**Nuttapat Pothavichai**  
Full-Stack Developer Applicant @ Diversition Digital Solutions
