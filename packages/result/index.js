import TAntdResult from './src'

/* istanbul ignore next */
TAntdResult.install = function (Vue) {
  Vue.component(TAntdResult.name, TAntdResult)
}

export default TAntdResult
