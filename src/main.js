import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

// 完全禁用 Vue DevTools
app.config.devtools = false
app.config.debug = false
app.config.silent = true

app.mount('#app') 