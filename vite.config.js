import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Required for GitHub Pages project site: https://muzammil2222.github.io/Markcoders/
  base: '/Markcoders/',
  plugins: [react(), tailwindcss()],
})
