<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-select
        placeholder="请选择工序（多选）"
        v-model="selectVlaue"
        :optionSource="stepList"
        valueKey="label"
        mode="multiple"
        @change="selectChange"
      />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
export default {
  data() {
    return {
      selectVlaue: null,
      stepList: [
        { label: '开始' }, { label: 'POSUI' }, { label: '11' }, { label: 'GX123' }, { label: '烘干破碎' }, { label: '车间仓库' }, { label: 'ui3333' }, { label: 'hhh333' }]
    }
  },
  methods: {
    selectChange(val) {
      console.log('selectChange', val, this.selectVlaue)
    }
  }
}
</script>