import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import '@mdi/font/css/materialdesignicons.css'
import './assets/styles/global.css'

createApp(App).use(vuetify).use(router).mount('#app')
