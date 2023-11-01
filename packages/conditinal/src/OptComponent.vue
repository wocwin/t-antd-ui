<template>
  <component
    :is="comp"
    v-bind="typeof bind == 'function' ? bind(form) : {allowClear:true,showSearch:true,...bind}"
    :placeholder="placeholder||getPlaceholder(opt)"
    v-on="cEvent"
    :value="value || undefined"
  >
    <component
      v-for="(cOpt, i) in child"
      :is="cOpt.comp"
      :key="i"
      v-bind="{...cOpt, dataIndex: dataIndex}"
      :value="cOpt.value"
    >{{cOpt.text}}</component>
  </component>
</template>
<script>
export default {
  name: 'OptComponent',
  props: {
    dataIndex: {
      type: String,
      default: ''
    },
    form: {
      type: Object,
      default: () => ({})
    },
    opt: {
      type: Object,
      default: () => ({})
    },
    bind: {
      type: [Object, Function]
    },
    event: {
      type: Object,
      default: () => ({})
    },
    comp: {
      type: [String, Object, Function]
    },
    child: {
      type: Array,
      default: () => ([])
    },
    placeholder: {
      type: [String, Array]
    },
    value: {
      type: [String, Number, Array, Object, Date, Boolean],
      default: ''
    },
    changeEvent: {
      type: String,
      default: 'input'
    }
  },
  computed: {
    cEvent() {
      let event = { ...this.event }
      let changeEvent = {}
      if (this.changeEvent) {
        changeEvent[this.changeEvent] = (v) => {
          let value = v !== undefined && v !== null ? (v.target ? v.target.value : v) : null
          event[this.changeEvent] && event[this.changeEvent](value, arguments)
          this.$emit('change', value, this.dataIndex, arguments)
        }
        changeEvent['blur'] = (v) => {
          event['blur'] && event['blur'](v, arguments)
          this.$emit('blur', v)
        }
      }
      return { ...event, ...changeEvent }
    }
  },
  methods: {
    // 得到placeholder的显示
    getPlaceholder(row) {
      let placeholder
      if (typeof row.comp === 'string' && row.comp) {
        if (row.comp.includes('input')) {
          placeholder = '请输入' + row.label
        } else if (row.comp.includes('select')) {
          placeholder = '请选择' + row.label
        } else if (row.comp === 'TAntdDatePicker') {
          placeholder = ['开始时间', '结束时间']
        } else {
          placeholder = row.label
        }
      }
      return placeholder
    }
  }
}
</script>
