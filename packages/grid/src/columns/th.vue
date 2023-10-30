
<script lang="tsx">
import Vue from 'vue'
import { Col } from '../types'
import { Component, Prop } from 'vue-property-decorator'
import GridSortHandle from './GridSortHandle.vue'
import GridThFilter from './GridThFilter/index.vue'
@Component
export default class DhGridThCell extends Vue {
  @Prop({
    type: Object,
    default: () => ({})
  }) col!: Col
  // 表头层级
  @Prop({
    type: Number,
    default: 0
  }) level!: number
  // col下标
  @Prop({
    type: Number,
    default: 0
  }) colKey!: number
  @Prop({
    type: Object,
    default: () => ({
      dataIndex: '',
      direction: ''
    })
  }) sort!: {
    dataIndex: string,
    direction: string,
  }

  offsetTop = 0 // 当前表头单元格距离顶部距离
  offsetLeft = -1 // 用于冻结列
  fixedChildWidth = -1 // 所有冻结子集的宽度
  fixedChildOffsetLeft = -1 // 最后一层第一个子集的左侧距离

  get style() {
    const { width, minWidth, maxWidth, fixed, sort } = this.col
    let style: any = {
      width,
    }
    if (minWidth) {
      style.minWidth = minWidth
    }
    if (maxWidth) {
      style.maxWidth = maxWidth
    }
    if (this.offsetLeft !== -1 && (fixed === 'left' || fixed === 'c_left')) {
      style.position = 'sticky'
      style.zIndex = 160 - this.colKey - this.level
      style.left = this.offsetLeft + 'px'
    } else if (this.offsetLeft !== -1 && (fixed === 'right' || fixed === 'c_right')) {
      style.position = 'sticky'
      style.zIndex = 150 + this.colKey + this.level
      style.right = this.offsetLeft + 1 + 'px'
    }
    if (sort) {
      style.cursor = 'pointer'
    }
    return style
  }
  get spanStyle() {
    const { fixed, children } = this.col
    let style: any = {}
    if (fixed === 'c_left') {
      style.position = 'sticky'
      style.width = this.fixedChildWidth - 4 + 'px' // 8为外容器的内边距
      style.left = this.fixedChildOffsetLeft + 'px'
    } else if (fixed === 'c_right') {
      style.position = 'sticky'
      style.width = this.fixedChildWidth - 4 + 'px' // 8为外容器的内边距
      style.right = this.fixedChildOffsetLeft + 'px'
    }
    if (children) {
      style.justifyContent = 'center'
    }
    return style
  }
  get className() {
    let className = this.col.className || []
    if (this.col.fixed === 'right' || this.col.fixed === 'c_right') {
      className.push('border_l')
    }
    return className
  }
  get children() {
    const { col } = this
    if (typeof col.title === 'function') {
      return [ col.title(this.$createElement) ]
    } else {
      return col.title
    }
  }
  render(h: Vue.CreateElement) {
    const { className, style, spanStyle, children, col, sort } = this
    return (
      <th class={['t_grid_th_cell', ...className, (col.type || 'string')]} style={ style } onClick={this.thClick.bind(this)}>
        <span class="t_grid_th_cell_span" style={ spanStyle }>
          { col.type !== 'number' && children }
          { (col.sort || col.filter) && // 未配置操作则不渲染
            <div class={{ 'handle_wrap': true, 'flex_end': !col.sort && col.filter}}>
            {
              col.sort &&
              h(GridSortHandle, {
                class: {
                  show: col.dataIndex === sort.dataIndex && sort.direction !== ''
                },
                props: {
                  sort: sort.dataIndex === col.dataIndex ? sort.direction : '',
                }
              })
            }
            {
              col.filter &&
              h(GridThFilter, {
                props: {
                  col,
                },
                on: {
                  filterChange: (val: any) => this.$emit('filterChange', val)
                }
              })
            }
            </div>
          }
          { col.type === 'number' && children }
        </span>
      </th>
    )
  }
  mounted() {
    this.offsetTop = (this.$el as HTMLElement).offsetTop
    setTimeout(() => {
      this.initFixed()
    }, 0)
  }
  initFixed() {
    const { fixed, dataIndex } = this.col
    const $el = this.$el as HTMLElement
    if (fixed === 'left') {
      this.offsetLeft = $el.offsetLeft
    } else if (fixed === 'c_left' && $el.offsetParent) { // 子集冻结
      var lastChildElesL = $el.offsetParent.getElementsByClassName(dataIndex + '_lastChild')
      var childWidthL = 0
      for (var eleL of lastChildElesL) {
        childWidthL += (eleL as HTMLElement).offsetWidth
      }
      this.fixedChildWidth = childWidthL // 边框
      this.fixedChildOffsetLeft = (lastChildElesL[0] as HTMLElement).offsetLeft
      this.offsetLeft = childWidthL - $el.offsetWidth + $el.offsetLeft // 边框
    }

    if (fixed === 'right' && $el.offsetParent && $el.offsetParent.parentElement) {
      this.offsetLeft = ($el.parentElement as any).offsetWidth - $el.offsetLeft - $el.offsetWidth
    } else if (fixed === 'c_right' && $el.offsetParent && $el.offsetParent.parentElement) {
      var lastChildElesR = $el.offsetParent.getElementsByClassName(dataIndex + '_lastChild')
      var childWidthR = 0
      for (var eleR of lastChildElesR) {
        childWidthR += (eleR as HTMLElement).offsetWidth
      }
      this.fixedChildWidth = childWidthR // 边框
      this.fixedChildOffsetLeft = ($el.parentElement as any).offsetWidth - $el.offsetWidth - $el.offsetLeft
      this.offsetLeft = ($el.parentElement as any).offsetWidth - $el.offsetWidth - $el.offsetLeft - $el.offsetWidth + childWidthR  // 边框
    }
  }
  thClick() {
    if (this.col.sort) {
      this.$emit('sortHandle', this.col.dataIndex)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../index.scss";
.t_grid_th_cell {
  z-index: 150;
  padding: 4px;
  background-color: $head-cell-bg;
  box-shadow: inset -1px -1px 0 0 $border-color;
  &.number {
    .handle_wrap {
      flex-direction: row-reverse;
    }
  }
  &.border_l::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px;
    display: block;
    width: 1px;
    border-left: 1px solid $border-color;
  }
  .handle_wrap {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    &.flex_end {
      justify-content: flex-end;
    }
  }
  &:hover {
    ::v-deep .t_grid_th_sort_handle,
    .t_grid_th_filter {
      visibility: unset;
    }
  }
  span {
    display: flex;
    margin: auto;
  }
}
</style>