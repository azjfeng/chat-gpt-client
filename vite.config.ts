import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      '/api/users': {
        target: 'http://127.0.0.1:3000', // 设置目标服务器地址
        changeOrigin: true, // 启用跨域
      }
    },
  }
})
