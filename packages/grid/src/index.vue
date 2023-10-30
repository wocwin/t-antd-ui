<template>
  <div class="t_grid">
    <div v-if="!hideHeader" class="t_grid_sticky_head">
      <table
        ref="tableHead"
        class="t_grid_table"
        :style="{ top: `${stickyTop}px`}"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <colgroup>
          <col
            v-for="(col, key) in columnFields"
            :key="'col' + key + col.dataIndex"
            :style="getColStyle(col)"
          />
        </colgroup>
        <Columns
          :columns="fullColumns"
          :fixedColumnLeft="fixedColumnLeft"
          :fixedColumnRight="fixedColumnRight"
          :col-length="columnFields.length"
          @sortChange="sort => $emit('sortChange', sort)"
          @filterChange="filter => $emit('filterChange', filter)"
        />
        <tbody>
          <tr>
            <td
              v-for="(col, key) in columnFields"
              :key="'col' + key + col.dataIndex"
              :style="getColStyle(col)"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>

    <table ref="tableBody" class="t_grid_table table" border="0" cellspacing="0" cellpadding="0">
      <colgroup>
        <col
          v-for="(col, key) in columnFields"
          :key="'col' + key + col.dataIndex"
          :style="getColStyle(col)"
        />
      </colgroup>
      <Columns
        stealth
        :columns="fullColumns"
        :fixedColumnLeft="fixedColumnLeft"
        :fixedColumnRight="fixedColumnRight"
        :col-length="columnFields.length"
      />
      <tbody ref="tableBodyWrap">
        <body-tr
          v-for="(row, rowIndex) in tableData"
          :key="row[rowKey]"
          ref="bodyTr"
          :table-data="tableData"
          :row="row"
          :rowIndex="rowIndex"
          :row-selection-keys="rowSelectionKeys"
          :row-span="rowSpan"
          :col-span="colSpan"
          :fixed-column-left="fixedColumnLeft"
          :fixed-column-right="fixedColumnRight"
          :cell-style="cellStyle"
          :column-fields="columnFields"
          :col-data-index-fields="colDataIndexFields"
          :cellEditDisabled="cellEditDisabled"
          :cell-status.sync="cellStatus"
          :get-cell-info="getCellInfo"
          :rect.sync="rect"
          :selectDisabled="selectDisabled"
          @change="change"
          @cellClick="cellClick"
          @cellDbclick="val => $emit('cellDbclick', val)"
        />
      </tbody>
      <CellRect v-if="cellRectDisplay" v-bind="rect" />
    </table>
    <!-- <div v-if="!selectDisabled && rect.h !== 0 && rect.w !== 0" class="br_point" :style="`top: ${rect.y + rect.h - 6}px; left: ${rect.x + rect.w - 6}px`"></div> -->
    <div ref="sticky_scroll_x" class="sticky_scroll_x">
      <span class="scroll_cont" :style="{width: `${headWidth}px`}"></span>
    </div>
  </div>
</template>
<script>
import Columns from './columns/index.vue'
import BodyTr from './bodyTr.vue'
import CellRect from './cellRect.vue'
import rowSelectionJs from './rowSelection.js'
import keyListenerJs from './keyListener.js'
import { GRID_SELECTION_KEY } from './context'
export default {
  name: 'TGrid',
  mixins: [rowSelectionJs, keyListenerJs],
  components: {
    Columns,
    BodyTr,
    CellRect
  },
  props: {
    // 列头描述
    columns: {
      type: Array,
      default: () => []
    },
    // 数据源
    dataSource: {
      type: Array,
      default: () => []
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
    // 隐藏表头
    hideHeader: {
      type: Boolean,
      default: false
    },
    // 禁用选中
    selectDisabled: {
      type: Boolean,
      default: false
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
    // 行key的取值
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    // 自定义单元格样式
    cellStyle: Function,
    // 单元格是否可编辑
    cellEditDisabled: Function,
    // 多选
    rowSelectionKeys: {
      type: [Array, null],
      default: null
    },
    // 禁止选择的行
    disabledRowSelectionKeys: {
      type: Array,
      default: () => []
    },
    // 头粘性布局偏移量
    stickyTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tableData: [],
      headWidth: 0,
      scrollLeft: 0,
      cellStatus: 'readonly', // 单元格状态
      rect: {
        dataIndex: '',
        rowIndex: -1,
        isFixed: false,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        wrapW: 0
      }
    }
  },
  computed: {
    fullColumns() { // 原列描述前合并多选列
      return this.selectionCol.concat(this.columns)
    },
    columnFields() { // 获取column最低层级的字段集
      let columnFields = [].concat(this.selectionCol)
      this.columns.forEach(col => {
        columnFields = columnFields.concat(this.getLastCol(col))
      })
      return columnFields
    },
    cellRectDisplay() {
      const { selectDisabled, cellStatus, rect } = this
      if (selectDisabled || rect.dataIndex === GRID_SELECTION_KEY) { // 选择列不允许选中
        return false
      } else if (rect.w === 0 || rect.h === 0) {
        return false
      } else if (cellStatus === 'edit') {
        return false
      }
      return true
    },
    colDataIndexFields() { // 获取column最低层级的字段集dataIndex数组
      return this.columnFields.reduce((acc, cur) => {
        acc.push(cur.dataIndex)
        return acc
      }, [])
    },
    colThroughDataIndex() {
      return this.columnFields.reduce((acc, cur) => {
        acc[cur.dataIndex] = cur
        return acc
      }, {})
    }
  },
  watch: {
    'selectDisabled': function (n) {
      this.setSelectDisabled(n)
    },
    'columns': function () {
      // 更新列头高度
      this.$nextTick(() => {
        this.headWidth = this.$refs.tableHead.scrollWidth
      })
    },
    dataSource(n) {
      this.setData(n)
    },
    'rect': function (n, o) {
      if (n.rowIndex >= 0 && o.rowIndex < 0) { // 选中
        this.addKeyListener()
      }
      if (n.rowIndex < 0) { // 取消选中
        this.removeKeyListener()
      }
    }
  },
  mounted() {
    // 初始化禁用
    this.selectDisabled && this.setSelectDisabled(this.selectDisabled)
    this.syncScroll()
    this.setData(this.dataSource)
  },
  activated() {
    this.$refs['tableHead'].scrollLeft = this.scrollLeft
    this.$refs['tableBody'].scrollLeft = this.scrollLeft
    this.$refs['sticky_scroll_x'].scrollLeft = this.scrollLeft
  },
  methods: {
    // FIXME: setData可废弃，通过设置dataSource数据源进行数据绑定
    setData(data) { // 设置数据源
      this.tableData = JSON.parse(JSON.stringify(data))
    },
    getColStyle(col) { // 获取列样式
      const { width, minWidth, maxWidth } = col
      let style = {}
      if (width) {
        style.width = width
      }
      if (minWidth) {
        style.minWidth = minWidth
      }
      if (maxWidth) {
        style.maxWidth = maxWidth
      }
      return style
    },
    getLastCol(col) { // 取得最后层级的列描述，用于决定渲染内容以哪列为准
      let lastFields = []
      if (col.children && col.children.length > 0) { // 存在子集
        col.children.forEach(cCol => {
          lastFields = lastFields.concat(this.getLastCol(cCol))
        })
      } else {
        lastFields.push(col)
      }
      return lastFields
    },
    syncScroll() { // 同步表头与表格的横向滚动
      if (this.hideHeader) return
      let onScroll = false
      let timer = 0
      this.$nextTick(() => {
        this.headWidth = this.$refs.tableHead.scrollWidth
        // 同步body与head的横向滚动
        this.$refs['tableBody'].addEventListener('scroll', (e) => {
          if (e.target !== null && (!onScroll || onScroll === 'tableBody')) {
            clearTimeout(timer)
            this.scrollLeft = e.target.scrollLeft
            onScroll = 'tableBody'
            this.$refs['tableHead'].scrollLeft = this.scrollLeft
            this.$refs['sticky_scroll_x'].scrollLeft = this.scrollLeft
            timer = setTimeout(() => {
              onScroll = false
            }, 500)
          }
        })
        // 底部粘性横行滚动条同步
        this.$refs['sticky_scroll_x'].addEventListener('scroll', (e) => {
          if (e.target !== null && (!onScroll || onScroll === 'sticky_scroll_x')) {
            clearTimeout(timer)
            this.scrollLeft = e.target.scrollLeft
            onScroll = 'sticky_scroll_x'
            this.$refs['tableHead'].scrollLeft = this.scrollLeft
            this.$refs['tableBody'].scrollLeft = this.scrollLeft
            timer = setTimeout(() => {
              onScroll = false
            }, 500)
          }
        })
      })
    },
    setSelectDisabled(selectDisabled) { // 禁用选择
      if (selectDisabled) { // 禁用选中事件
        this.$el.addEventListener('dblclick', this.stopImmediatePropagation, true)
        this.$el.addEventListener('mouseup', this.stopImmediatePropagation, true)
      } else {
        this.$el.removeEventListener('dblclick', this.stopImmediatePropagation, true)
        this.$el.removeEventListener('mouseup', this.stopImmediatePropagation, true)
      }
    },
    stopImmediatePropagation(e) { // 停止捕获
      e.stopImmediatePropagation()
    },
    cellClick(val) {
      this.$emit('cellClick', val)
    },
    change(val, dataIndex, rowIndex) { // 单元格数据变更通知
      this.$emit('change', val, dataIndex, rowIndex)
    },
    getCellInfo(dataIndex, rowIndex, direction = 'c', num = 0) { // 获取单元格属性，direction: r|b|c 支持选择指定单元格的右、下单元格，num用于记录查找次数，避免溢出
      const colIndex = this.colDataIndexFields.indexOf(dataIndex)
      if (direction === 'r' && colIndex < this.colDataIndexFields.length - 1) { // 往右且还有剩余空间
        dataIndex = this.colDataIndexFields[colIndex + 1]
      } else if (direction === 'b' && rowIndex < this.tableData.length - 1) { // 往下且还有剩余空间
        rowIndex = rowIndex + 1
      }
      const rootElements = this.$el.querySelectorAll(`.row-${rowIndex} [data-index=${dataIndex}]`)
      if (dataIndex && rootElements.length === 1 && !this.colThroughDataIndex[dataIndex].selectDisabled) {
        const rootElement = rootElements[0]
        const dataIndex = rootElement.getAttribute('data-index')
        const fixed = rootElement.getAttribute('data-fixed')
        return {
          dataIndex,
          rowIndex,
          isFixed: fixed !== 'none',
          // 若浮动则需要减去滚动的距离
          x: fixed !== 'none' && rootElement.offsetParent ? rootElement.offsetLeft - rootElement.offsetParent.scrollLeft - 1 : rootElement.offsetLeft - 1,
          y: rootElement.offsetTop - 1,
          w: rootElement.offsetWidth,
          h: rootElement.offsetHeight,
          wrapW: this.$el.offsetWidth
        }
      } else if (num < 30) { // 找不到继续按相同方向继续找，限制尝试30次
        return this.getCellInfo(dataIndex, rowIndex, direction, num + 1)
      } else {
        return this.rect
      }
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
.t_grid {
  position: relative;
  align-self: flex-start;
  border-top: 1px solid $border-color;
  background-color: white;
  .t_grid_sticky_head {
    position: absolute;
    z-index: 90;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    pointer-events: none;
    .t_grid_table {
      position: sticky;
      width: 100%;
      overflow: hidden;
      pointer-events: auto;
    }
  }
  .t_grid_table {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 4px 0 0;
    box-sizing: border-box;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: auto;
    outline-width: 0;
    cursor: default;
    max-width: none;
    max-height: none;
    box-sizing: border-box;
    &.table {
      overflow-x: auto;
      transform: translateZ(0);
      // 隐藏table原生滚动条
      &::-webkit-scrollbar {
        height: 0;
      }
    }
    thead {
      tr {
        th:first-child::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          display: block;
          width: 1px;
          border-left: 1px solid $border-color;
        }
      }
    }
    tbody {
      .row_selected {
        td {
          background-color: rgb(226, 230, 236);
        }
      }
    }
  }
  .sticky_scroll_x {
    position: sticky;
    bottom: 0;
    z-index: 99;
    width: 100%;
    height: 20px;
    overflow-x: auto;
    .scroll_cont {
      display: block;
      height: 1px;
    }
  }
  .br_point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: $theme-color;
    border: 2px solid #fff;
    cursor: crosshair;
  }
}
</style>
