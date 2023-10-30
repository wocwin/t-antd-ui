<template>
  <a-page-header class="t_layout_detail" :title="title" :sub-title="subTitle" @back="back">
    <slot slot="extra" name="extra"></slot>
    <slot slot="default" name="default"></slot>
    <a-collapse
      :bordered="false"
      :defaultActiveKey="defaultActiveKey"
      v-if="Object.keys(this.descData).length > 1"
    >
      <a-collapse-panel :header="val.title" v-for="(val, index) in descData" :key="index">
        <a-descriptions size="middle" :column="descColumn">
          <a-descriptions-item
            v-for="(item, key) in val.data"
            :key="key"
            :label="item.label"
            :span="item.span || 1"
          >
            <template v-if="item.slotName">
              <slot :name="item.slotName" :param="item"></slot>
            </template>
            <span v-else>{{ item.value }}</span>
          </a-descriptions-item>
        </a-descriptions>
      </a-collapse-panel>
    </a-collapse>
    <div class="desc_single" v-else>
      <a-descriptions
        size="middle"
        v-for="(val, index) in descData"
        :key="index"
        :column="descColumn"
      >
        <a-descriptions-item
          v-for="(item, key) in val.data"
          :key="key"
          :label="item.label"
          :span="item.span || 1"
        >
          <template v-if="item.slotName">
            <slot :name="item.slotName" :param="item"></slot>
          </template>
          <span v-else>{{ item.value }}</span>
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <slot slot="footer" name="footer"></slot>
    <template v-if="tabs && !$slots.footer" slot="footer">
      <a-tabs v-if="tabs.length > 1" :default-active-key="tabs[0].key" :animated="false">
        <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title">
          <slot :name="tab.key"></slot>
        </a-tab-pane>
      </a-tabs>
      <slot v-else :name="tabs[0].key"></slot>
    </template>
  </a-page-header>
</template>
<script>
import { PageHeader, Collapse, Descriptions, Tabs } from 'ant-design-vue'
export default {
  name: 'TAntdDetail',
  components: {
    'a-collapse': Collapse,
    'a-collapse-panel': Collapse.Panel,
    'a-page-header': PageHeader,
    'a-descriptions': Descriptions,
    'a-descriptions-item': Descriptions.Item,
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane
  },
  props: {
    title: String,
    subTitle: String,
    descColumn: {
      type: Number,
      default: 4
    },
    descData: {
      type: Object,
      default: () => ({})
    },
    tabs: Array
  },
  computed: {
    defaultActiveKey() {
      return Object.keys(this.descData)
    }
  },
  mounted() {
    console.log(7788, Object.keys(this.descData).length > 1)
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.t_layout_detail {
  padding: 0 !important;
  .ant-page-header-heading {
    padding: 16px 16px 0;
    background-color: #fff !important;
  }
  .ant-page-header-content {
    // padding: 12px 16px 0;
    background-color: #fff;
    .ant-collapse-borderless {
      padding: 12px 16px 0;
      background-color: #f6f6f6;
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
    .desc_single {
      padding: 12px 16px 0;
      background-color: #fff;
    }
  }
  .ant-descriptions-view {
    padding: 16px;
  }
  .ant-page-header-footer {
    margin: 0;
    .ant-tabs-bar {
      padding: 0 16px;
      background-color: #fff;
    }
  }
}
</style>
