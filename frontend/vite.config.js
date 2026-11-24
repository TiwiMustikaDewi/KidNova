import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function syncToLaravelPublic() {
  return {
    name: 'sync-to-laravel-public',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const publicDir = path.resolve(__dirname, '../public')
      const distAssetsDir = path.join(distDir, 'assets')
      const publicAssetsDir = path.join(publicDir, 'assets')

      if (!fs.existsSync(distDir)) return

      const distIndex = path.join(distDir, 'index.html')
      if (fs.existsSync(distIndex)) {
        fs.copyFileSync(distIndex, path.join(publicDir, 'index.html'))
      }

      if (fs.existsSync(publicAssetsDir)) {
        fs.rmSync(publicAssetsDir, { recursive: true, force: true })
      }
      if (fs.existsSync(distAssetsDir)) {
        fs.mkdirSync(publicAssetsDir, { recursive: true })
        for (const file of fs.readdirSync(distAssetsDir)) {
          fs.copyFileSync(
            path.join(distAssetsDir, file),
            path.join(publicAssetsDir, file)
          )
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), syncToLaravelPublic()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})
