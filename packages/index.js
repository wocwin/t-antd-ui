import TAntdLayoutPage from './layout-page'
import TantdLayoutPageItem from './layout-page-item'
import TAntdForm from './form'
import TAntdSelect from './select'
import TAntdConditional from './conditinal'
import TAntdDatePicker from './date-picker'
import TAntdDetail from './detail'
import TAntdModuleForm from './module-form'
import TAntdTable from './table'
import { TAntdModal, TAntdProtocol } from './modal'
import { version } from '../package.json'
// 存储组件列表
const components = [
  TAntdLayoutPage,
  TantdLayoutPageItem,
  TAntdSelect,
  TAntdConditional,
  TAntdForm,
  TAntdDatePicker,
  TAntdDetail,
  TAntdTable,
  TAntdModuleForm,
  TAntdModal,
  TAntdProtocol
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  install.installed = true
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// 按需引入
export {
  TAntdForm,
  TAntdConditional,
  TAntdLayoutPage,
  TantdLayoutPageItem,
  TAntdTable,
  TAntdDatePicker,
  TAntdModuleForm,
  TAntdSelect,
  TAntdDetail,
  TAntdModal,
  TAntdProtocol
}
export default {
  version,
  ...components,
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
