<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-form
        :ref-obj.sync="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
        @handleEvent="handleEvent"
      />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>

<script>
export default {
  name: 'dhFormDemo',
  data() {
    return {
      // form表单
      formOpts: {
        ref: null,
        formData: {
          account: '', // *用户账号
          name: '', // *用户昵称
          valDate: '', // el日期选择范围
          email: '', // 邮箱
          desc: '' // 描述
        },
        fieldList: [
          {
            labelRender: () => {
              return (
                <span style="color:red;">
                  账号
                </span>
              )
            },
            value: 'account',
            type: 'input',
            comp: 'a-input',
            event: 'account'
          },
          {
            labelRender: () => {
              return (
                <span style="color:blue;">
                  昵称
                </span>
              )
            },
            value: 'name',
            type: 'input',
            comp: 'a-input'
          },
          {
            labelRender: () => {
              return (
                <span style="color:green;">
                  日期组件
                </span>
              )
            },
            value: 'valDate',
            comp: 'a-date-picker',
            isSelfCom: true,
            bind: { type: 'date' }
          },
          {
            labelRender: () => {
              return (
                <span style="color:plum;">
                  邮箱
                </span>
              )
            },
            value: 'email',
            type: 'input',
            comp: 'a-input'
          },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'a-input', className: 't-antd-form-block' }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm }
        ]
      }
    }
  },
  // 方法
  methods: {
    // 触发事件
    handleEvent(type, val) {
      switch (type) {
        case 'checkbox':
          console.log('checkbox', val, type)
          break
      }
    },
    // 提交form表单
    submitForm() {
      this.formOpts.ref.validate((valid) => {
        console.log(77, this.formOpts.formData)
        if (!valid) return
        console.log('最终数据', this.formOpts.formData)
      })
    },
    // 重置form表单
    resetForm() {
      Object.assign(
        this.$data.formOpts.formData,
        this.$options.data().formOpts.formData
      )
    }
  }
}
</script>
