<template>
  <div class="t_antd_detail">
    <a-collapse :bordered="false" :defaultActiveKey="defaultActiveKey">
      <a-collapse-panel
        v-for="(val, index) in descData"
        :class="{noTitle:!val.title}"
        :key="index"
        :header="val.title"
      >
        <template v-if="val.slotName">
          <slot :name="val.slotName"></slot>
        </template>
        <a-descriptions v-else size="middle" :column="descColumn">
          <a-descriptions-item
            v-for="(item, key) in val.data"
            :key="key"
            :label="item.label"
            :span="item.span || 1"
          >
            <template v-if="item.slotName">
              <slot :name="item.slotName"></slot>
            </template>
            <span v-else>{{ item.value }}</span>
          </a-descriptions-item>
        </a-descriptions>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import { Collapse, Descriptions } from 'ant-design-vue'
export default {
  name: 'TAntdDetail',
  components: {
    'a-collapse': Collapse,
    'a-collapse-panel': Collapse.Panel,
    'a-descriptions': Descriptions,
    'a-descriptions-item': Descriptions.Item
  },
  props: {
    descColumn: {
      type: Number,
      default: 4
    },
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
.t_antd_detail {
  padding: 0 !important;
  .ant-collapse-borderless {
    padding: 12px 8px 0;
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
      &:first-child {
        margin-top: 0;
      }
      .ant-collapse-header {
        border-bottom: 1px solid #d9d9d9;
      }
      .ant-collapse-content-box {
        padding: 16px;
      }
    }
  }
}
</style>
