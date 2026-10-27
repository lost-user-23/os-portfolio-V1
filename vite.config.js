import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute URLs are required for canonical links and social cards.
// Set SITE_URL to override; on Vercel the production domain is detected.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '')

const siteUrlPlugin = () => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
})
