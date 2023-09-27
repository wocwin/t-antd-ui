<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-layout-table
        title="table插槽，默认table将不渲染"
        @paginationChange="handleTableChange"
        :pagination="pageOpt"
      >
        <!-- 表格外操作| -->
        <template #btn>
          <a-button type="primary" icon="plus">新增</a-button>
          <a-button type="primary" :disabled="selectedRowKeys.length === 0 ">重新处理</a-button>
          <a-button type="primary" :disabled="selectedRowKeys.length === 0 ">作废</a-button>
        </template>
        <template #table>
          <div>table插槽显示</div>
        </template>
      </t-antd-layout-table>
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
export default {
  name: 'tableSlot',
  data() {
    return {
      // 复选框选中项
      selectedRowKeys: [],
      // 分页器参数
      pageOpt: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  // 方法
  methods: {
    // 获取当前选择页数
    handleTableChange(val) {
      console.log(1212, val)
    }
  }
}
</script>
<style lang="scss">
.dh_grid_table {
  th,
  td {
    border: none;
    padding: 0;
  }
}
</style>
