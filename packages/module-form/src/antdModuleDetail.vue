<template>
  <div class="t_antd_module_detail">
    <a-collapse :bordered="false" :defaultActiveKey="defaultActiveKey">
      <a-collapse-panel
        v-for="(val, index) in descData"
        :class="{ noTitle: !val.title,disabledStyle:val.disabled }"
        :key="index"
      >
        <template #header>
          {{val.title}}
          <div class="t_btn" v-if="val.btn">
            <slot :name="val.btn"></slot>
          </div>
        </template>
        <template v-if="val.slotName">
          <slot :name="val.slotName"></slot>
        </template>
        <t-antd-detail v-else :descData="val.data" v-bind="$attrs">
          <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name" />
          </template>
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </t-antd-detail>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import { Collapse } from 'ant-design-vue'
export default {
  name: 'AntdModuleDetail',
  components: {
    'a-collapse': Collapse,
    'a-collapse-panel': Collapse.Panel
  },
  props: {
    descData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    defaultActiveKey() {
      return Object.keys(this.descData)
    }
  }
}
</script>
<style lang="scss">
.t_antd_module_detail {
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
