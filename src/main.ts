/*
 * @Author: YiY
 * @Date: 2023-12-14 08:35:18
 * @LastEditTime: 2023-12-14 08:59:01
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

createApp(App)
.use(router)
.use(ElementPlus)
.mount('#app')
