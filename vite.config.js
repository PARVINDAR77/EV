import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { handleEmailRequest } from './server/handleEmailRequest.js'

function mailApiPlugin() {
  return {
    name: 'mail-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/send-email', (req, res) => {
        handleEmailRequest(req, res);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/send-email', (req, res) => {
        handleEmailRequest(req, res);
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mailApiPlugin()],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/react-simple-maps') || id.includes('node_modules/d3-geo')) {
            return 'vendor-maps';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})

