<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <a-radio-group v-model="layout" style="margin-bottom:15px;">
        <a-radio-button value="horizontal">horizontal布局</a-radio-button>
        <a-radio-button value="vertical">vertical布局</a-radio-button>
      </a-radio-group>
      <t-antd-detail :descData="descData" :layout="layout" />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
import data from './data.json'
export default {
  name: 'TDetailDemo',
  data() {
    return {
      layout: 'horizontal',
      descData: [
        {
          label: '盘点单编号',
          fieldName: 'stocktakePlanNo',
          value: ''
        },
        {
          label: '盘点单状态',
          fieldName: 'stocktakeJobStatusLabel',
          value: ''
        },
        {
          label: '盘点负责人',
          fieldName: 'planStocktakeUserName',
          value: ''
        },
        {
          label: '计划盘点日期',
          fieldName: 'planStocktakeDate',
          value: ''
        },
        {
          label: '盘点类型',
          fieldName: 'stocktakeJobStatus',
          value: '',
        },
        {
          label: '车间',
          fieldName: 'workshopLabel',
          value: ''
        },
        {
          label: '仓库',
          fieldName: 'warehouseName',
          value: ''
        },
        {
          label: '盘点所有物料',
          fieldName: 'originTypeListLabel',
          value: ''
        },
        {
          label: '备注',
          fieldName: 'createRemark',
          value: '',
          span: 4
        }
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
