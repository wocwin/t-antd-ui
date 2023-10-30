<template>
  <InputNumber
    ref="InputNumber"
    class="t_grid_inputNumberEdit"
    v-bind="opt.bind"
    v-on="opt.event"
    @mousedown.native.stop
  />
</template>
<script lang="ts">
import Vue from "vue"
import moment from "moment"
import { InputNumber } from "ant-design-vue"
import { Component, Prop } from "vue-property-decorator"
import { EditConfig } from "../types"
@Component({
  components: {
    InputNumber
  }
})
export default class InputNumberEdit extends Vue {
  // 内容
  @Prop({
    type: [String, Number],
    default: null
  })
  value!: string | number | null
  // 配置
  @Prop({
    type: Object
  })
  editConfig!: EditConfig
  // 元组件配置
  @Prop({
    type: Object
  })
  metaAttr?: InputNumber

  get opt() {
    return {
      bind: {
        value: this.value,
        ...this.metaAttr
      },
      event: {
        blur: (v: Event) => {
          v.target && this.$emit("input", (v.target as any).value)
        }
      }
    }
  }
  mounted() {
    this.$nextTick(() => {
      ;(
        this.$refs.InputNumber as any
      ).$refs.inputNumberRef.$refs.inputRef.select()
    })
  }
}
</script>
<style lang="scss">
.t_grid_inputNumberEdit.ant-input-number {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  top: 4px;
  left: 4px;
  width: calc(100% - 8px) !important;
  min-height: calc(100% - 8px);
  height: auto !important;
  border-radius: 0;
  border: none;
  line-height: 21px;
  .ant-input-number-input-wrap {
    display: flex;
    flex-grow: 1;
    .ant-input-number-input {
      flex-grow: 1;
    }
  }
  &.ant-input-number-focused {
    box-shadow: none;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
  .ant-input-number-input {
    padding: 0;
    height: auto;
    border-radius: 0;
    text-align: right;
  }
}
</style>