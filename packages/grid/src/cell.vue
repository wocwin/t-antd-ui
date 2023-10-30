<template>
  <td
    :class="{
      't_grid_cell': true,
      'is-Changed': isChanged,
      'is_edit': status === 'edit' && actived,
      'first_cell': colIndex === 0,
      'fixed_left': fixedBorderL,
      'fixed_right': fixedBorderR,
      [col.type || 'string']: true
    }"
    :data-fixed="fixed"
    :style="style"
    @dblclick="dblclick"
    @mouseup="mouseup">
    <VNodes :vnodes="renderChild" />
    <slot :column="col" :text="value" :record="row" :index="rowIndex"  />
  </td>
</template>

<script lang="tsx">
import Vue from 'vue'
import DatePickerEdit from './editComp/datePickerEdit.vue'
import InputEdit from './editComp/inputEdit.vue'
import InputNumberEdit from './editComp/inputNumberEdit.vue'
import SelectEdit from './editComp/selectEdit.vue'
import { Component, Prop } from 'vue-property-decorator'
import { Col } from './types'
@Component({
  components: {
    DatePickerEdit,
    InputEdit,
    InputNumberEdit,
    SelectEdit,
    VNodes: {
      functional: true,
      render: (h: Vue.CreateElement, ctx: Vue.RenderContext) => ctx.props.vnodes
    }
  }
})
export default class TGridCell extends Vue {
  // 行数据
  @Prop({
    type: Object,
    default: {}
  }) row!: {[propName: string]: string | number | null}
  // 数据类型
  @Prop({
    type: Object,
    default: () => ({})
  }) col!: Col
  // 左侧冻结列数
  @Prop({
    type: Number,
    default: 0
  }) fixedColumnLeft?: number
  // 右侧冻结列数
  @Prop({
    type: Number,
    default: 0
  }) fixedColumnRight?: number
  // 当前列序号
  @Prop({
    type: Number,
    default: 0
  }) colIndex!: number
  // 当前行序号
  @Prop({
    type: Number,
    default: 0
  }) rowIndex!: number
  // 当前列总数
  @Prop({
    type: Number,
    default: 0
  }) colLength!: number
  // 自定义单元格样式
  @Prop({
    type: Function
  }) cellStyle?: Function
  // 是否编辑过
  @Prop({
    type: Boolean,
    default: false
  }) isChanged!: boolean
  // 单元格状态，readonly 只读、edit 编辑
  @Prop({
    type: String,
    default: 'readonly'
  }) status!: string
  // 单元格选中状态
  @Prop({
    type: Boolean,
    default: false
  }) actived!: boolean

  dateOpen = true
  offsetLeft = -1 // 左侧冻结
  offsetWidth = -1 // 右侧冻结需要用到
  parentOffsetWidth = -1 // 父级宽度
  customStyle: any = {} // 装载用户自定义样式
  clickTimer: any = 0 // 单击事件延时处理双击

  get value() {
    return this.row[this.col.dataIndex]
  }
  get cellVal() {
    const { editConfig } = this.col
    if (editConfig?.data) {
      console.warn('col.editConfig.data 配置已废弃，请改用col.editConfig.attr.options')
    }
    if (editConfig?.customField) {
      console.warn('col.editConfig.customField 配置已废弃，请改用col.enumField')
    }
    const type = this.col.type || editConfig?.type || ''
    const enumData = this.editCompAttr?.options || this.col.enumData || editConfig?.data || []
    let val = this.value
    // 下拉枚举需要转换为对应key值
    if (['select', 'enum'].includes(type)) {
      let replaceFields = this.col.enumField || editConfig?.customField || {
        key: 'key',
        label: 'label'
      }
      if (this.editCompAttr?.options) {
        replaceFields = this.editCompAttr?.replaceFields || {
          key: 'value',
          label: 'label',
        }
      }
      enumData.some(item => {
        if (item[replaceFields.key] === this.value) {
          val = item[replaceFields.label]
          return true
        }
      })
    }
    return val || val === 0 ? val.toString() : ''
  }
  get fixed() {
    const { fixedColumnLeft, fixedColumnRight, colIndex, colLength } = this
    if (fixedColumnLeft && colIndex + 1 <= fixedColumnLeft) {
      return 'left'
    } else if (fixedColumnRight && colLength - colIndex <= fixedColumnRight) {
      return 'right'
    } else {
      return 'none'
    }
  }
  get fixedBorderL() {
    const { fixedColumnLeft, colIndex } = this
    if (fixedColumnLeft && colIndex + 1 === fixedColumnLeft) {
      return true
    } else {
      return false
    }
  }
  get fixedBorderR() {
    const { fixedColumnRight, colIndex, colLength } = this
    if (fixedColumnRight && colLength - colIndex === fixedColumnRight) {
      return true
    } else {
      return false
    }
  }
  get style() {
    const { width, minWidth } = this.col
    const { fixed, offsetLeft, offsetWidth, parentOffsetWidth, customStyle } = this
    let style: any = { ...customStyle }
    if (minWidth) {
      style.minWidth = minWidth.replace(/\d+/g, str => {
        return (Number(str)).toString()
      })
    }
    if (width) {
      style.width = width
    }
    if (fixed !== 'none' && offsetWidth !== -1) {
      style.position = 'sticky'
      style.zIndex = 20
      if (fixed === 'left') {
        style.left = offsetLeft + 'px'
      } else if (fixed === 'right') {
        style.right = parentOffsetWidth - offsetLeft - offsetWidth + 1 + 'px'
      }
    }
    return style
  }
  get editCompName() {
    const { editConfig } = this.col
    if (!editConfig) return ''
    const type = this.col.type || editConfig.type
    if (editConfig.type) {
      console.warn('col.editConfig.type 配置已废弃，请改用col.type')
    }
    switch (type) {
      case 'string':
        return InputEdit
      case 'number':
        return InputNumberEdit
      case 'date':
      case 'dateTime':
        return DatePickerEdit
      case 'select':
      case 'enum':
        if (editConfig.type === 'select') {
          console.warn('type: \'select\'配置已废弃，请改用type: \'enum\'')
        }
        return SelectEdit
      default:
        console.warn(`字段${this.col.dataIndex}列未指定类型，请配置col.type`)
        return InputEdit
    }
  }
  get editCompAttr() {
    const { editConfig } = this.col
    if (!editConfig || !editConfig.attr) return {}
    if (typeof editConfig.attr === 'function') {
      return editConfig.attr(JSON.parse(JSON.stringify(this.row)), this.col.dataIndex, this.rowIndex) || {}
    } else {
      return editConfig.attr
    }
  }
  get renderChild() {
    const h = this.$createElement
    const { col, rowIndex, value, cellVal,status, actived, editCompName, editCompAttr } = this
    if (col.render) { // col render函数自定义渲染
      return [col.render(h, col.dataIndex, rowIndex, value)]
    }
    if (this.$scopedSlots.default) {
      return []
    }
    if (status === 'edit' && actived && editCompName) { // 渲染行内编辑组件
      return [cellVal, h(editCompName, {
        props: {
          value: value,
          editConfig: col.editConfig,
          metaAttr: editCompAttr,
          col,
        },
        nativeOn: {
          mouseup(e: Event) {
            e.stopPropagation()
          }
        },
        on: {
          input: this.onValueChanged
        }
      })]
    }
    return h('span', cellVal)
  }
  mounted() {
    this.$nextTick(() => {
      this.getCustomStyle()
      if (this.fixed !== 'none' && (this.$el as HTMLElement) !== null) {
        const $el = this.$el as HTMLElement
        this.offsetLeft = $el.offsetLeft
        this.offsetWidth = $el.offsetWidth
        if ($el.parentElement !== null) {
          this.parentOffsetWidth = $el.parentElement.offsetWidth
        }
      }
    })
  }
  // renderTemplate(children: Vue.VNodeChildren | NormalizedScopedSlot, isSlots?: boolean) { // 渲染模板
  //   const { fixed, col, isChanged, colIndex, fixedBorderL, fixedBorderR, dblclick, click, style, status, actived, clickTimer } = this
  //   return (
  //     <td
  //       class={{
  //         't_grid_cell': true,
  //         'is-Changed': isChanged,
  //         'is_edit': status === 'edit' && actived,
  //         'first_cell': colIndex === 0,
  //         'fixed_left': fixedBorderL,
  //         'fixed_right': fixedBorderR,
  //         [col.type || 'string']: true
  //       }}
  //       data-fixed={fixed}
  //       style={style}
  //       on={{
  //         dblclick: (e: Event) => {
  //           clearTimeout(clickTimer)
  //           dblclick()
  //         },
  //         mouseup: () => {
  //           clearTimeout(clickTimer)
  //           this.clickTimer = setTimeout(click, 300)
  //         }
  //       }}>
  //       { children }
  //       <slot name="default" />
  //     </td>
  //   )
  // }
  onValueChanged(val: string | number | null) {
    if (val === this.value) return
    this.$emit('change', val, this.col.dataIndex, this.rowIndex)
  }
  dblclick() {
    clearTimeout(this.clickTimer)
    this.$emit('dblclick', { colIndex: this.colIndex, rowIndex: this.rowIndex, value: this.value, event: this.$el })
  }
  // 单击单元格，此处主要实现事件通知
  click() {
    this.$emit('click', { dataIndex: this.col.dataIndex, rowIndex: this.rowIndex })
  }
  getCustomStyle() { // 减少初始化渲染等待
    this.customStyle = this.cellStyle ? this.cellStyle(this.col.dataIndex, this.rowIndex, this.value) : {}
  }
  mouseup() {
    clearTimeout(this.clickTimer)
    this.clickTimer = setTimeout(this.click, 300)
  }
}
</script>
<style lang="scss">
@import './index.scss';
@keyframes shaky {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(2px);
  }
}
.t_grid_cell {
  position: relative;
  padding: 4px;
  width: auto;
  height: 29px;
  background-color: #fff;
  // border-top: 1px solid $border-color;
  // border-right: 1px solid $border-color;
  box-shadow: inset -1px -1px 0 0 $border-color;
  text-align: left;
  white-space: pre-line;
  word-break: break-all;
  line-height: 21px;
  &.number {
    text-align: right;
  }
  &.first_cell::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 1px;
    border-left: 1px solid $border-color;
  }
  &.fixed_right::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px;
    display: block;
    width: 1px;
    border-left: 1px solid $border-color;
  }
  &.shaky {
    border-right: 0;
    animation: shaky .15s;
    animation-iteration-count: infinite;
  }
  &.is_changed::after {
    content: '';
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    display: inline-block;
    width: 8px;
    height: 8px;
    border: 4px solid;
    border-color: $theme-color $theme-color transparent transparent;
  }
  &.is_edit {
    box-shadow: 0 0 0px 2px #355db4 inset;
  }
}
</style>