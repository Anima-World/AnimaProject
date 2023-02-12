import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      events: 'events',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      ws: 'xrpl/dist/npm/client/WSWrapper'
    }
  },
  optimizeDeps: {
    include: ["utils"],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      }
    },
  },
  build:{
    commonjsOptions: {
      include: [/utils/, /node_modules/],
    },
    outDir: "dist",
    rollupOptions: {
      plugins: [
          inject({ Buffer: ['buffer', 'Buffer'] }),
      ],
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
});