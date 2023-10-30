import TAntdForm from './src'
import TAntdConfigFormItem from './src/config-form-item.vue'

/* istanbul ignore next */
TAntdForm.install = function (Vue) {
  Vue.component(TAntdForm.name, TAntdForm)
}
export {
  TAntdConfigFormItem,
  TAntdForm
}

export default TAntdForm
