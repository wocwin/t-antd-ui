<template>
  <a-dropdown :trigger="['click']" placement="bottomRight">
    <a-button icon="setting">列设置</a-button>
    <template #overlay>
      <draggable class="t_layout_table_column_setting_dropdown" v-model="columnSet">
        <a-checkbox
          v-for="(col, index) in columnSet"
          :key="col.dataIndex"
          @click.native.stop
          :checked="!col.hidden"
          @change="e => checkChanged(e.target.checked, index)"
        >{{ col.title }}</a-checkbox>
      </draggable>
    </template>
  </a-dropdown>
</template>
<script>
import { Dropdown, Button, Checkbox } from 'ant-design-vue'
import draggable from 'vuedraggable'

export default {
  name: 'TAntdLayoutTableColumnSetting',
  components: {
    [Dropdown.name]: Dropdown,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    draggable
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    columnSet: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  },
  methods: {
    checkChanged(checked, index) {
      this.columnSet[index].hidden = !checked
    }
  }
}
</script>
<style lang="scss">
.t_layout_table_column_setting_dropdown {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  padding: 8px 0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 #ccc;
  .ant-checkbox-wrapper {
    margin-left: 8px;
    padding: 4px 0;
  }
}
</style>
