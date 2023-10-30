import { Checkbox } from 'ant-design-vue'
import { GRID_SELECTION_KEY } from './context'
export default {
  data() {
    return {
      selectionCol: []
    }
  },
  created() {
    if (this.rowSelectionKeys !== null) {
      this.selectionCol = [{
        title: () => {
          return <Checkbox style="width: 100%;text-align: center;" disabled={this.tableData.length === 0} checked={this.tableData.length !== 0 && this.rowSelectionKeys.length + this.disabledRowSelectionKeys.length === this.tableData.length} {...{ on: { change: e => this.onGridSelect(e) } }} />
        },
        dataIndex: GRID_SELECTION_KEY,
        minWidth: '30px',
        width: '30px',
        render: (h, dataIndex, rowIndex, value) => {
          return <div style="text-align: center;"><Checkbox disabled={this.disabledRowSelectionKeys.indexOf(rowIndex) >= 0} checked={this.rowSelectionKeys.indexOf(rowIndex) >= 0} {
          ...{
            on: { change: e => this.onRowSelect(e, rowIndex) }
          }
          } /></div>
        }
      }]
    }
  },
  methods: {
    onGridSelect(e) { // 全选或非全选
      let rowSelectionKeys = []
      if (e.target.checked) {
        rowSelectionKeys = [...new Array(this.tableData.length).keys()].filter(item => this.disabledRowSelectionKeys.indexOf(item) < 0) // 全部数据下标及排除禁选
      }
      this.$emit('update:rowSelectionKeys', rowSelectionKeys)
    },
    onRowSelect(e, rowIndex) { // 单行选择
      let rowSelectionKeys = [...this.rowSelectionKeys]
      if (e.target.checked) {
        rowSelectionKeys.push(rowIndex)
      } else {
        rowSelectionKeys.splice(this.rowSelectionKeys.indexOf(rowIndex), 1)
      }
      this.$emit('update:rowSelectionKeys', rowSelectionKeys)
    }
  }
}
