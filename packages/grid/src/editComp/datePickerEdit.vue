<template>
  <DatePicker class="t_grid_DatePickerEdit" v-bind="opt.bind" v-on="opt.event" />
</template>
<script lang="ts">
import Vue from "vue"
import { Col } from "../types"
import moment from "moment"
import { DatePicker } from "ant-design-vue"
import { Component, Prop } from "vue-property-decorator"
import { EditConfig } from "../types"
@Component({
  components: {
    DatePicker
  }
})
export default class DatePickerEdit extends Vue {
  // 内容
  @Prop({
    type: [String, Number],
    default: null
  })
  value!: string | number | null
  // 编辑配置
  @Prop({
    type: Object,
    default: () => ({
      type: "string"
    })
  })
  editConfig!: EditConfig
  // 元组件配置
  @Prop({
    type: Object
  })
  metaAttr?: DatePicker
  @Prop({
    type: Object,
    default: () => ({})
  })
  col!: Col

  get opt() {
    const attr = this.editConfig.attr || {} // 配置传递来的组件配置
    const format =
      this.col.type === "dateTime" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"
    if (this.editConfig.format) {
      console.warn("已调整使用attr属性传递format配置")
    }
    const showTime = this.col.type === "dateTime"
    return {
      bind: {
        autoFocus: true,
        value: this.value ? moment(this.value) : moment(),
        open: true,
        dropdownClassName: "gridDateEditPopup",
        format,
        showTime,
        ...attr,
        ...this.metaAttr
      },
      event: {
        change: (v: moment.Moment) => {
          this.$emit("input", v === null ? "" : v.format(format))
        }
      }
    }
  }
  mounted() {
    this.$nextTick(() => {
      for (let ele of document.getElementsByClassName("gridDateEditPopup")) {
        // 阻止mouseup退出编辑模式
        ele.addEventListener("mouseup", (e: Event) => {
          e.stopPropagation()
        })
        // 输入
        // ele.getElementsByClassName('ant-calendar-input-wrap')[0].addEventListener('mouseup', (e: Event) => {
        //   e.stopPropagation()
        // })
        // ele.getElementsByClassName('ant-calendar-input-wrap')[0].addEventListener('mousedown', (e: Event) => {
        //   e.stopPropagation()
        // })
        // // 年月选择
        // ele.getElementsByClassName('ant-calendar-header')[0].addEventListener('mouseup', (e: Event) => {
        //   e.stopPropagation()
        // })
        // ele.getElementsByClassName('ant-calendar-header')[0].addEventListener('mousedown', (e: Event) => {
        //   e.stopPropagation()
        // })
        // 页脚
        // ele.getElementsByClassName('ant-calendar-footer')[0].addEventListener('mouseup', (e: Event) => {
        //   e.stopPropagation()
        // })
      }
    })
  }
}
</script>
<style lang="scss">
.t_grid_DatePickerEdit {
  display: flex !important;
  align-items: center;
  position: absolute !important;
  z-index: 2;
  top: 4px;
  left: 4px;
  width: calc(100% - 8px) !important;
  min-height: calc(100% - 8px);
  height: inherit !important;
  background-color: #fff;
  .ant-calendar-picker-input {
    padding: 0;
    height: auto;
    border: none;
    line-height: 21px;
  }
  .ant-calendar-picker-icon {
    display: none;
  }
  .ant-calendar-picker-clear {
    right: 0;
  }
}
.gridDateEditPopup {
  transform: translateY(60px);
}
</style>