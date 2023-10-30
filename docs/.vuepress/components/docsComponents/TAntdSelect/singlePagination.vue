<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-select
        v-model="materialId"
        :optionSource="materialIdArr"
        labelKey="materialName"
        valueKey="id"
        isShowPagination
        placeholder="请选择（单选分页）"
        :paginationOption="setSelectPage"
        @current-change="pageChange"
        @change="selectChange"
      />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
import data from './data.json'
import data2 from './data2.json'
export default {
  name: 'TSelectDemo',
  data() {
    return {
      materialId: null,
      materialIdArr: [],
      setSelectPage: {
        pageSize: 6, // 每页显示条数
        current: 1, // 当前页
        total: 0 // 总条数
      }
    }
  },
  created() {
    this.selectMaterialList(1)
  },
  methods: {
    // 下拉选择分页
    pageChange(val) {
      this.setSelectPage.current = val
      this.selectMaterialList(this.setSelectPage.current)
    },
    // 获取品名下拉数据
    async selectMaterialList(pageNum) {
      let res
      if (pageNum === 1) {
        res = await data
      } else {
        res = await data2
      }
      if (res.success) {
        // console.log('获取品名下拉数据', res.data)
        this.materialIdArr = res.data.records
        this.setSelectPage.total = res.data.total
      }
    },
    selectChange(val) {
      console.log('selectChange', val, this.materialId)
    }
  }
}
</script>
