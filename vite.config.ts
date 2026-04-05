import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hostinger: deploy `dist` to site root (public_html). Use `base: '/subfolder/'` if the app lives in a subdirectory.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
})
