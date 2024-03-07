import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import Message from './assets/js/index'
import { registerSW } from 'virtual:pwa-register';
import { createPinia } from 'pinia'

registerSW({ immediate: true })

createApp(App).use(Message).use(router).use(createPinia()).mount('#app')
