<template>
  <FormModel
    :label-width="labelWidth"
    :form="form"
    layout="horizontal"
    class="t_layout_conditional"
    :style="{'grid-template-areas': gridAreas, 'grid-template-columns': `repeat(${colLength}, minmax(220px, ${100 / colLength}%))`}"
  >
    <FormModelItem
      v-for="(opt, i) in cOpts"
      :key="i"
      :style="{ gridArea: i }"
      :label="typeof opt.label === 'string' && opt.label"
      :prop="opt.dataIndex"
      :ref="opt.dataIndex"
      :label-align="opt.labelAlign||'left'"
      :class="[opt.className,{'render_label':typeof opt.label === 'function'||typeof opt.label === 'object'}]"
    >
      <!-- 自定义label -->
      <template>
        <component
          v-if="typeof opt.label === 'object'"
          :style="{color:opt.label.color||'#262626'}"
          :is="opt.label.comp"
        >{{opt.label.label}}</component>
        <template v-else-if="typeof opt.label === 'function'">
          <render-comp :createElementFunc="opt.label" />
        </template>
      </template>
      <!-- 自定义输入框插槽 -->
      <template v-if="opt.slotName">
        <slot :name="opt.slotName" :scope="form"></slot>
      </template>
      <OptComponent
        v-if="!opt.slotName"
        v-bind="opt"
        :opt="opt"
        :form="form"
        :value="form[opt.dataIndex]"
        @change="change"
      />
    </FormModelItem>
    <FormModelItem
      v-if="Object.keys(cOpts).length > 0"
      label-width="0"
      style="grid-area: submit_btn"
      :class="{'flex_end': cellLength % colLength === 0}"
    >
      <a-button type="primary" class="btn_check" @click="checkHandle" :loading="loading">查看</a-button>
      <a-button v-if="reset" class="btn_reset" @click="resetHandle">重置</a-button>
      <a-button v-if="originCellLength > colLength&&isShowOpen" type="link" @click="openOrHide">
        {{ open ? '收起' : '展开'}}
        <a-icon :type="open ? 'up' : 'down'" />
      </a-button>
    </FormModelItem>
  </FormModel>
</template>
<script>
import { Button, FormModel, Icon } from 'ant-design-vue'
import RenderComp from './render-comp'
import OptComponent from './OptComponent'
export default {
  name: 'TAntdConditional',
  components: {
    OptComponent,
    RenderComp,
    FormModel,
    FormModelItem: FormModel.Item,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  props: {
    opts: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    loading: {
      type: Boolean,
      default: false
    },
    reset: {
      type: Boolean,
      default: true
    },
    // 是否显示收起和展开
    isShowOpen: {
      type: Boolean,
      default: true
    },
    // 是否默认展开
    isExpansion: {
      type: Boolean,
      default: false
    },
    configChangedReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      colLength: null,
      form: this.initForm(this.opts),
      open: !!this.isExpansion
    }
  },
  watch: {
    opts: {
      handler(opts) {
        this.form = this.initForm(opts, !this.configChangedReset)
      },
      deep: true
    }
  },
  computed: {
    cOpts() { // 二次封装配置
      const { open, opts, colLength, isShowOpen } = this
      let renderSpan = 0
      return Object.keys(opts).reduce((acc, field) => {
        let opt = { ...opts[field] }
        // 收起操作
        if (isShowOpen) {
          renderSpan += opt.span ?? 1
          if (!open && renderSpan - 1 >= colLength) return acc
        }

        opt.dataIndex = field
        if (!opt.slotName) {
          if (opt.comp.name === 'AInput') {
            opt.event = opt.event || {}
            const originPressEnter = opt.event.pressEnter
            opt.event.pressEnter = e => { // Input 回车进行查询
              originPressEnter && originPressEnter(e)
              this.checkHandle()
            }
          }
          if (opt.comp.name === 'ASelect' && opt.bind && opt.bind.showSearch && opt.event && opt.event.search) { // 对a-select对search做优化，在下拉回调后调用清空搜索项方法。处理场景：用户输入数据对下拉列表模糊搜索后，下次点击无法展开完整列表
            opt.event['dropdownVisibleChange'] = (open) => {
              !open && opt.event.search('')
            }
          }
          if (opt.comp.name === 'ASelect') { // 设置弹窗渲染父节点
            opt.bind = opt.bind || {}
            opt.bind['getPopupContainer'] = opt.bind['getPopupContainer'] || this.getEl
          }
          if (opt.comp.name === 'ADatePicker') { // 设置弹窗渲染父节点
            opt.bind = opt.bind || {}
            opt.bind['getCalendarContainer'] = opt.bind['getCalendarContainer'] || this.getEl
          }
          if (opt.comp === 'TAntdRangePicker' || opt.comp.name === 'ADatePicker') { // 设置弹窗渲染父节点
            opt.bind = opt.bind || {}
            opt.bind['getCalendarContainer'] = opt.bind['getCalendarContainer'] || this.getEl
          }
        }
        acc[field] = opt
        return acc
      }, {})
    },
    gridAreas() { // grid布局按钮位置
      const { colLength, cOpts } = this
      const fields = Object.keys(cOpts)
      let rowIndex = 0
      let rowSpan = 0
      const areas = [[]]
      for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
        const field = fields[fieldIndex]
        const opt = cOpts[field]
        const span = Math.min(opt.span ?? 1, 2) // 最大2
        if (rowSpan + span > colLength) {
          if (rowSpan < colLength) {
            areas[rowIndex].push('.')
          }
          rowSpan = 0
          areas[++rowIndex] = []
        }
        rowSpan += span
        for (let index = 0; index < span; index++) {
          areas[rowIndex].push(field)
        }
      }
      if (areas[rowIndex].length === colLength) {
        areas.push(['submit_btn', 'submit_btn', 'submit_btn', 'submit_btn'])
      } else {
        while (areas[rowIndex].length < colLength) {
          areas[rowIndex].push('submit_btn')
        }
      }
      return areas.reduce((acc, cur) => {
        acc += `'${cur.join(' ')}'\n`
        return acc
      }, '')
    },
    cellLength() { // 占用单元格长度
      const { colLength } = this
      let length = 0
      Object.keys(this.cOpts).forEach(key => {
        let span = this.cOpts[key].span || 1
        if (length % colLength + span > colLength) {
          length += colLength - (length % colLength)
        }
        length += span
      })
      return length
    },
    originCellLength() {
      const { colLength } = this
      let length = 0
      Object.keys(this.opts).forEach(key => {
        let span = this.opts[key].span || 1
        if (length % colLength + span > colLength) {
          length += colLength - (length % colLength)
        }
        length += span
      })
      return length
    }
  },
  mounted() {
    this.colLength = this.getColLength()
    // this.keyEvent()
  },
  methods: {
    getColLength() { // 行列数
      const width = window.innerWidth
      let colLength = 4
      if (width > 768 && width < 1280) {
        colLength = 3
      } else if (width <= 768) {
        colLength = 2
      }
      return colLength
    },
    initForm(opts, keepVal = false) { // keepVal 保持当前用户选择的结果
      return Object.keys(opts).reduce((acc, field) => {
        if (keepVal && this.form) {
          acc[field] = this.form[field] ?? opts[field].defaultVal ?? null
        } else {
          acc[field] = opts[field].defaultVal ?? null
        }
        return acc
      }, {})
    },
    resetHandle() {
      this.form = this.initForm(this.opts)
      this.$emit('reset', this.form)
      this.checkHandle()
    },
    change(v, dataIndex) {
      this.form[dataIndex] = v
      this.$emit('change', { ...this.form }, dataIndex)
    },
    checkHandle() {
      this.$emit('submit', Object.keys(this.form).reduce((acc, field) => {
        if (typeof this.form[field] === 'string') { // 去除前后空格
          this.form[field] = this.form[field].trim()
        }
        acc[field] = this.form[field]
        return acc
      }, {}))
    },
    getEl() {
      return this.$el
    },
    openOrHide() {
      this.open = !this.open
    }
  }
}
</script>
<style lang="scss">
.t_layout_conditional.ant-form {
  position: relative;
  display: grid;
  gap: 2px 8px;
  margin-bottom: -7px;
  text-align: left;
  .ant-calendar-picker {
    width: 100% !important;
  }
  .flex_end {
    grid-area: submit_btn;
    .ant-form-item-control {
      text-align: right !important;
    }
  }
  .ant-form-item {
    display: flex;
    margin-bottom: 6px;
    .ant-form-item-label {
      flex-shrink: 0;
      min-width: 60px;
      padding-left: 8px;
    }
    .ant-form-item-control-wrapper {
      flex-grow: 1;
      overflow: hidden;
      .ant-form-item-control {
        text-align: left;
      }
    }
  }
  .render_label {
    .ant-form-item-children {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .ant-input-affix-wrapper {
        width: calc(100% - 80px);
      }
    }
  }
  .btn_check {
    position: relative;
    top: -1px;
  }
  .btn_reset {
    position: relative;
    top: -1px;
    margin-left: 8px;
  }
}
</style>
