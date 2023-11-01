<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-form :ref-obj.sync="formOpts.ref" :formOpts="formOpts" :widthSize="1" />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>

<script>
import cascaderData from './cascaderData.json'
export default {
  name: 'dhFormDemo',
  data() {
    return {
      hobbyList: [],
      sexList: [],
      statusList: [],
      // form表单
      formOpts: {
        ref: null,
        formData: {
          sex: null, // *性别: 0:男 1:女
          hobby: null, // *爱好: 0:男 1:女
          valDate1: [null, null], // 月份范围
          valDate2: [null, null], // 日期范围
          valDate3: [null, null], // 时间范围
          desc: null, // 描述
          deptCode: null,
          deptCode1: null,
          deptCode2: null,
          status1: null,
          status: null // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          {
            label: '性别',
            value: 'sex',
            placeholder: 'TAntdSelect单选',
            comp: 't-antd-select',
            isSelfCom: true,
            bind: { optionSource: [] },
            eventHandle: {
              change: (val, scope) => this.changeSex(val, scope)
            }
          },
          { label: '状态', value: 'status', placeholder: 'TAntdSelect单选', comp: 't-antd-select', isSelfCom: true, bind: { optionSource: [] } },
          { label: '爱好', value: 'hobby', placeholder: 'TAntdSelect多选', comp: 't-antd-select', isSelfCom: true, bind: { multiple: true, optionSource: [] } },
          { label: '月份范围', value: 'valDate1', isSelfCom: true, comp: 't-antd-date-picker', bind: { type: 'month' } },
          { label: '日期范围', value: 'valDate2', isSelfCom: true, comp: 't-antd-date-picker', bind: { format: 'YYYY-MM-DD' } },
          { label: '时间范围', value: 'valDate3', isSelfCom: true, comp: 't-antd-date-picker', bind: { showTime: true } },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'a-input', widthSize: 1 }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm }
        ],
        listTypeInfo: {
          statusList: [
            { label: '启用', key: 1 },
            { label: '停用', key: 0 }
          ]
        }
      }
    }
  },
  async created() {
    await this.getSelectList()
  },
  // 方法
  methods: {
    getSelectList() {
      this.hobbyList = [
        { label: '吉他', key: '0' },
        { label: '看书', key: '1' },
        { label: '美剧', key: '2' },
        { label: '旅游', key: '3' },
        { label: '音乐', key: '4' }
      ]
      this.sexList = [
        { label: '女', key: 1 },
        { label: '男', key: 0 }
      ]
      this.statusList = [
        { label: '启用', key: 1 },
        { label: '停用', key: 0 }
      ]
      const tableData = [
        { id: 1, code: 1, name: '物料名称1', spec: '物料规格1', unitName: '吨' },
        { id: 2, code: 2, name: '物料名称2', spec: '物料规格2', unitName: '吨' },
        { id: 3, code: 3, name: '物料名称3', spec: '物料规格3', unitName: '吨' },
        { id: 4, code: 4, name: '物料名称4', spec: '物料规格4', unitName: '吨' },
        { id: 5, code: 5, name: '物料名称5', spec: '物料规格5', unitName: '吨' },
        { id: 6, code: 6, name: '物料名称6', spec: '物料规格6', unitName: '吨' },
        { id: 7, code: 7, name: '物料名称7', spec: '物料规格7', unitName: '吨' },
        { id: 8, code: 8, name: '物料名称8', spec: '物料规格8', unitName: '吨' },
        { id: 9, code: 9, name: '物料名称9', spec: '物料规格9', unitName: '吨' }
      ]
      const res = cascaderData
      this.formOpts.fieldList.map(val => {
        switch (val.value) {
          case 'sex':
            val.bind.optionSource = this.sexList
            break
          case 'status':
            val.bind.optionSource = this.statusList
            break
          case 'hobby':
            val.bind.optionSource = this.hobbyList
            break
          case 'deptCode':
          case 'deptCode1':
            val.bind.options = res.data
            break
          case 'deptCode2':
            val.bind.table.data = tableData
            // console.log('11--', val)
            break
        }
      })
    },
    changeSex(val, scope) {
      console.log('选择性别change事件', val, scope)
    },
    // 下拉选择表格组件赋值
    radioChange(val) {
      console.log('下拉选择表格组件赋值', val)
      this.formOpts.formData.deptCode2 = val.name
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
    }
  }
}
</script>
