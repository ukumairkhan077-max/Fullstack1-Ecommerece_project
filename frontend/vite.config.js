import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// `base` needs to be a subpath ONLY for GitHub Pages project sites
// (https://<username>.github.io/<repo-name>/) — otherwise the built
// CSS/JS asset paths 404 and the page renders blank. Vercel (and most
// other hosts) serve from the domain root, where base: '/' is correct.
//
// Vercel automatically sets the VERCEL env var during its build step, so
// we use that to pick the right value automatically — no manual toggling
// needed between the two hosts. Locally (`npm run dev`) this has no
// effect either way — Vite always serves from "/" in dev.
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/Fullstack1-Ecommerece_project/',
})