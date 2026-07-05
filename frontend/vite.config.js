import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// `base` MUST match your GitHub repo name when deploying to GitHub Pages
// project sites (https://<username>.github.io/<repo-name>/), otherwise the
// built CSS/JS asset paths will 404 and the page will render blank.
// Locally (`npm run dev`) this has no effect — Vite always serves from "/".
export default defineConfig({
  plugins: [react()],
  base: '/Fullstack1-Ecommerece_project/',
})
