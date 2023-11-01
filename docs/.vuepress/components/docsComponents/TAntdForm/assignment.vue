<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-form :ref-obj.sync="formOpts.ref" :formOpts="formOpts" :widthSize="1" />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>

<script>
import moment from 'moment'
export default {
  name: 'dhFormDemo',
  data() {
    return {
      // form表单
      formOpts: {
        ref: null,
        formData: {
          sex: null, // *性别: 0:男 1:女
          hobby: null, // *爱好: 0:男 1:女
          createDate: null, // 年份
          valDate1: [null, null], // 月份范围
          valDate2: [null, null], // 日期范围
          valDate3: [null, null], // 时间范围
          desc: null, // 描述
          status: null // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '性别', value: 'sex', placeholder: 'TAntdSelect单选', isSelfCom: true, comp: 't-antd-select', bind: { optionSource: this.sexList, valueKey: 'value' } },
          { label: '状态', value: 'status', placeholder: 'TAntdSelect单选', isSelfCom: true, comp: 't-antd-select', bind: { optionSource: this.statusList, valueKey: 'value' } },
          { label: '爱好', value: 'hobby', placeholder: 'TAntdSelect多选', isSelfCom: true, comp: 't-antd-select', bind: { mode: 'multiple', valueKey: 'value', optionSource: this.hobbyList } },
          { label: '月份范围', value: 'valDate1', isSelfCom: true, comp: 't-antd-date-picker', bind: { format: 'YYYY-MM', type: 'month' } },
          { label: '日期范围', value: 'valDate2', isSelfCom: true, comp: 't-antd-date-picker', bind: { format: 'YYYY-MM-DD' } },
          { label: '时间范围', value: 'valDate3', isSelfCom: true, comp: 't-antd-date-picker', bind: { showTime: true } },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'a-input', widthSize: 1 }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm }
        ]
      },
      hobbyList: [],
      sexList: [],
      statusList: []
    }
  },
  created() {
    this.getSelectList()
  },
  mounted() {
    const objShow = {
      sex: 1, // *性别: 0:男 1:女
      hobby: ['0', '2'], // *爱好
      createDate: '2028', // 年份
      valDate1: [moment('2022-01', 'YYYY-MM'), moment('2022-12', 'YYYY-MM')], // 月份范围
      valDate2: [moment('2022-11-12', 'YYYY-MM-DD'), moment('2022-12-12', 'YYYY-MM-DD')], // 日期范围
      valDate3: [moment('2022-11-05 17:27:37', 'YYYY-MM-DD HH:mm:ss'), moment('2022-12-05 17:27:37', 'YYYY-MM-DD HH:mm:ss')], // 时间范围
      desc: '8888', // 描述
      status: 1 // *状态: 0：停用，1：启用(默认为1)',
    }
    // console.log(222, this.hobbyList)
    this.formOpts.formData = objShow
  },
  // 方法
  methods: {
    getSelectList() {
      this.hobbyList = [
        { label: '吉他', value: '0' },
        { label: '看书', value: '1' },
        { label: '美剧', value: '2' },
        { label: '旅游', value: '3' },
        { label: '音乐', value: '4' }
      ]
      this.sexList = [
        { label: '女', value: 1 },
        { label: '男', value: 0 }
      ]
      this.statusList = [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 }
      ]
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
        }
      })
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
