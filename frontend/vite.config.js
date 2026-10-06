import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = resolve(import.meta.dirname, 'src');

export default defineConfig({
  root,
  publicDir: resolve(import.meta.dirname, 'public'),
  server: {
    port: 5000,
    // Forward API calls to a locally running backend during development
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        test: resolve(root, 'test.html')
      }
    }
  },
  test: {
    root: import.meta.dirname
  }
});
