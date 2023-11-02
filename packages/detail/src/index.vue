<template>
  <div class="t_antd_detail">
    <a-descriptions size="middle" :column="descColumn" v-bind="$attrs">
      <a-descriptions-item
        v-for="(item, key) in descData"
        :key="key"
        :label="item.label"
        :span="item.span || 1"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :scope="item"></slot>
        </template>
        <div v-else>
          <a-tooltip v-bind="$attrs" v-if="item.tooltip">
            <span>
              <span
                v-if="item.filters&&item.filters.list"
              >{{dataList[item.fieldName] |constantEscape(listTypeInfo[item.filters.list],(item.filters.key||'value'),(item.filters.label||'label'))}}</span>
              <span v-else>{{ item.value }}</span>
              <a-icon
                :type="item.iconClass||'exclamation-circle'"
                :style="item.style||'cursor: pointer;'"
              />
            </span>
            <template #title v-if="item.tooltip">
              <span v-if="typeof item.tooltip === 'string'">{{item.tooltip}}</span>
              <template v-else-if="typeof item.tooltip === 'function'">
                <render-tooltip :createElementFunc="item.tooltip" />
              </template>
            </template>
          </a-tooltip>
          <span v-else>
            <span
              v-if="item.filters&&item.filters.list"
            >{{dataList[item.fieldName] |constantEscape(listTypeInfo[item.filters.list],(item.filters.key||'value'),(item.filters.label||'label'))}}</span>
            <span v-else>{{ item.value }}</span>
          </span>
        </div>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script>
import { Descriptions, Tooltip, Icon } from 'ant-design-vue'
import RenderTooltip from './renderTooltip.vue'
import { constantEscape } from '../../utils'
export default {
  name: 'TAntdDetail',
  components: {
    RenderTooltip,
    'a-icon': Icon,
    'a-tooltip': Tooltip,
    'a-descriptions': Descriptions,
    'a-descriptions-item': Descriptions.Item
  },
  // 过滤器
  filters: {
    constantEscape
  },
  props: {
    descColumn: {
      type: Number,
      default: 4
    },
    descData: {
      type: Array,
      default: () => ([])
    },
    // 后台数据源
    dataList: {
      type: Object,
      default: () => ({})
    },
    // 需要解析的下拉数据
    listTypeInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss">
.t_antd_detail {
  .ant-descriptions {
    tr:nth-child(2n) {
      background-color: #fff;
    }
    .ant-descriptions-item-label {
      font-weight: bold;
    }
  }
}
</style>
