import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages, set base to '/REPO_NAME/'.
// Example: base: '/ubuntu-pools/'
export default defineConfig({
  plugins: [react()],
  base: './'
})
