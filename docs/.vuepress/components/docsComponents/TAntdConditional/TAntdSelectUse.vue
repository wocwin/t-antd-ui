<template>
  <div class="query-data">
    <t-antd-conditional
      ref="queryCondition"
      labelWidth="140px"
      :opts="opts"
      @submit="conditionEnter"
    />
  </div>
</template>
<script>
const ADDRESS_TYPES = [
  {
    label: '前纺一车间',
    key: 'W1'
  },
  {
    label: '前纺二车间',
    key: 'W2'
  },
  {
    label: '前纺三车间',
    key: 'W3'
  }
]
const ADDRESS_TYPES1 = [
  {
    name: '前纺一车间',
    id: 'W1'
  },
  {
    name: '前纺二车间',
    id: 'W2'
  },
  {
    name: '前纺三车间',
    id: 'W3'
  },
  {
    name: '前纺四车间',
    id: 'W4'
  }
]
export default {
  name: 'queryData',
  data() {
    return {
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null,
        workshopNum: null,
        workshopNum1: null,
      }
    }
  },
  computed: {
    opts() {
      return {

        workshopNum: {
          label: 't-select多选',
          comp: 't-antd-select',
          span: 2,
          bind: {
            mode: 'multiple',
            optionSource: ADDRESS_TYPES1,
            valueKey: 'id',
            labelKey: 'name',
          },
        },
        workshopNum1: {
          label: 't-select单选',
          comp: 't-antd-select',
          defaultVal: 'W1',
          bind: {
            optionSource: ADDRESS_TYPES
          },
        },
        likeCargoNo: {
          label: '货源编号',
          comp: 'a-input',
        },
        likeBookNo: {
          label: '订单编号',
          comp: 'a-input'
        },
        likeTransportNo: {
          label: '运单编号',
          comp: 'a-input'
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'a-input',
        },
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName, workshopNum, workshopNum1 } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName,
        workshopNum,
        workshopNum1,
      }
    }
  },
  // 方法
  methods: {
    // 点击查询按钮
    conditionEnter(data) {
      console.log('查询条件', data)
      this.queryData = data
      console.log('最终条件', this.getQueryData)
    }
  }
}
</script>
