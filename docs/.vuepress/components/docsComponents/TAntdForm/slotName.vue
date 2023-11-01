<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-form :ref-obj.sync="formOpts.ref" :formOpts="formOpts" :widthSize="1">
        <template #wechat>
          <div style="display:flex;">
            <a-input v-model="formOpts.formData.wechat" placeholder="自定义输入框插槽"></a-input>
          </div>
        </template>
        <!-- 平台用户下拉子组件自定义插槽 -->
        <template #accountType>
          <a-select-option
            v-for="(item,index) in formOpts.listTypeInfo.accountTypeList"
            :key="index"
            :value="item"
          >{{item}}</a-select-option>
        </template>
        <!-- 状态子组件自定义插槽 -->
        <template #status>
          <a-select-option
            v-for="(item,index) in formOpts.listTypeInfo.statusList"
            :key="index"
            :value="item.value"
          >{{item.key}}</a-select-option>
        </template>
      </t-antd-form>
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
          accountType: undefined, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
          wechat: undefined, // 微信
          desc: undefined, // 描述
          status: undefined // 状态
        },
        fieldList: [
          { label: '平台用户', placeholder: '对象自定义option插槽', value: 'accountType', type: 'select-obj', comp: 'a-select', childSlotName: 'accountType' },
          { label: '状态', placeholder: '数组自定义option插槽', value: 'status', type: 'select-arr', comp: 'a-select', childSlotName: 'status' },
          { label: '微信', value: 'wechat', slotName: 'wechat' },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'a-input', widthSize: 1 }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm }
        ],
        // 相关列表
        listTypeInfo: {
          statusList: [
            { key: '启用', value: 1 },
            { key: '停用', value: 0 }
          ],
          accountTypeList: {
            0: '手机用户',
            1: '论坛用户',
            2: '平台用户'
          }
        }
      }
    }
  },
  // 方法
  methods: {
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
