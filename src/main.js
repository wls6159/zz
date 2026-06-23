import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/common.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/store/pinia' // 引入
createApp(App).use(store).use(router).use(ElementPlus).use(pinia).mount('#app')
