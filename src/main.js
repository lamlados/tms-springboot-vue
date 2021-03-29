import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import pluginExport from '@d2-projects/vue-table-export'

import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import '@/d2crud'

Vue.use(ElementUI, { locale })
Vue.use(VueAxios, axios)
Vue.use(pluginExport)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
