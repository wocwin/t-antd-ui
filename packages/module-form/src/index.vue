<template>
  <div class="t_antd_module_form" :style="{marginBottom:footerBtn!==null?'60px':''}">
    <div class="scroll_wrap">
      <a-page-header
        :title="title"
        :sub-title="subTitle"
        @back="back"
        v-bind="{ghost:false,...$attrs}"
        :class="{'isShowBack':isShowBack}"
      >
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </a-page-header>
      <!-- 表单页面 -->
      <AntdModuleForm v-if="handleType==='edit'" v-bind="$attrs" v-on="$listeners" ref="tAntdForm">
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </AntdModuleForm>
      <!-- 详情页面 -->
      <AntdModuleDetail v-else v-bind="$attrs">
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </AntdModuleDetail>
      <div class="tabs" v-if="tabs" :style="{'margin-top':isTabMargin?`${tabMarginNum}px`:0}">
        <a-tabs
          v-if="tabs&&tabs.length > 1"
          :default-active-key="tabs[0].key"
          v-model="activeName"
          @change="(activeKey) => $emit('tabsChange', activeKey)"
          :animated="false"
        >
          <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title">
            <slot :name="tab.key"></slot>
          </a-tab-pane>
        </a-tabs>
        <slot v-else :name="tabs&&tabs[0].key"></slot>
      </div>
      <slot name="default"></slot>
    </div>
    <footer class="handle_wrap" v-if="footerBtn!==null">
      <slot name="footerBtn" />
      <div v-if="!$slots.footerBtn">
        <a-button @click="back">取消</a-button>
        <a-button
          type="primary"
          v-if="handleType==='edit'"
          @click="saveHandle"
          :loading="loading"
        >{{btnTxt}}</a-button>
      </div>
    </footer>
  </div>
</template>
<script>
import { PageHeader, Button, Tabs } from 'ant-design-vue'
import AntdModuleDetail from './antdModuleDetail'
import AntdModuleForm from './antdModuleForm'
export default {
  name: 'TAntdModuleForm',
  components: {
    'a-page-header': PageHeader,
    'a-button': Button,
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    AntdModuleDetail,
    AntdModuleForm
  },
  props: {
    handleType: {
      type: String,
      default: 'edit' // edit表form表单操作，desc表详情页面
    },
    // 是否显示返回箭头
    isShowBack: {
      type: Boolean,
      default: false
    },
    // 返回上一层触发方法
    isGoBackEvent: {
      type: Boolean,
      default: false
    },
    // 操作按钮文字
    btnTxt: {
      type: String,
      default: '保存'
    },
    // tabs是否跟模块分离
    isTabMargin: {
      type: Boolean,
      default: false
    },
    // tabs跟模块分离距离（默认10px）
    tabMarginNum: {
      type: Number,
      default: 10
    },
    // 是否显示底部操作按钮 :footerBtn="null"
    footerBtn: Object,
    title: String,
    subTitle: String,
    tabs: Array,
    getContainer: Function,
    submit: Function
  },
  data() {
    return {
      activeName: this.tabs && this.tabs[0].key,
      loading: false
    }
  },
  methods: {
    // 获取默认选中tab
    setSelectedTab(key) {
      this.activeName = key
    },
    async saveHandle() {
      const self = this
      let form = {}
      let formError = {}
      let formOpts = {}
      let successLength = 0
      this.loading = true
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      await Object.keys(formOpts).forEach(async (formIndex) => {
        const { valid, formData } = await self.$refs.tAntdForm.$refs[formIndex][0].validate()
        // console.log('formData--', formData)
        if (valid) {
          successLength = successLength + 1
          // form[formIndex] = self.$attrs.formOpts[formIndex].opts.formData
          form[formIndex] = formData
        }
      })
      if (successLength === Object.keys(formOpts).length) { // 所有表单都校验成功
        await this.submit(form)
        this.loading = false
        return true
      } else {
        // 校验失败抛出事件
        Object.keys(formOpts).forEach((key) => {
          if (Object.keys(form).length > 0) {
            Object.keys(form).map((val) => {
              if (key !== val) {
                formError[key] = formOpts[key]
              }
            })
          } else {
            formError[key] = formOpts[key]
          }
        })
        this.$emit('validateError', formError)
        this.loading = false
        return false
      }
    },
    back() {
      if (this.isShowBack) {
        return
      }
      this.$emit('back')
      if (!this.isGoBackEvent) {
        this.$router.go(-1)
      }
    },
    show(formType) {
      this.$nextTick(() => {
        this.updateFormFields()
        this.formType = formType
      })
    },
    // 清空表单
    resetFormFields() {
      const self = this
      let formOpts = {}
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      Object.keys(formOpts).forEach(formIndex => {
        self.$refs.tAntdForm.$refs[formIndex][0].resetFields()
      })
    },
    // 清空校验规则
    clearValidate() {
      const self = this
      let formOpts = {}
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      Object.keys(formOpts).forEach(formIndex => {
        self.$refs.tAntdForm.$refs[formIndex][0].clearValidate()
      })
    },
    updateFormFields() {
      const self = this
      let formOpts = {}
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      Object.keys(formOpts).forEach(formIndex => {
        self.$refs.tAntdForm.$refs[formIndex][0].updateFields(false)
      })
    },
    isShow(name) {
      return Object.keys(this.$slots).includes(name)
    }
  }
}
</script>
<style lang="scss">
.t_antd_module_form {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  text-align: left;
  background-color: #f0f2f5;
  overflow: auto;
  .scroll_wrap {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    .t_antd-form {
      .ant-collapse-borderless {
        background-color: #f6f6f6;
        .noTitle {
          .ant-collapse-header {
            display: none;
          }
        }
        .ant-collapse-item {
          background-color: #fff;
          margin-top: 10px;
          border: none;
          .ant-collapse-header {
            border-bottom: 1px solid #ebeef5;
          }
          .ant-collapse-content-box {
            padding: 16px;
          }
        }
      }
    }
    // 是否显示返回箭头
    .isShowBack {
      .ant-page-header-back {
        display: none;
      }
    }
    .tabs {
      padding: 0;
      margin: 0;
      .ant-tabs {
        background-color: #fff;
        .ant-tabs-bar {
          margin: 0;
          padding: 0 10px;
        }
        .ant-tabs-content {
          padding: 10px;
          .ant-tabs-tabpane {
            margin-top: 10px;
          }
        }
      }
    }
  }
  .handle_wrap {
    z-index: 4;
    right: 0;
    bottom: 0px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #fff;
    border-top: 1px solid #ebeef5;
    text-align: right;
    width: 100%;
    .ant-btn + .ant-btn {
      margin-left: 12px;
    }
    .ant-btn:last-child {
      margin-right: 15px;
    }
  }
}
</style>
