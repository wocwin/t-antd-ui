<template>
  <div class="t_layout_page" @scroll="e => scrollTop = e.target.scrollTop">
    <slot />
    <a-back-top :target="() => $el" />
  </div>
</template>
<script>
import { BackTop } from 'ant-design-vue'

export default {
  name: 'TAntdLayoutPage',
  components: {
    [BackTop.name]: BackTop
  },
  props: {
    keepScrollDisabled: Boolean
  },
  data() {
    return {
      scrollTop: 0
    }
  },
  activated() {
    if (!this.keepScrollDisabled) {
      this.$el.scrollTop = this.scrollTop
    }
  }
}
</script>
<style lang="scss" scoped>
.t_layout_page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // overflow-y: auto;
  // overflow-x: hidden;
  .ant-back-top {
    right: 10px;
    bottom: 10px;
  }
}
</style>
