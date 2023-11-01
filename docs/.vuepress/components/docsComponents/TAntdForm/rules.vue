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
          account: undefined, // *用户账号
          password: undefined, // *用户密码
          name: undefined, // *用户昵称
          sex: undefined, // *性别: 0:男 1:女
          hobby: [], // *爱好: 0:男 1:女
          phone: undefined, // 手机号码
          createDate: undefined, // 创建时间
          valDate: undefined, // el日期选择范围
          email: undefined, // 邮箱
          desc: undefined, // 描述
          status: undefined // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '账号', value: 'account', type: 'input', comp: 'a-input', event: 'account' },
          { label: '密码', value: 'password', type: 'password', comp: 'a-input' },
          { label: '昵称', value: 'name', type: 'input', comp: 'a-input' },
          { label: '性别', value: 'sex', type: 'select-arr', comp: 'a-select', list: 'sexList', bind: { disabled: false }, arrLabel: 'key', arrKey: 'value' },
          { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'a-select', arrLabel: 'key', arrKey: 'value' },
          { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'a-checkbox-group', list: 'hobbyList', event: 'checkbox' },
          { label: '手机号码', value: 'phone', type: 'input', comp: 'a-input', bind: { maxLength: 11 } },
          { label: '创建时间', value: 'createDate', type: 'year', isSelfCom: true, bind: {}, comp: 'a-date-picker' },
          // { label: '日期', value: 'valDate', comp: 't-date-picker', rules: { required: true, message: '请选择element日期', trigger: 'change' }, bind: { type: 'daterange', isPickerOptions: true } },
          { label: '邮箱', value: 'email', type: 'input', comp: 'a-input' },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'a-input', className: 't-antd-form-block' }
        ],
        rules: {
          account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
          sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
          hobby: [{ required: true, message: '请至少选择一个爱好', trigger: 'change' }],
          email: [{ validator: this.validatorEmail, message: '自定义配置校验规则', trigger: 'blur' }
          ]
        },
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm },
          { label: '清除校验', type: 'danger', fun: this.clearValidate }
        ],
        // 相关列表
        listTypeInfo: {
          hobbyList: [
            { label: '吉他', value: '0' },
            { label: '看书', value: '1' },
            { label: '美剧', value: '2' },
            { label: '旅游', value: '3' },
            { label: '音乐', value: '4' }
          ],
          sexList: [
            { key: '女', value: 1 },
            { key: '男', value: 0 }
          ],
          accountTypeList: {
            0: '手机用户',
            1: '论坛用户',
            2: '平台用户'
          },
          statusList: [
            { key: '启用', value: 1 },
            { key: '停用', value: 0 }
          ]
        }
      }
    }
  },
  // 方法
  methods: {
    // 邮箱校验
    validatorEmail(rule, value, callback) {
      if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        callback(new Error(rule.message))
      }
      callback()
    },
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
        console.log(88, valid)
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
      // 清空校验
      this.formOpts.ref.clearValidate()
    },
    // 清除校验
    clearValidate() {
      this.formOpts.ref.clearValidate()
    }
  }
}
</script>
