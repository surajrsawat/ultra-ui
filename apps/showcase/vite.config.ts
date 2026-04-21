import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ultra-ui/primitives": path.resolve(__dirname, "../../packages/primitives/src"),
      "@ultra-ui/headless": path.resolve(__dirname, "../../packages/headless/src"),
      "@ultra-ui/grid-core": path.resolve(__dirname, "../../packages/grid-core/src"),
      "@ultra-ui/tailwind-wrappers": path.resolve(__dirname, "../../packages/tailwind-wrappers/src"),
      "@ultra-ui/ultra-table": path.resolve(__dirname, "../../packages/ultra-table/src")
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
})
