import TAntdTable from './src'

/* istanbul ignore next */
TAntdTable.install = function (Vue) {
  Vue.component(TAntdTable.name, TAntdTable)
}

export default TAntdTable
