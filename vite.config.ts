/*
 * @Author: YiY
 * @Date: 2023-12-13 19:45:59
 * @LastEditTime: 2023-12-13 19:47:44
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    host: '0.0.0.0',
    // port: 8080
    open: true
  },
  resolve: {
    // 配置别名,引用src路径下的东西可以通过@
    alias:[
      {
        find: '@',
        replacement: resolve(__dirname,'src')
      }
    ]
  }
})
