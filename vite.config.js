import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; // path 모듈 불러오기

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @를 ./src로 인식
      '@styles': path.resolve(__dirname, './src/styles'), // @styles를 ./src/styles로 인식
    },
  },
});