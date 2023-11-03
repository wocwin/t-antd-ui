<template>
  <div class="t_antd-form">
    <a-collapse :bordered="false" :defaultActiveKey="defaultActiveKey">
      <a-collapse-panel
        v-for="(formOpt, formIndex) in formOpts"
        :class="[formOpt.className,{ noTitle: !formOpt.title,disabledStyle:formOpt.disabled }]"
        :key="formIndex"
      >
        <template #header>
          {{formOpt.title}}
          <div class="t_btn" v-if="formOpt.btn">
            <slot :name="formOpt.btn"></slot>
          </div>
        </template>
        <template v-if="formOpt.slotName">
          <slot :name="formOpt.slotName"></slot>
        </template>
        <t-antd-form
          v-else
          :ref="formIndex"
          :formOpts="formOpt.opts"
          :ref-obj.sync="formOpt.ref"
          v-bind="formOpt.opts.layout === 'vertical'?{...$attrs}:{ labelCol: { span: 4 },wrapperCol: { span: 20 },...$attrs}"
          v-on="$listeners"
          @handleEvent="(val,type)=>$emit('handleEvent',val,type)"
        >
          <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name" />
          </template>
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </t-antd-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import { Collapse } from 'ant-design-vue'
export default {
  name: 'AntdModuleForm',
  components: {
    'a-collapse': Collapse,
    'a-collapse-panel': Collapse.Panel
  },
  props: {
    formOpts: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    defaultActiveKey() {
      return Object.keys(this.formOpts)
    }
  }
}
</script>
<style lang="scss">
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
        font-weight: bold;
        color: #303133;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .t_btn {
          margin-right: 15px;
        }
      }
      .ant-collapse-content-box {
        padding: 16px;
        .ant-form-inline {
          .ant-form-item {
            margin: 0;
          }
        }
      }
    }
    // 禁用时取消收缩功能及隐藏icon
    .disabledStyle {
      .ant-collapse-header {
        color: #303133;
        cursor: default;
        padding-left: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
        pointer-events: none;
        .ant-collapse-arrow {
          display: none;
        }
        .t_btn {
          margin-right: 15px;
          pointer-events: none;
          .ant-btn {
            pointer-events: auto;
          }
        }
      }
    }
  }
}
</style>
