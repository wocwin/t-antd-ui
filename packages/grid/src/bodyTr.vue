<template>
  <tr
    class="t_grid_body_tr"
    :class="{[`row-${rowIndex}`]: true, 'row_selected': (rowSelectionKeys || []).includes(rowIndex)}"
  >
    <template v-for="(col, colIndex) in columnFields">
      <cell
        v-if="getCellRowSpan(col.dataIndex, rowIndex) !== 0 && getCellColSpan(columnKey[col.dataIndex], rowIndex) !== 0"
        :key="col.dataIndex + row[col.dataIndex] + rowIndex + (rowSelectionKeys || []).includes(rowIndex)"
        :rowspan="getCellRowSpan(col.dataIndex, rowIndex)"
        :colspan="getCellColSpan(columnKey[col.dataIndex], rowIndex)"
        :row="row"
        :is-changed="changedCell[col.dataIndex] && changedCell[col.dataIndex].includes(rowIndex)"
        :status="cellStatus"
        @update:status="status => $emit('update:status', status)"
        :actived="rect.dataIndex === col.dataIndex && rect.rowIndex === rowIndex"
        @change="dataChanged"
        @click="cellClick"
        @dblclick="cell2Edit"
        @mousedown.native="selectCell({rowIndex: rowIndex, dataIndex: col.dataIndex, colSelectDisabled: col.selectDisabled})"
        @mouseup.native.stop="cellMouseup"
        :cellStyle="cellStyle"
        :row-index="rowIndex"
        :col-index="colIndex"
        :col-length="columnFields.length"
        :fixedColumnLeft="fixedColumnLeft"
        :fixedColumnRight="fixedColumnRight"
        :col="col"
        :data-index="col.dataIndex"
      ></cell>
    </template>
  </tr>
</template>
<script>
import Cell from './cell.vue'

export default {
  name: 'TGridBodyTr',
  components: {
    Cell
  },
  props: {
    rowIndex: Number,
    row: {
      type: Object,
      default: () => ({})
    },
    tableData: {
      type: Array,
      default: () => []
    },
    // 多选
    rowSelectionKeys: {
      type: [Array, null],
      default: null
    },
    // 获取column最低层级的字段集
    columnFields: {
      type: Array,
      default: () => []
    },
    // column最低层级的字段集dataIndex数组
    colDataIndexFields: {
      type: Array,
      default: () => []
    },
    // 跨行合并
    rowSpan: {
      type: Object,
      default: () => ({})
    },
    // 跨列合并
    colSpan: {
      type: Object,
      default: () => ({})
    },
    // 左冻结列
    fixedColumnLeft: {
      type: Number,
      default: 0
    },
    // 右冻结列
    fixedColumnRight: {
      type: Number,
      default: 0
    },
    // 自定义单元格样式
    cellStyle: Function,
    // 单元格是否可编辑
    cellEditDisabled: Function,
    getCellInfo: Function,
    // 单元格状态
    cellStatus: String,
    // 禁用选中
    selectDisabled: {
      type: Boolean,
      default: false
    },
    rect: {
      type: Object,
      default: () => ({
        dataIndex: '',
        rowIndex: -1,
        isFixed: false,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        wrapW: 0
      })
    }
  },
  data() {
    return {
      changedCell: {}, // 单元格修改标记
      isMousedown: false // 鼠标是否按下
    }
  },
  computed: {
    columnKey() { // dataIndex对应序号
      let columnKey = {}
      this.columnFields.forEach((col, key) => {
        columnKey[col.dataIndex] = key
      })
      return columnKey
    },
    cellRowSpan() { // 根据配置加入不渲染的单元格描述
      let cellRowSpan = {}
      const { rowSpan } = this
      if (rowSpan) {
        Object.keys(rowSpan).forEach(dataIndex => {
          cellRowSpan[dataIndex] = {}
          let lastIndex = ''
          Object.keys(rowSpan[dataIndex]).forEach(rowIndex => {
            const span = rowSpan[dataIndex][rowIndex]
            if (cellRowSpan[dataIndex][rowIndex] === 0) { // 当前单元格被合并
              // FIXME: 此处暂定为顺序排列，乱序需先排序
              cellRowSpan[dataIndex][lastIndex] = Number(rowIndex) - Number(lastIndex)
            }
            cellRowSpan[dataIndex][rowIndex] = span
            let step = 1
            while (span - step >= 1) {
              cellRowSpan[dataIndex][Number(rowIndex) + step] = 0 // 需要隐藏的行
              step++
            }
            lastIndex = rowIndex // 记录下当前rowIndex，后面单元格冲突时需要处理
          })
        })
      }
      return cellRowSpan
    },
    cellColSpan() { // 根据配置加入不渲染的单元格描述
      let cellColSpan = {}
      const { colSpan, columnKey } = this
      if (colSpan) {
        Object.keys(colSpan).forEach(rowIndex => {
          cellColSpan[rowIndex] = {}
          let lastIndexKey = 0
          Object.keys(columnKey).forEach(dataIndex => { // 根据列顺序取数，避免冲突，序号越后优先级越高
            const span = colSpan[rowIndex][dataIndex]
            const dataIndexKey = columnKey[dataIndex] // 该列序号
            if ((span || span === 0) && (!this.isColFixed(dataIndexKey) || (this.isColFixed(dataIndexKey) && this.isColFixed(dataIndexKey + span - 1)))) { // 非冻结列
              if (cellColSpan[rowIndex][dataIndexKey] === 0) { // 当前单元格被合并
                cellColSpan[rowIndex][lastIndexKey] = dataIndexKey - Number(lastIndexKey)
              }
              cellColSpan[rowIndex][dataIndexKey] = span
              let step = 1
              while (span - step >= 1) {
                cellColSpan[rowIndex][dataIndexKey + step] = 0 // 需要隐藏的行
                step++
              }
              lastIndexKey = dataIndexKey // 记录下当前dataIndexKey，后面单元格冲突时需要处理
            }
          })
        })
      }
      return cellColSpan
    }
  },
  watch: {
    tableData: function () {
      // 数据变更清空修改记录标记
      this.changedCell = {}
    },
    rect: function (rect) {
      if (rect.rowIndex >= 0) {
        document.documentElement.addEventListener('mouseup', this.gridBlur)
      } else {
        document.documentElement.removeEventListener('mouseup', this.gridBlur)
      }
    }
  },
  destroyed() {
    document.documentElement.removeEventListener('mouseup', this.gridBlur)
  },
  methods: {
    getCellRowSpan(dataIndex, rowIndex) { // 获取单元格跨行配置
      if (!this.cellRowSpan[dataIndex]) { // 无跨行
        return 1
      } else if (!this.cellRowSpan[dataIndex][rowIndex] && this.cellRowSpan[dataIndex][rowIndex] !== 0) { // 无当前行
        return 1
      } else {
        return this.cellRowSpan[dataIndex][rowIndex]
      }
    },
    getCellColSpan(dataIndexKey, rowIndex) { // 获取单元格跨列配置
      if (!this.cellColSpan[rowIndex]) { // 无跨列
        return 1
      } else if (!this.cellColSpan[rowIndex][dataIndexKey] && this.cellColSpan[rowIndex][dataIndexKey] !== 0) { // 无当前列
        return 1
      } else {
        return this.cellColSpan[rowIndex][dataIndexKey]
      }
    },
    isColFixed(dataIndexKey) { // 查询当前列是否为冻结列
      const { fixedColumnLeft, fixedColumnRight, columnFields } = this
      if (fixedColumnLeft && dataIndexKey <= fixedColumnLeft - 1) {
        return true
      } else if (fixedColumnRight && columnFields.length - dataIndexKey <= fixedColumnRight) {
        return true
      } else {
        return false
      }
    },
    dataChanged(val, dataIndex, rowIndex) { // 单元格数据变更通知
      if (this.tableData[rowIndex]) {
        this.tableData[rowIndex][dataIndex] = val
        // 记录编辑的位置
        if (this.changedCell[dataIndex]) {
          this.changedCell[dataIndex].push(rowIndex)
        } else {
          this.changedCell[dataIndex] = [rowIndex]
        }
        this.$emit('change', JSON.parse(JSON.stringify(this.tableData[rowIndex])), dataIndex, rowIndex)
      }
      this.$emit('update:cellStatus', 'readonly')
    },
    cellMouseup() {
      this.isMousedown = false
    },
    cellClick(val) {
      this.$emit('cellClick', val)
    },
    selectCell({ dataIndex, rowIndex, colSelectDisabled }) { // 选中单元格
      this.isMousedown = true
      this.$emit('update:cellStatus', 'readonly')
      if (colSelectDisabled || this.selectDisabled) {
        this.hiddenCellRect()
      } else {
        this.$emit('update:rect', this.getCellInfo(dataIndex, rowIndex))
      }
    },
    hiddenCellRect() { // 隐藏选中框
      this.$emit('update:rect', {
        dataIndex: '',
        rowIndex: -1,
        isFixed: false,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        wrapW: 0
      })
    },
    cell2Edit({ event }) { // 使单元格进入编辑状态
      this.$emit('cellDbclick', { event })
      const { rect } = this
      if (!rect.dataIndex) return
      const col = this.columnFields[this.colDataIndexFields.indexOf(rect.dataIndex)]
      if (col.render) return // 自定义渲染不支持行内编辑
      if (!col.editConfig || (this.cellEditDisabled && this.cellEditDisabled(rect.dataIndex, rect.rowIndex, this.value))) {
        event && this.shaky(event)
      } else {
        this.$emit('update:cellStatus', 'edit')
      }
    },
    gridBlur() { // grid失去焦点
      // 避免打断正在执行的方法
      this.$nextTick(() => {
        this.hiddenCellRect()
      })
    },
    shaky(e) { // 使元素抖动，禁止编辑时触发
      e.classList.add('shaky')
      setTimeout(() => {
        e.classList.remove('shaky')
      }, 300)
    }
  }
}
</script>
