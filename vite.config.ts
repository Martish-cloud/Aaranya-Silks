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
