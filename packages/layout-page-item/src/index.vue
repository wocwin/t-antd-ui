<template>
  <section id="t_antd_layout_page_item" class="t_antd_layout_page_item">
    <slot />
  </section>
</template>
<script>
export default {
  name: 'TAntdLayoutPageItem'
}
</script>
<style lang="scss" scoped>
.t_antd_layout_page_item {
  margin: 8px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}
</style>
