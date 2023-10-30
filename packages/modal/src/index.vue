<template>
  <Modal v-modal-drag v-if="render" v-bind="attrs" v-on="$listeners">
    <template v-for="(index, name) in $slots" :slot="name">
      <slot :name="name" />
    </template>
  </Modal>
</template>
<script>
import { Modal } from 'ant-design-vue'
export default {
  name: 'TAntdModal',
  components: {
    Modal
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    destroySelfOnClose: Boolean // 关闭时是否销毁自身
  },
  data() {
    return {
      render: true,
      timer: 0
    }
  },
  computed: {
    attrs() {
      return {
        cancelText: '取消',
        okText: '确定',
        maskClosable: false,
        ...this.$attrs
      }
    }
  },
  watch: {
    '$attrs.visible': function (n) {
      if (!this.destroySelfOnClose) return
      if (n) {
        clearTimeout(this.timer)
        this.render = n
      } else {
        this.timer = setTimeout(() => {
          this.render = n
        }, 1000)
      }
    }
  },
  directives: {
    modalDrag: {
      bind(el) {
        const dialogHeaderEl = el.querySelector('.ant-modal-header')
        const dragDom = el.querySelector('.ant-modal-content')
        if (!dialogHeaderEl || !dragDom) return
        dialogHeaderEl.style.cursor = 'move'
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
        let disX, disY, styL, styT
        // 移动
        const mouseMoveHandler = (e) => {
          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX
          const t = e.clientY - disY
          // 移动当前元素
          dragDom.style.left = `${l + styL}px`
          dragDom.style.top = `${t + styT}px`
        }
        // 手指抬起
        const mouseUpHandler = () => {
          document.removeEventListener('mousemove', mouseMoveHandler)
          document.removeEventListener('mouseup', mouseUpHandler)
        }
        // 手指按下
        const mouseDownHandler = (e) => {
          disX = e.clientX - dialogHeaderEl.offsetLeft
          disY = e.clientY - dialogHeaderEl.offsetTop
          // 获取到的值带px 正则匹配替换
          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (sty.left.includes('%')) {
            styL =
              +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100)
            styT =
              +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100)
          } else {
            styL = +sty.left.replace(/\px/g, '')
            styT = +sty.top.replace(/\px/g, '')
          }
          document.addEventListener('mousemove', mouseMoveHandler)
          document.addEventListener('mouseup', mouseUpHandler)
        }
        dialogHeaderEl.addEventListener('mousedown', mouseDownHandler)
      }
    }
  }
}
</script>
<style lang="scss">
.header-center {
  .ant-modal-header {
    .ant-modal-title {
      text-align: center;
    }
  }
}
.footer-center {
  .ant-modal-footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
