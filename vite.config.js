import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,
    hmr: {
      overlay: true
    },
    allowedHosts: [
      'localhost',
      '*.ngrok-free.app',
      '6308-2600-1700-2df1-c910-c4c0-95d7-6bca-82ae.ngrok-free.app'
    ]
  }
});