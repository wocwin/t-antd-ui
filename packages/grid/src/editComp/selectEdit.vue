<template>
  <Select class="t_grid_selectEdit" v-bind="opt.bind" v-on="opt.event">
    <!-- <SelectOption v-for="item in sourceData" :key="item[replaceFields.key]" :value="item[replaceFields.key]">{{ item[replaceFields.label] }}</SelectOption> -->
  </Select>
</template>
<script lang="ts">
import Vue from "vue"
import { Col } from "../types"
import { Select } from "ant-design-vue"
import { Component, Prop } from "vue-property-decorator"
import { EditConfig } from "../types"
import { DROPDOWN_CLASS_NAME } from "../context"
@Component({
  components: {
    Select,
    SelectOption: Select.Option
  }
})
export default class SelectEdit extends Vue {
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
  metaAttr?: Select
  @Prop({
    type: Object,
    default: () => ({})
  })
  col!: Col

  get opt() {
    return {
      bind: {
        defaultValue: this.value,
        open: true,
        ...(this.metaAttr || {}),
        dropdownClassName: DROPDOWN_CLASS_NAME,
        options: this.options
      },
      event: {
        change: (v: string | number) => this.$emit("input", v)
      }
    }
  }
  get options() {
    const { editConfig, col, metaAttr, replaceFields } = this
    if (editConfig?.data) {
      console.warn(
        "col.editConfig.data 配置已废弃，请改用col.editConfig.attr.options"
      )
    }
    if (col.enumData) {
      console.warn("col.enumData 配置已废弃，请改用col.editConfig.attr.options")
    }
    return (metaAttr?.options || col.enumData || editConfig?.data || []).map(
      (item) => {
        return {
          ...item,
          value: item[replaceFields.key],
          label: item[replaceFields.label]
        }
      }
    )
  }
  get replaceFields() {
    const { editConfig, col, metaAttr } = this
    if (editConfig?.customField || col.enumField) {
      console.warn(
        "col.enumField 配置已废弃，请改用col.editConfig.attr.replaceFields"
      )
    }
    // 使用元配置
    if (metaAttr?.options) {
      return (
        metaAttr?.replaceFields || {
          key: "value",
          label: "label"
        }
      )
    }
    return (
      col.enumField ||
      editConfig?.customField || {
        key: "key",
        label: "label"
      }
    )
  }
  mounted() {
    this.$nextTick(() => {
      for (let ele of document.getElementsByClassName(DROPDOWN_CLASS_NAME)) {
        // 阻止mouseup退出编辑模式
        ele.addEventListener("mouseup", (e: Event) => {
          e.stopPropagation()
        })
      }
    })
  }
}
</script>
<style lang="scss">
.t_grid_selectEdit {
  display: flex !important;
  align-items: center;
  position: absolute !important;
  z-index: 2;
  top: 4px;
  left: 4px;
  width: calc(100% - 8px) !important;
  min-height: calc(100% - 8px);
  background-color: #fff;
  line-height: 21px;
  .ant-select-selection {
    width: 100%;
    height: auto;
    border: none;
    box-shadow: none !important;
  }
  .ant-select-selection__rendered {
    margin-left: 0;
    line-height: 21px;
  }
}
.gridSelectPopup {
  .ant-select-dropdown-menu {
    padding: 0;
  }
}
</style>