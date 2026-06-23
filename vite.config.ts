import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the warning threshold to avoid false-positive warnings from Spline
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        // Manually chunk heavy third-party libraries so they can be loaded in parallel
        // and cached independently by the browser
        manualChunks(id) {
          // Spline is very large — isolate it completely
          if (id.includes('@splinetool')) {
            return 'spline';
          }
          // Framer Motion — isolate so it doesn't block the main bundle
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          // React core — small but stable, good for long-term caching
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'react-vendor';
          }
          // Lenis smooth scroll
          if (id.includes('lenis')) {
            return 'lenis';
          }
        }
      }
    }
  }
})
