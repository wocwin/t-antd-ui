<template>
  <FormModelItem
    :label="typeof opt.label === 'string' && opt.label"
    :prop="opt.dataIndex"
    :ref="opt.dataIndex"
    :label-align="opt.labelAlign||'left'"
  >
    <template>
      <component v-if="typeof opt.label === 'object'" :is="opt.label" />
      <template v-else-if="typeof opt.label === 'function'">
        <render-comp :createElementFunc="opt.label" />
      </template>
    </template>
    <OptComponent v-bind="opt" :value="value" @child-change="change" />
  </FormModelItem>
</template>
<script>
import OptComponent from './OptComponent'
import { FormModel } from 'ant-design-vue'
import RenderComp from './render-comp'
export default {
  name: 'TAntdConfigFormItem',
  components: {
    OptComponent,
    FormModelItem: FormModel.Item,
    RenderComp
  },
  props: {
    opt: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [String, Number, Array, Object],
      default: null
    }
  },
  methods: {
    change(v, dataIndex) {
      this.$emit('change', v, dataIndex)
    }
  }
}
</script>
