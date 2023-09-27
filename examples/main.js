import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'babel-polyfill'
// import './components/index.js' // 基础组件自动注册全局
import '@/assets/styles/index.scss' // global css
import './assets/icons' // icon

import '@/directive'
import * as filters from './utils/filters' // global filters
import api from '@/api' // 接口api
import VueClipboard from 'vue-clipboard2' // 复制插件
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import { Message } from 'element-ui'

import TAntdui from '../packages' // 二次封装组件
import vueSeamlessScroll from 'vue-seamless-scroll'

import './permission' // 全局路由守卫
Vue.use(vueSeamlessScroll)
Vue.use(Antd)
Vue.use(TAntdui)

Vue.use(VueClipboard)

Vue.prototype.$http = api
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
