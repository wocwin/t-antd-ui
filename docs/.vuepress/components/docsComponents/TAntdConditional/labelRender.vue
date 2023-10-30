<template>
  <div class="query-data">
    <t-antd-conditional ref="queryCondition" :opts="opts" @submit="conditionEnter" />
  </div>
</template>
<script>
export default {
  name: 'labelRenderDemo',
  data() {
    return {
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null
      }
    }
  },
  computed: {
    opts() {
      return {
        likeCargoNo: {
          label: () => {
            return (
              <a-tooltip title={'Function方式'} placement="top">
                <div style="color:red;">货源编号：</div>
              </a-tooltip>
            )
          },
          placeholder: '自定义label Function',
          comp: 'a-input',
        },
        likeBookNo: {
          label: () => {
            return (
              <a-tooltip title={'Function方式'} placement="top">
                <div style="color:blue;">订单编号：</div>
              </a-tooltip>
            )
          },
          placeholder: '自定义label Function',
          comp: 'a-input'
        },
        likeTransportNo: {
          label: {
            comp: 'label',
            label: '运单编号：',
            color: 'green'
          },
          placeholder: '自定义label Object',
          comp: 'a-input',
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'a-input',
        }
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName
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
