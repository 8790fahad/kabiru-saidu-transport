import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Must match the GitHub repo name for Project Pages (user.github.io/repo-name/). Use '/' if you use a custom domain. */
const GITHUB_PAGES_BASE = '/kabiru-saidu-transport/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? GITHUB_PAGES_BASE : '/',
}))
