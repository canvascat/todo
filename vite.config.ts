import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';

const resolve = (...paths: string[]) => join(__dirname, ...paths);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve('src'),
      src: resolve('src'),
    },
  },
  css: {
    modules: {
      generateScopedName: '[local]__[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
      },
    },
  },
});
