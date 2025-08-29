import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // base: "/online-bookstore---mern/",
  base: process.env.NODE_ENV === "production" ? "/online-bookstore---mern/" : "/"
})
