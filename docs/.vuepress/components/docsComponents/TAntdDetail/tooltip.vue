<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-detail :descData="descData" />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
import data from './data.json'
export default {
  name: 'TDetailDemo',
  data() {
    return {
      descData: [
        {
          label: '字符串方式',
          fieldName: 'stocktakeJobStatusLabel',
          value: '',
          tooltip: '盘点单状态'
        },
        {
          label: '函数方式',
          fieldName: 'planStocktakeUserName',
          value: '',
          tooltip: () => {
            return <div>盘点负责人</div>
          },
        },
        {
          label: 'icon自定义',
          fieldName: 'planStocktakeDate',
          value: '',
          iconClass: 'question-circle',
          tooltip: () => {
            return <div>计划盘点日期</div>
          },
        },
        {
          label: 'icon自定义样式',
          fieldName: 'stocktakeJobStatus',
          value: '',
          style: { color: 'hotpink', fontSize: '32px', cursor: 'pointer' },
          tooltip: () => {
            return <div>盘点类型</div>
          },
        },
      ],
    }
  },
  created() {
    this.getTakeRecordHead()
  },
  methods: {
    // 头部信息
    async getTakeRecordHead() {
      const res = await data
      // console.log('头部信息', res)
      if (res.success) {
        // 回显基础信息
        this.descData.map(item => {
          item.value = res.data[item.fieldName]
        })
      }
    }
  }
}
</script>
