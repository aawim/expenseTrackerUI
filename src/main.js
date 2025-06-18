// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(FloatingVue)
app.use(router)
app.mount('#app')
