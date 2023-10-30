<template>
  <div class="query-data">
    <t-antd-conditional ref="queryCondition" :opts="opts" isExpansion @submit="conditionEnter">
      <template #likeTransportNo="{scope}">
        <a-input v-model="scope.likeTransportNo" clearable placeholder="自定义插槽输入框" />
      </template>
      <template #likeTransportNo1="{scope}">
        <a-checkbox-group v-model="scope.likeTransportNo1" :options="plainOptions" />
      </template>
    </t-antd-conditional>
  </div>
</template>
<script>
export default {
  name: 'queryData-slot',
  data() {
    return {
      plainOptions: ['显示禁用科目', '显示辅助核算', '显示无余额无发生科目'],
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeTransportNo1: [],
        likeCargoName: null,
      }
    }
  },
  computed: {
    opts() {
      return {
        likeCargoNo: {
          label: '货源编号',
          comp: 'a-input',
        },
        likeTransportNo: {
          label: '运单编号',
          slotName: 'likeTransportNo',
        },
        likeBookNo: {
          label: '订单编号',
          comp: 'a-input'
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'a-input',
        },
        likeTransportNo1: {
          label: '多选',
          span: 4,
          slotName: 'likeTransportNo1',
        },
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeTransportNo1, likeCargoName } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeTransportNo1,
        likeCargoName
      }
    }
  },
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
