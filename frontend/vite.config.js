// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure Vite outputs to dist folder
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  base: '/', // Ensures proper routing for Netlify
});
