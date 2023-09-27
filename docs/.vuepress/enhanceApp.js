// enhanceApp.js
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import 'babel-polyfill'
// import Es6Promise from 'es6-promise'
// import Tui from '../../src/components/baseComponents/index.js'
import TAntdui from '../../packages'
import vueClipboard from 'vue-clipboard2'
// import * as filters from './public/utils/filters' // global filters
import './public/utils/directives' // 自定义指令
import '../.vuepress/public/css/index.scss'
import moment from 'moment'
moment.suppressDeprecationWarnings = true // 去掉警告
// 解决低版本浏览器不支持es6
// Es6Promise.polyfill()

export default ({
  Vue,
}) => {
  Vue.use(VueHighlightJS),
    Vue.use(Antd),
    Vue.use(TAntdui),
    Vue.use(vueClipboard)
  // 过滤器
  // Object.keys(filters).forEach(key => {
  //   Vue.filter(key, filters[key])
  // })
}
