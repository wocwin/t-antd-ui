<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-select
        v-model="selectVlaue"
        :optionSource="stepList"
        valueKey="label"
        @change="selectChange"
        placeholder="请选择工序"
      ></t-antd-select>
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
export default {
  data() {
    return {
      selectVlaue: null,
      stepList: [
        { label: '开始', id: 1 },
        { label: 'POSUI', id: 2 },
        { label: '11', id: 3 },
        { label: 'GX123', id: 4 },
        { label: '烘干破碎', id: 5 },
        { label: '车间仓库', id: 6 },
        { label: 'ui3333', id: 7 },
        { label: 'hhh333', id: 8 }]
    }
  },
  methods: {
    selectChange(val) {
      console.log('selectChange', val, this.selectVlaue)
    }
  }
}
</script>
