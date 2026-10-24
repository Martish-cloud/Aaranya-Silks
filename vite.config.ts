import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs'

function webpFallbackPlugin(): Plugin {
  return {
    name: 'vite-plugin-webp-fallback',
    enforce: 'pre',
    resolveId(source, importer) {
      if (importer && /\.(png|jpe?g|jfif)$/i.test(source)) {
        const fullDir = path.dirname(importer)
        const targetPath = path.resolve(fullDir, source)
        if (!fs.existsSync(targetPath)) {
          const webpPath = targetPath.replace(/\.(png|jpe?g|jfif)$/i, '.webp')
          if (fs.existsSync(webpPath)) {
            return webpPath
          }
        }
      }
      return null
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    webpFallbackPlugin(),
    react(),
    tailwindcss(),
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('canvas-confetti')) {
              return 'vendor-confetti';
            }
          }
        },
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
