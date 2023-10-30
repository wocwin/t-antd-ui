<template>
  <div class="t_antd_result">
    <Icon :type="icon" theme="filled" />
    <p class="content">{{title}}</p>
    <p class="next" @click="nextHandler">
      {{content}}
      <Icon type="right" />
    </p>
  </div>
</template>
<script>
import { Icon } from 'ant-design-vue'
export default {
  name: 'TAntdResult',
  components: {
    Icon
  },
  props: {
    icon: {
      type: String,
      default: 'check-circle'
    },
    title: {
      type: String,
      default: '提交成功！'
    },
    content: {
      type: String,
      default: '下一步'
    }
  },
  methods: {
    nextHandler() {
      this.$emit('nextHandler')
    }
  }
}
</script>
<style lang="scss" scoped>
.t_antd_result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .anticon-check-circle {
    margin-top: 28px;
    font-size: 48px;
    color: #51c31b;
  }
  .content {
    margin: 16px 0 13px 12px;
    font-size: 18px;
    color: #000;
  }
  .next {
    margin-bottom: 18px;
    font-size: 14px;
    color: #355db4;
    cursor: pointer;
    .anticon {
      margin-left: 8px;
      color: #868487;
    }
  }
}
</style>
