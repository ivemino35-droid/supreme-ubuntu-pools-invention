import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages, set base to '/REPO_NAME/'.
// Example: base: '/ubuntu-pools/'
export default defineConfig({
  plugins: [react()],
  base: './',
  
  // Build optimizations
  build: {
    // Output directory
    outDir: 'dist',
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 600,
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // React and ReactDOM in separate chunk
          'react-vendor': ['react', 'react-dom'],
          // React Router in separate chunk
          'router-vendor': ['react-router-dom'],
          // Recharts in separate chunk (it's large)
          'charts-vendor': ['recharts'],
        },
      },
    },
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: true,
  },
  
  // Dev server configuration
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: true,
  },
})
