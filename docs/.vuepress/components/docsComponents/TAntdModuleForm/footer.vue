<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-module-form title="自定义底部按钮" ref="sourceForm" :formOpts="formOpts" :submit="submit">
        <template #footerBtn>
          <a-button type="primary" @click="clearValidate">清除校验</a-button>
          <a-button type="primary" @click="resetForm">重置</a-button>
          <a-button type="danger" @click="save">保存</a-button>
        </template>
      </t-antd-module-form>
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
export default {
  name: 'TModuleFormDemo',
  data() {
    return {
      formOpts: {
        goodsInformation: {
          title: '货品信息',
          name: 'goodsInformation',
          ref: null,
          opts: {
            labelPosition: 'top',
            formData: {
              id: `${Math.floor(Math.random() * 10 + 1)}`, // *唯一ID
              account: undefined, // *用户账号
              password: undefined, // *用户密码
              name: undefined, // *用户昵称
              sex: undefined, // *性别: 0:男 1:女
              hobby: [], // *爱好: 0:男 1:女
              accountType: undefined, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
              status: undefined // *状态: 0：停用，1：启用(默认为1)',
            },
            fieldList: [
              { label: '账号', value: 'account', type: 'input', comp: 'a-input', event: 'account' },
              { label: '密码', value: 'password', type: 'password', comp: 'a-input' },
              { label: '昵称', value: 'name', type: 'input', comp: 'a-input' },
              { label: '性别', value: 'sex', type: 'select-arr', comp: 'a-select', list: 'sexList', bind: { disabled: false }, arrLabel: 'key', arrKey: 'value' },
              { label: '平台用户', value: 'accountType', type: 'select-obj', comp: 'a-select', list: 'accountTypeList' },
              { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'a-select', arrLabel: 'key', arrKey: 'value' },
              { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'a-checkbox-group', list: 'hobbyList', event: 'checkbox', widthSize: 1 }
            ],
            rules: {
              account: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ],
              name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
              sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
              status: [{ required: true, message: '请选择状态', trigger: 'change' }],
              accountType: [{ required: true, message: '请选择平台用户', trigger: 'change' }],
              hobby: [
                { type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }
              ]
            },
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
        },
        freight: {
          title: '运费信息',
          name: 'freight',
          opts: {
            formData: {
              phone: '', // 手机号码
              createDate: '', // 创建时间
              valDate: [null, null], // el日期选择范围
              wechat: '', // 微信
              qq: '', // qq
              email: '', // 邮箱
              desc: '', // 描述
              number: '' // 计算器
            },
            fieldList: [
              { label: '手机号码', value: 'phone', type: 'input', comp: 'a-input', bind: { maxLength: 11 } },
              { label: '创建时间', value: 'createDate', isSelfCom: true, bind: {}, comp: 'a-date-picker' },
              { label: '日期范围', value: 'valDate', isSelfCom: true, comp: 'a-range-picker', bind: { separator: '-' } },
              { label: '微信', value: 'wechat', type: 'input', comp: 'a-input' },
              { label: 'QQ', value: 'qq', type: 'input', comp: 'a-input' },
              { label: '邮箱', value: 'email', type: 'input', comp: 'a-input' },
              { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false, min: 2, max: 99 }, comp: 'a-input-number' },
              { label: '描述', value: 'desc', type: 'textarea', comp: 'a-input', widthSize: 1 }
            ],
            rules: {
              phone: [
                { required: true, message: '请输入手机号码', trigger: 'blur' }
              ],
              createDate: [{ required: true, message: '请选择创建时间', trigger: 'change' }],
              valDate: [{ required: true, message: '请选择element日期', trigger: 'change' }],
              wechat: [
                { required: true, message: '请输入微信', trigger: 'blur' }
              ],
              email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
              qq: [{ required: true, message: '请输入QQ', trigger: 'blur' }]
            }
          }
        }
      }
    }
  },
  // 方法
  methods: {
    // 重置表单
    resetForm() {
      console.log('重置表单')
      this.$refs.sourceForm.resetFormFields()
    },
    // 清除校验
    clearValidate() {
      console.log('清除校验')
      this.$refs.sourceForm.clearValidate()
    },
    save() {
      this.$refs.sourceForm.saveHandle()
    },
    // 提交form表单
    submit(data) {
      console.log('最终提交数据', data)
    }
  }
}
</script>
