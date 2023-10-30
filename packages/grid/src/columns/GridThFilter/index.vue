<template>
  <div class="t_grid_th_filter" :class="{ visible: visible || effect }" @click.stop>
    <a-popover
      v-model="visible"
      :placement="col.type === 'number' ? 'bottomLeft' : 'bottomRight'"
      trigger="click"
    >
      <template slot="content">
        <div class="t_grid_th_filter_popover_wrap">
          <div v-if="col.type === 'enum'" class="enum_wrap">
            <a-checkbox
              v-if="optionData.length > 1"
              class="enum_item"
              :indeterminate="indeterminate"
              :checked="checkAll"
              @change="onCheckAllChange"
            >全选</a-checkbox>
            <a-checkbox-group class="check_group" v-model="enumValue">
              <a-checkbox
                class="enum_item"
                v-for="item in optionData"
                :key="item[enumField.key]"
                :value="item[enumField.key]"
              >{{ item[enumField.label] }}</a-checkbox>
            </a-checkbox-group>
          </div>
          <ul v-else class="option_wrap">
            <li
              class="option"
              v-for="(item, index) in optionData"
              :key="item.key"
              :class="{ active: checked === index }"
              @click="optionClick(index)"
            >
              {{ item.label }}
              <a-icon v-if="checked === index" type="check" class="icon" />
            </li>
          </ul>
          <template v-if="optionData[checked].inputType !== null">
            <a-input
              v-if="optionData[checked].inputType === 'string'"
              v-model="value"
              class="input"
              placeholder="搜索关键字"
            />
            <a-input
              v-else-if="optionData[checked].inputType === 'number'"
              v-model="value"
              class="input"
              placeholder="搜索关键字"
              type="number"
            />
            <a-date-picker
              v-else-if="optionData[checked].inputType === 'date'"
              v-model="dateValue"
              class="input"
              :placeholder="col.type === 'dateTime' ? '选择日期时间' : '选择日期'"
              :showTime="col.type === 'dateTime'"
            />
            <t-range-picker
              v-else-if="optionData[checked].inputType === 'dateRange'"
              v-model="dateRangeValue"
              class="input"
              :placeholder="col.type === 'dateTime' ? ['开始日期时间', '结束日期时间'] : ['开始日期', '结束日期']"
              :format="col.type === 'dateTime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
              :showTime="col.type === 'dateTime'"
            />
          </template>
          <div class="btn_wrap">
            <a-button class="btn" size="small" @click="reset">重置</a-button>
            <a-button class="btn" size="small" type="primary" @click="submit">确定</a-button>
          </div>
        </div>
      </template>
      <a-icon type="filter" theme="filled" style="cursor: pointer;" />
    </a-popover>
  </div>
</template>
<script lang="ts">
import { Col } from "../../types"
import { Vue, Component, Prop } from "vue-property-decorator"
import {
  Icon,
  Popover,
  Input,
  DatePicker,
  Button,
  Checkbox
} from "ant-design-vue"
import { ENUM_STRING, ENUM_NUMBER, ENUM_DATE } from "./compare"
@Component({
  components: {
    [Icon.name]: Icon,
    [Popover.name]: Popover,
    [Input.name]: Input,
    [Button.name]: Button,
    [DatePicker.name]: DatePicker,
    [Checkbox.name]: Checkbox,
    [Checkbox.Group.name]: Checkbox.Group
  }
})
export default class GridThFilter extends Vue {
  @Prop({
    type: Object,
    default: () => ({})
  })
  col!: Col

  visible = false
  checked = 0
  value = ""
  dateValue = null
  dateRangeValue = [null, null]
  enumValue: any[] = []
  effect = false

  get editCompAttr() {
    const { editConfig } = this.col
    if (!editConfig || !editConfig.attr) return {}
    if (typeof editConfig.attr === "function") {
      return editConfig.attr({}, this.col.dataIndex, -1) || {}
    } else {
      return editConfig.attr
    }
  }
  get optionData() {
    switch (this.col.type) {
      case "string":
        return ENUM_STRING
      case "number":
        return ENUM_NUMBER
      case "date":
      case "dateTime":
        return ENUM_DATE
      case "enum":
        return this.editCompAttr?.options || this.col.enumData || []
      default:
        return ENUM_STRING
    }
  }
  // 自定义枚举字段
  get enumField() {
    return (
      this.col.enumField || {
        key: "key",
        label: "label"
      }
    )
  }
  // 全选key值
  get allOptionKey(): any[] {
    return this.optionData.map((item: any) => item[this.enumField.key])
  }
  // 是否全选
  get checkAll() {
    return this.enumValue.length === this.optionData.length
  }
  get indeterminate() {
    return (
      this.enumValue.length > 0 &&
      this.enumValue.length < this.optionData.length
    )
  }
  get result() {
    const option = this.optionData[this.checked]
    switch (option.inputType) {
      case "string":
      case "number":
        return {
          validate: this.value !== "",
          value: this.value
        }
      case "date":
        return {
          validate: this.dateValue !== null,
          value: this.dateValue
        }
      case "dateRange":
        return {
          validate:
            this.dateRangeValue[0] !== null && this.dateRangeValue[1] !== null,
          value: this.dateRangeValue
        }
      default:
        if (this.col.type === "enum") {
          return {
            validate: this.enumValue.length > 0,
            value: [...this.enumValue]
          }
        }
        return {
          validate: true,
          value: null
        }
    }
  }

  optionClick(index: number) {
    this.checked = index
  }
  onCheckAllChange(e: Event) {
    this.enumValue = (e.target as any).checked ? [...this.allOptionKey] : []
  }
  reset() {
    this.checked = 0
    this.value = ""
    this.dateValue = null
    this.dateRangeValue = [null, null]
    this.enumValue = []
    this.effect = false
    this.visible = false
    this.$emit("filterChange", {
      dataIndex: this.col.dataIndex,
      compare: "clear",
      value: null
    })
  }
  submit() {
    this.visible = false
    const option = this.optionData[this.checked]
    this.effect = this.result.validate
    this.$emit("filterChange", {
      dataIndex: this.col.dataIndex,
      compare: this.col.type === "enum" ? null : option.key,
      value: this.result.value
    })
  }
}
</script>
<style lang="scss" scoped>
.t_grid_th_filter {
  padding: 0 4px;
  font-size: 14px;
  color: #999;
  visibility: hidden;
  &.visible {
    color: #3860b2;
    visibility: unset;
  }
}
.t_grid_th_filter_popover_wrap::v-deep {
  .option_wrap {
    margin: 0 -16px;
    min-width: 200px;
    .option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 12px;
      list-style: none;
      cursor: pointer;
      font-size: 14px;
      line-height: 22px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      user-select: none;
      &:hover {
        background-color: #e6edf5;
      }
      &.active {
        background-color: #e6edf5;
        font-weight: 600;
        color: #577dc2;
      }
      .icon {
        color: #577dc2;
      }
    }
  }
  .enum_wrap {
    display: flex;
    flex-direction: column;
    .check_group {
      display: flex;
      flex-direction: column;
    }
    .enum_item {
      margin: 0 0 4px;
    }
  }
  .input {
    margin: 8px -4px 0;
    min-width: 176px;
  }
  .btn_wrap {
    display: flex;
    margin: 8px -4px 0;
    justify-content: flex-end;
    .btn {
      margin-left: 8px;
    }
  }
}
</style>