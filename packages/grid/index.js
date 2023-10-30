import TGrid from './src'

/* istanbul ignore next */
TGrid.install = function (Vue) {
  Vue.component(TGrid.name, TGrid)
}

export default TGrid
