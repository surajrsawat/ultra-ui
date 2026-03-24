import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ui/primitives": path.resolve(__dirname, "../../packages/primitives/src"),
      "@ui/headless": path.resolve(__dirname, "../../packages/headless/src"),
      "@ui/grid-core": path.resolve(__dirname, "../../packages/grid-core/src"),
      "@ui/tailwind-wrappers": path.resolve(__dirname, "../../packages/tailwind-wrappers/src")
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
})