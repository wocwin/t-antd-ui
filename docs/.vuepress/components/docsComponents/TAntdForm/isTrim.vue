<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-form :ref-obj.sync="formOpts.ref" :formOpts="formOpts" :widthSize="1" />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>

<script>
export default {
  name: 'dhFormDemo',
  data() {
    return {
      formOpts: {
        ref: null,
        formData: {
          account: '', // *用户账号
          name: '', // *用户昵称
          password: '', // 密碼
        },
        fieldList: [
          {
            label: '账号',
            value: 'account',
            placeholder: '账号设置isTrim，不去除前后空格',
            isTrim: true,
            type: 'input',
            comp: 'a-input',
          },
          {
            label: '昵称',
            placeholder: '默认el-input去除前后空格',
            value: 'name',
            type: 'input',
            comp: 'a-input'
          },
          {
            label: '密码',
            placeholder: 'type为password，不去除前后空格',
            value: 'password',
            type: 'password',
            comp: 'a-input'
          },
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
