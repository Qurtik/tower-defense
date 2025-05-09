import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { fileURLToPath, URL } from 'node:url'

import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env.sample') })

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  build: {
    manifest: true,
  },
  plugins: [react()],
  envDir: '../../',
  resolve: {
    // https://vitejs.dev/config/shared-options.html#resolve-alias
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
})
