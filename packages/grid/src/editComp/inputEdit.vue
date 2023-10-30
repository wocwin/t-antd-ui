<template>
  <Input class="t_grid_inputEdit" v-bind="opt.bind" v-on="opt.event" @mousedown.native.stop />
</template>
<script lang="ts">
import Vue from "vue"
import moment from "moment"
import { Input } from "ant-design-vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { EditConfig } from "../types"
import { TextArea } from "ant-design-vue/types/input/textarea"
@Component({
  components: {
    Input: Input.TextArea
  }
})
export default class InputEdit extends Vue {
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
  metaAttr?: TextArea

  cellVal = this.value
  @Watch("value") onValueChanged(n: string | number | null) {
    this.cellVal = n
  }
  get opt() {
    return {
      bind: {
        value: this.cellVal,
        autoSize: true,
        resize: false,
        ...this.metaAttr
      },
      event: {
        blur: (v: any) => {
          v.target && this.$emit("input", this.cellVal)
        },
        change: (v: any) => {
          this.cellVal = v.target.value
        }
      }
    }
  }
  mounted() {
    ;(this.$el as any).select()
  }
}
</script>
<style lang="scss">
textarea.t_grid_inputEdit {
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 2;
  display: inline-block;
  padding: 0;
  width: calc(100% - 8px) !important; // 留出右选中框的空间
  min-height: calc(100% - 8px) !important;
  border: none;
  border-radius: 0;
  resize: none;
  line-height: 21px;
  &:focus {
    box-shadow: none;
  }
}
</style>