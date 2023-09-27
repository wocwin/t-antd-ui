import TAntdModal from './src'
import TAntdProtocol from './src/protocol.vue'

/* istanbul ignore next */
TAntdModal.install = function (Vue) {
  Vue.component(TAntdModal.name, TAntdModal)
}

export {
  TAntdModal,
  TAntdProtocol
}
