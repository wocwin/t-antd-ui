<template>
  <section class="t_layout_page_item">
    <slot />
  </section>
</template>
<script>
export default {
  name: 'TAntdLayoutPageItem'
}
</script>
<style lang="scss" scoped>
.t_layout_page_item {
  margin: 6px 6px 0;
  padding: 6px;
  background: #fff;
  border-radius: 4px;
}
</style>
