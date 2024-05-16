import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Punto de entrada principal (index.html)
        main: 'src/main.jsx',
      }
    }
  }
})
