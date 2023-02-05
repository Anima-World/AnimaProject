import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  // configureWebpack: {
  //   //process: {env: {}},
  //   plugins: [
  //     new NodePolyfillPlugin()
  //   ],
  //   resolve: {
  //     fallback: {
  //       http: require.resolve("stream-http"),
  //       https: require.resolve("https-browserify"),
  //       crypto: require.resolve("crypto-browserify"),
  //       stream: require.resolve("stream-browserify"),
  //       os: require.resolve("os-browserify/browser"),
  //       url: require.resolve("url"),
  //       assert: require.resolve("assert"),
  //     },
  //   },
  // }
})
