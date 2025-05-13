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
      '4352-2600-1700-2df1-c910-90d9-d20-6759-73fd.ngrok-free.app' 
    ]
  }
});