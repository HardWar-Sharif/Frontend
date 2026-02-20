
# HardWar Frontend

Frontend web application built with Vite + React + TypeScript.

## Requirements

- Node.js 20+
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Vite will print the local URL (typically `http://localhost:5173`).

## Configuration

### API base URL

API requests are made via Axios. The base URL is currently hard-coded in:

- [src/api/axiosInstance.ts](src/api/axiosInstance.ts)

If you need to point the frontend to a different backend environment, update the `baseURL` there.

### Routing / SPA

This app uses React Router and relies on SPA fallback for deep links. In production (Docker image), this is handled by the included Nginx config (`try_files $uri /index.html`).

## Docker (production build)

Build the image:

```bash
docker build -t hardwar-frontend .
```

Run it:

```bash
docker run -p 8080:80 hardwar-frontend
```

Open `http://localhost:8080`.

Notes:

- The Dockerfile builds the app with Node and serves `/dist` using Nginx.
- The included [nginx.conf](nginx.conf) proxies `/admin/` to `http://backend:8000` (useful when running alongside a backend service named `backend`, e.g. via Docker Compose).

## Codebase notes

- Path alias: `@/` maps to `src/` (see `tsconfig.app.json` and `vite-tsconfig-paths`).
- Localization: translation files live in [src/locales](src/locales) and are wired via Tolgee in [src/main.tsx](src/main.tsx). Tolgee credentials could be added to .env just like the .env.example.

