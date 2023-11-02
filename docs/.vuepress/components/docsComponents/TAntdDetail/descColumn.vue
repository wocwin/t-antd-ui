<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <a-radio-group v-model="descColumn" style="margin-bottom:15px;">
        <a-radio-button :value="1">一行展示</a-radio-button>
        <a-radio-button :value="2">一行展示2项</a-radio-button>
        <a-radio-button :value="3">一行展示3项</a-radio-button>
        <a-radio-button :value="4">一行展示4项</a-radio-button>
      </a-radio-group>
      <t-antd-detail :descData="descData" :descColumn="descColumn" />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
import data from './data.json'
export default {
  name: 'TDetailDemo',
  data() {
    return {
      descColumn: 1,
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
          span: 3
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
