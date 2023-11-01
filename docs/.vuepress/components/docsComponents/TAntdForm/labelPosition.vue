<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <a-radio-group v-model="formOpts.layout" style="margin-bottom:15px;">
        <a-radio-button value="horizontal">horizontal布局</a-radio-button>
        <a-radio-button value="inline">inline布局</a-radio-button>
        <a-radio-button value="vertical">vertical布局</a-radio-button>
      </a-radio-group>
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
        layout: 'horizontal',
        ref: null,
        formData: {
          account: '', // *用户账号
          password: '', // *用户密码
          name: '', // *用户昵称
          sex: undefined, // *性别: 0:男 1:女
          hobby: [], // *爱好: 0:男 1:女
          phone: '', // 手机号码
          qq: '', // qq
          accountType: undefined, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
          email: '', // 邮箱
          desc: '', // 描述
          number: '', // 计算器
          status: undefined // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '账号', value: 'account', type: 'input', comp: 'a-input', event: 'account' },
          { label: '密码', value: 'password', type: 'password', comp: 'a-input' },
          { label: '昵称', value: 'name', type: 'input', comp: 'a-input' },
          { label: '性别', value: 'sex', type: 'select-arr', comp: 'a-select', list: 'sexList', bind: { disabled: false }, arrLabel: 'key', arrKey: 'value' },
          { label: '平台用户', value: 'accountType', type: 'select-obj', comp: 'a-select', list: 'accountTypeList', childSlotName: 'accountType' },
          { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'a-select', arrLabel: 'key', arrKey: 'value' },
          { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'a-checkbox-group', list: 'hobbyList', event: 'checkbox' },
          { label: '手机号码', value: 'phone', type: 'input', comp: 'a-input', bind: { maxLength: 11 } },
          { label: 'QQ', value: 'qq', type: 'input', comp: 'a-input' },
          { label: '邮箱', value: 'email', type: 'input', comp: 'a-input' },
          { label: '计数器', value: 'number', type: 'inputNumber', bind: {}, comp: 'a-input-number' },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'a-input', widthSize: 1 }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm }
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
    // 触发事件
    handleEvent(type, val) {
      switch (type) {
        case 'checkbox':
          console.log(`handleEvent事件监听${type}：`, val, type)
          break
      }
    },
    // 提交form表单
    submitForm() {
      this.formOpts.ref.validate((valid) => {
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
