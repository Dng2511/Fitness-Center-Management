import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Cho phép truy cập từ các thiết bị trong mạng
    port: 5173, // Có thể đổi sang port khác nếu cần
    strictPort: true, // Bắt buộc dùng đúng port
    hmr: {
      clientPort: 5173, // Thêm dòng này để fix WebSocket
      protocol: 'ws', // Bắt buộc dùng WebSocket
    }
  }
})