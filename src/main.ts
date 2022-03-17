import { VuesticPlugin } from 'vuestic-ui';
import 'vuestic-ui/dist/vuestic-ui.css'
import './axios'
// import Element from 'element-ui'
// import "element-ui/lib/theme-chalk/index.css"
import { createApp } from 'vue'
import { createGtm } from 'vue-gtm'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { defineComponent } from 'vue'



const i18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('@/i18n/en.json'),
    ch: require('@/i18n/cn.json'),
    es: require('@/i18n/es.json'),
    ir: require('@/i18n/ir.json'),
    br: require('@/i18n/br.json')
  }
}

const app = createApp(App)
app.use(store)
app.use(router)

if (process.env.VUE_APP_GTM_ENABLED === 'true') {
  const gtmConfig = {
    id: process.env.VUE_APP_GTM_KEY,
    debug: false,
    vueRouter: router,
  }
  app.use(createGtm(gtmConfig))
}
// @ts-ignore
// app.use(Element)
app.use(VueAxios,axios);
app.use(createI18n(i18nConfig))
app.use(VuesticPlugin,vuesticGlobalConfig)
// app.use()
app.mount('#app')




