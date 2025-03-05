import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import Buffer from 'buffer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'global.Buffer': Buffer, // Polyfill Buffer in the global scope
  },
  optimizeDeps: {
    include: ['buffer'], // Make sure buffer is included in the dependencies
  },
})
