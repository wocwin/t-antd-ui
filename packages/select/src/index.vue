<template>
  <div @mousedown="e => {
    e.preventDefault()
    selectOpen = true
  }" ref="main">
    <a-select
      class="t_select"
      v-model="childSelectedValue"
      :style="{width: width||'100%'}"
      :placeholder="placeholder"
      :open="selectOpen"
      @select="handleSelect"
      v-bind="attrs"
      v-on="$listeners"
      :mode="mode"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
      <div slot="dropdownRender" slot-scope="menu">
        <a-checkbox
          v-if="mode&&!isShowPagination"
          :checked="selectChecked"
          @change="selectAll"
          class="all_checkbox"
        >全选</a-checkbox>
        <v-nodes :vnodes="menu" />
        <div class="t_select__pagination" v-if="isShowPagination">
          <a-pagination
            :page-size.sync="paginationOption.pageSize"
            v-model="paginationOption.current"
            :total="paginationOption.total"
            @change="currentChange"
            v-bind="{
            size:'small',
            'hide-on-single-page':true,
            'showQuickJumper': true,
            ...$attrs,
            ...paginationOption.bind,
          }"
            v-on="$listeners"
          />
        </div>
      </div>
      <a-select-option
        v-for="(item,index) in optionSource"
        :key="index"
        :value="item[valueKey]"
      >{{customLabel?customLabelHandler(item):item[labelKey]}}</a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: 'TAntdSelect',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  props: {
    value: {
      type: [String, Number, Array, Boolean, Object]
    },
    // 多选 'multiple'
    mode: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 选择框宽度
    width: {
      type: String
    },
    // 是否自定义设置下拉label
    customLabel: {
      type: String
    },
    // 传入的option数组中，要作为最终选择项的键值key
    valueKey: {
      type: String,
      default: 'key'
    },
    // 传入的option数组中，要作为显示项的键值名称
    labelKey: {
      type: String,
      default: 'label'
    },
    // 下拉框组件数据源
    optionSource: {
      type: Array
    },
    // 是否显示分页
    isShowPagination: {
      type: Boolean,
      default: false
    },
    // 分页配置项
    paginationOption: {
      type: Object,
      default: () => {
        return {
          pageSize: 6, // 每页显示条数
          current: 1, // 当前页
          total: 0 // 总条数
        }
      }
    }
  },
  data() {
    return {
      selectOpen: false
    }
  },
  computed: {
    childSelectedValue: {
      get() {
        return this.value || undefined
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    attrs() {
      return {
        allowClear: true,
        showSearch: true,
        ...this.$attrs
      }
    },
    selectChecked: {
      get() {
        return this.childSelectedValue?.length === this.optionSource?.length
      },
      set(val) {
        // console.log('set', val)
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.bodyCloseMenus)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.bodyCloseMenus)
  },
  methods: {
    // 点击空白区域
    bodyCloseMenus(e) {
      if (this.$refs.main && !this.$refs.main.contains(e.target)) {
        if (this.selectOpen == true) {
          this.selectOpen = false
        }
      }
    },
    // 点击全选
    selectAll(val) {
      const options = JSON.parse(JSON.stringify(this.optionSource))
      if (val.target.checked) {
        this.childSelectedValue = options?.map(item => {
          return item[this.valueKey]
        })
        setTimeout(() => {
          this.$emit('change', this.childSelectedValue)
        }, 0)
      } else {
        this.childSelectedValue = null
      }
      this.selectOpen = false
    },
    handleSelect(value, option) {
      if (value) {
        this.selectOpen = false
      }
      this.$emit('select', value, option)
    },
    // 切换分页
    currentChange(val) {
      // console.log('切换分页', val)
      if (!this.mode) {
        this.childSelectedValue = null
      }
      setTimeout(() => {
        this.selectOpen = true
      }, 0)
      this.$emit('current-change', val)
    },
    // 自定义label显示
    customLabelHandler(item) {
      // eslint-disable-next-line no-eval
      return eval(this.customLabel)
    }
  }
}
</script>
<style lang="scss">
.all_checkbox {
  margin-left: 12px;
  margin-top: 5px;
}
// .el-pagination {
//   display: flex;
//   background-color: #fff;
//   align-items: center;
//   .el-pagination__total,
//   .el-pager,
//   button {
//     display: flex;
//     align-items: center;
//   }
// }
</style>
