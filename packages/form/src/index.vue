<template>
  <FormModel
    ref="form"
    class="t_antd_form"
    :class="className"
    :model="formOpts.formData"
    :rules="formOpts.rules"
    :layout="formOpts.layout||'horizontal'"
    v-bind="formAttr"
    v-on="$listeners"
  >
    <template v-for="(item, index) in fieldList">
      <FormModelItem
        v-if="!item.isHideItem"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :class="[item.className,{'whole_line_style_vertical':item.widthSize===1&&formOpts.layout==='vertical'},{'whole_line_style':item.widthSize===1}]"
        :rules="item.rules"
        :style="getChildWidth(item)"
        v-bind="{...item.formItemBind}"
      >
        <!-- 自定义label -->
        <template #label v-if="item.labelRender">
          <render-comp :createElementFunc="item.labelRender" />
        </template>
        <!-- 自定义输入框插槽 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName"></slot>
        </template>
        <!-- 文本展示值 -->
        <template v-if="item.textShow">
          <span>{{item.textValue||formOpts.formData[item.value]}}</span>
        </template>
        <template v-if="item.isSelfCom">
          <component
            :is="item.comp"
            v-model="formOpts.formData[item.value]"
            :placeholder="item.placeholder||getPlaceholder(item)"
            v-bind="{allowClear:true,showSearch:true,...item.bind}"
            :style="{width: item.width||'100%'}"
            v-on="cEvent(item)"
          />
        </template>
        <component
          v-if="!item.slotName&&!item.textShow&&!item.isSelfCom"
          :is="item.comp"
          v-model="formOpts.formData[item.value]"
          :type="item.type||item.bind.type"
          :mode="item.comp.includes('picker')?(item.type||item.bind.type):''"
          :placeholder="item.placeholder||getPlaceholder(item)"
          @change="handleEvent(item.event, formOpts.formData[item.value],item)"
          v-bind="{allowClear:true,showSearch:true,...item.bind}"
          :style="{width: item.width||'100%'}"
          v-on="cEvent(item)"
        >
          <template #addonBefore v-if="item.addonBefore">{{ item.addonBefore }}</template>
          <template #addonAfter v-if="item.addonAfter">{{ item.addonAfter }}</template>
          <template v-if="item.childSlotName">
            <slot :name="item.childSlotName"></slot>
          </template>
          <component
            v-else
            :is="compChildName(item)"
            v-for="(value, key, index) in selectListType(item)"
            :key="index"
            :disabled="value.disabled"
            :label="compChildLabel(item,value)"
            :value="compChildValue(item,value,key)"
          >{{compChildShowLabel(item,value)}}</component>
        </component>
      </FormModelItem>
    </template>
    <!-- 按钮 -->
    <div class="footer_btn">
      <template v-if="formOpts.btnSlotName">
        <slot :name="formOpts.btnSlotName"></slot>
      </template>
      <template v-if="!formOpts.btnSlotName&&formOpts.operatorList&&formOpts.operatorList.length>0">
        <Button
          v-for="(val,index) in formOpts.operatorList"
          :key="index"
          @click="val.fun(val)"
          :type="val.type||'primary'"
          :icon="val.icon"
          :size="val.size || 'default'"
          :disabled="val.disabled"
        >{{ val.label }}</Button>
      </template>
    </div>
  </FormModel>
</template>
<script>
import RenderComp from './render-comp.vue'
import { FormModel, Button } from 'ant-design-vue'
export default {
  name: 'TAntdForm',
  components: {
    RenderComp,
    FormModel,
    FormModelItem: FormModel.Item,
    Button
  },
  props: {
    /** 表单配置项说明
     * formData object 表单提交数据
     * rules object 验证规则
     * fieldList Array 表单渲染数据
     * operatorList Array 操作按钮list
     * listTypeInfo object 下拉选项数据
     */
    formOpts: {
      type: Object,
      default: () => ({})
    },
    // 自定义类名
    className: {
      type: String
    },
    // 一行显示几个输入项;最大值4
    widthSize: {
      type: Number,
      default: 2,
      validator: (value) => {
        return value <= 4
      }
    },
    // 全局是否开启清除前后空格
    isTrim: {
      type: Boolean,
      default: true
    },
    // ref
    refObj: {
      type: Object
    }
  },
  data() {
    return {
      colSize: this.widthSize,
      fieldList: this.formOpts.fieldList,
      labelCol: { span: 2 },
      wrapperCol: { span: 22 }
    }
  },
  computed: {
    formAttr() {
      let attr = {}
      this.formOpts.layout === 'vertical'
        ? attr = {
          ...this.$attrs
        } : attr = {
          labelCol: this.labelCol,
          wrapperCol: this.wrapperCol,
          ...this.$attrs
        }
      return attr
    },
    cEvent() {
      return ({ eventHandle }, type) => {
        let event = { ...eventHandle }
        let changeEvent = {}
        Object.keys(event).forEach(v => {
          changeEvent[v] = (e, ids) => {
            if (type === 't-antd-select-table') {
              event[v] && event[v](e, ids, arguments)
            } else {
              if ((typeof e === 'number' && e === 0) || e) {
                event[v] && event[v](e, this.formOpts, arguments)
              } else {
                event[v] && event[v](this.formOpts, arguments)
              }
            }
          }
        })
        return { ...changeEvent }
      }
    },
    selectListType() {
      return ({ list }) => {
        if (this.formOpts.listTypeInfo) {
          return this.formOpts.listTypeInfo[list]
        } else {
          return []
        }
      }
    },
    // 子组件名称
    compChildName() {
      return ({ type }) => {
        switch (type) {
          case 'checkbox':
            return 'a-checkbox'
          case 'radio':
            return 'a-radio'
          case 'select-arr':
          case 'select-obj':
            return 'a-select-option'
        }
      }
    },
    // 子子组件label
    compChildLabel() {
      return ({ type, arrLabel }, value) => {
        switch (type) {
          case 'radio':
          case 'checkbox':
            return value.value
          case 'select-arr':
            return value[arrLabel || 'label']
          case 'select-obj':
            return value
        }
      }
    },
    // 子子组件value
    compChildValue() {
      return ({ type, arrKey }, value, key) => {
        switch (type) {
          case 'radio':
          case 'checkbox':
            return value.value
          case 'select-arr':
            return value[arrKey || 'value']
          case 'select-obj':
            return key
        }
      }
    },
    // 子子组件文字展示
    compChildShowLabel() {
      return ({ type, arrLabel }, value) => {
        switch (type) {
          case 'radio':
          case 'checkbox':
            return value.label
          case 'select-arr':
            return value[arrLabel || 'label']
          case 'select-obj':
            return value
        }
      }
    }
  },
  watch: {
    'formOpts.formData': {
      handler(val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    },
    widthSize(val) {
      if (val > 4) {
        this.$message.warning('widthSize值不能大于4！')
        this.colSize = 4
      } else {
        this.colSize = val
      }
    }
  },
  mounted() {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
  },

  methods: {
    // label与输入框的布局方式
    getChildWidth(item) {
      if (this.formOpts.layout === 'vertical') {
        return `flex: 0 1 calc((${100 / (item.widthSize || this.colSize)}% - 10px));margin-right:10px;`
      } else {
        return `flex: 0 1 ${100 / (item.widthSize || this.colSize)}%;`
      }
    },
    // 得到placeholder的显示
    getPlaceholder(row) {
      let placeholder
      if (typeof row.comp === 'string' && row.comp) {
        if (row.comp.includes('input')) {
          placeholder = row.label ? `请输入${row.label}` : `请输入`
        } else if (row.comp.includes('select') || row.comp.includes('cascader')) {
          placeholder = row.label ? `请选择${row.label}` : `请选择`
        } else if (row.comp.includes('range')) {
          placeholder = ['开始时间', '结束时间']
        } else if (!row.comp.includes('t-antd-date-picker')) {
          placeholder = row.label
        }
      } else {
        placeholder = row.label
      }
      return placeholder
    },
    // 绑定的相关事件
    handleEvent(type, val, item) {
      // console.log('组件', type, val, item)
      // 去除前后空格
      if (this.isTrim && !item.isTrim && item.comp.includes('input') && item.type !== 'password' && item.type !== 'inputNumber') {
        this.formOpts.formData[item.value] = this.formOpts.formData[item.value].trim()
      }
      this.$emit('handleEvent', type, val)
    },
    validate() {
      // selfValidate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve({
              valid,
              formData: this.formOpts.formData
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              valid,
              formData: null
            })
          }
        })
      })
    },
    // 重置表单
    resetFields() {
      return this.$refs.form.resetFields()
    },
    // 清空校验
    clearValidate() {
      return this.$refs.form.clearValidate()
    }
  }
}
</script>
<style lang="scss">
.t_antd_form {
  display: flex;
  flex-wrap: wrap;
  .ant-select,
  .ant-calendar-picker {
    width: 100%;
  }
  .whole_line_style {
    display: flex;
    .ant-form-item-label {
      width: 85px;
      text-align: right;
    }
    .ant-form-item-control-wrapper {
      width: calc(100% - 85px);
    }
  }
  .whole_line_style_vertical {
    display: flex;
    flex-direction: column;
    .ant-form-item-label {
      text-align: left;
      width: 100%;
    }
    .ant-form-item-control-wrapper {
      width: 100%;
    }
  }
  .footer_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    width: 100%;
    .ant-btn {
      margin-left: 10px;
    }
    .ant-btn:first-child {
      margin-left: 0;
    }
  }
}
</style>
