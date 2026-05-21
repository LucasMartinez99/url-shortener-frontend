# URL Shortener — Frontend

React frontend for the [URL Shortener API](https://github.com/LucasMartinez99/url-shortener).  
Built as a portfolio project to demonstrate modern frontend architecture alongside a production-grade Java backend.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Framework | React 19 |
| Build | Vite |
| Routing | React Router v7 |
| Data Fetching | TanStack Query (React Query v5) |
| State Management | Zustand |
| HTTP Client | Axios |
| Styling | Tailwind CSS v3 |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Container | Docker (multi-stage: Node build → Nginx serve) |
| CI/CD | GitHub Actions (auto-deploy to VPS) |

## Architecture

This project mirrors the backend's **Hexagonal Architecture** — domain logic has zero framework dependencies.

```
src/
│
├── domain/                  # Pure TypeScript — no React, no Axios
│   ├── model/               # Business types: ShortUrl, Auth, Page
│   ├── port/
│   │   ├── in/              # Use case interfaces (what the app can DO)
│   │   └── out/             # Repository interfaces (what the app NEEDS)
│   └── error/               # Domain error types
│
├── application/
│   └── service/             # Use case implementations (AuthService, ShortUrlService)
│
├── infrastructure/
│   ├── http/                # Axios adapters: HttpAuthRepository, HttpShortUrlRepository
│   ├── store/               # Zustand auth store (token persistence)
│   └── di/                  # Dependency injection container
│
└── adapter/
    └── in/web/
        ├── pages/           # LandingPage, LoginPage, RegisterPage, DashboardPage
        ├── components/
        │   ├── layout/      # Navbar, ProtectedRoute
        │   ├── ui/          # Button, Input, Modal, Badge, Spinner, Pagination
        │   └── url/         # UrlTable, UrlRow, CreateUrlModal, EditUrlModal, DeleteConfirmModal
        └── hooks/           # useAuth, useUrls, useClipboard
```

## Features

- Landing page with product overview
- User registration and login (JWT stored via Zustand + localStorage)
- Protected dashboard — redirects to login if unauthenticated
- Create short URLs with optional custom alias and expiration date
- Paginated URL table with copy-to-clipboard, edit, and delete actions
- Edit modal: update original URL, alias, expiry, or toggle active/inactive
- Toast notifications for all user actions
- Fully responsive with Tailwind CSS

## Running Locally

**Prerequisites:** Node.js 20+, and the [backend API](https://github.com/LucasMartinez99/url-shortener) running on port 8080.

```bash
# 1. Clone the repo
git clone https://github.com/LucasMartinez99/url-shortener-frontend.git
cd url-shortener-frontend

# 2. Set up environment variables
cp .env.example .env
# .env only needs one variable:
# VITE_API_BASE_URL=http://localhost:8080

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
# App is live at http://localhost:5173
```

## Running with Docker

To run the full stack (backend + frontend + database) together, refer to the [backend repo's](https://github.com/LucasMartinez99/url-shortener) `docker-compose.yml`.

To build and run the frontend container alone:

```bash
docker build --build-arg VITE_API_BASE_URL=http://localhost:8080 -t url-shortener-frontend .
docker run -p 80:80 url-shortener-frontend
```

> Note: `VITE_API_BASE_URL` is embedded into the JS bundle at build time by Vite. It must be passed as a build argument, not a runtime environment variable.

## CI/CD

**Deploy** — triggers automatically on every push to `main`:
1. SSH into the VPS
2. Pull latest code
3. Rebuild and restart only the Nginx container — zero downtime for the backend and database

## Key Engineering Decisions

**Hexagonal Architecture on the frontend** — the `domain/` layer has no React or Axios imports. Components depend on use case interfaces, never on HTTP clients directly. The same separation of concerns applied to the Java backend is applied here.

**TanStack Query for server state** — handles caching, background refetch, and loading/error states. The URL list re-fetches automatically after any mutation (create, edit, delete) without manual cache invalidation.

**Zustand for auth state** — lightweight alternative to Redux for a single global concern: storing the JWT token and persisting it to localStorage.

**Multi-stage Docker build** — Stage 1 compiles the TypeScript and bundles assets with Vite. Stage 2 serves the static output with Nginx (~25 MB final image). The API base URL is injected at build time as a `VITE_` environment variable.
