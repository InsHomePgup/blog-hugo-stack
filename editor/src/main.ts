import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import TDesign from 'tdesign-vue-next'
import { createApp } from 'vue'
import router from '@/router/index.ts'
import App from './App.vue'
import 'tdesign-vue-next/es/style/index.css'
import 'virtual:uno.css'
import './style.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(TDesign)
app.mount('#app')
