<template>
  <t-antd-layout-page>
    <t-antd-conditional :opts="opts" isExpansion @submit="conditionEnter" />
  </t-antd-layout-page>
</template>
<script>
import moment from 'moment'
const startTime = moment(moment().subtract("days", 15).startOf("day").valueOf())
const endTime = moment().endOf("day")
export default {
  name: 'dh-conditional-demo',
  data() {
    return {
      queryData: {
        originFurnaceNumber: null,
        dealedFurnaceNumber: null,
        dealedStatusLst: null,
        ManualDealedTime: null,
        SamplingTime: null,
        ReceiveTime: null,
        furnaceNoLst: null,
      },
      defaultFurnaceNoLst: [1, 2],
      // 处理状态数据
      statusData: [
        { value: '0', label: "没有异常" },
        { value: 10, label: "原始炉号格式错误" },
        { value: 11, label: "原始炉号重复" },
        { value: 20, label: "处理失败" },
        { value: 30, label: "处理成功" },
        { value: 40, label: "作废" }
      ],
      // 原编号数据
      originNumber: [
        { value: '0', label: "原编号1" },
        { value: 10, label: "原编号2" },
        { value: 11, label: "原编号3" },
        { value: 20, label: "原编号4" },
        { value: 30, label: "原编号5" },
        { value: 40, label: "原编号6" }
      ],
      // 目标编号数据
      dealedNumber: [
        { value: '0', label: "目标编号1" },
        { value: 10, label: "目标编号2" },
        { value: 11, label: "目标编号3" },
        { value: 20, label: "目标编号4" },
        { value: 30, label: "目标编号5" },
        { value: 40, label: "目标编号6" }
      ]
    }
  },
  computed: {
    opts() {
      return {
        originFurnaceNumber: {
          label: "源编号",
          placeholder: "请选择源编号",
          comp: 'a-select',
          changeEvent: "change",
          child: this.originNumber.reduce((acc, cur) => {
            acc.push({
              comp: 'a-select-option',
              text: cur.label,
              value: cur.value
            });
            return acc;
          }, []),
        },
        dealedFurnaceNumber: {
          label: "目标编号",
          comp: 'a-select',
          changeEvent: "change",
          child: this.dealedNumber.reduce((acc, cur) => {
            acc.push({
              comp: 'a-select-option',
              text: cur.label,
              value: cur.value
            });
            return acc;
          }, []),
        },
        dealedStatusLst: {
          label: "处理状态",
          comp: 'a-select',
          changeEvent: "change",
          defaultVal: this.defaultStatus,
          span: 2,
          bind: {
            mode: "multiple",
            filterOption: this.filterOption,
          },
          child: this.statusData.reduce((acc, cur) => {
            acc.push({
              comp: 'a-select-option',
              text: cur.label,
              value: cur.value,
            });
            return acc;
          }, []),
        },
        ManualDealedTime: {
          label: "处理时间",
          comp: "TAntdDatePicker",
          changeEvent: "change",
          span: 2,
          type: "day",
          bind: {
            showTime: {
              format: "HH:mm:ss"
            },
            showSearch: false
          }
        },
        SamplingTime: {
          label: "化验时间",
          comp: "TAntdDatePicker",
          changeEvent: "change",
          span: 2,
          type: "day",
          defaultVal: [startTime, endTime],
          bind: {
            showTime: {
              format: "HH:mm:ss",
            },
            showSearch: false,
          },
        },
        ReceiveTime: {
          label: "采集发送时间",
          comp: "TAntdDatePicker",
          changeEvent: "change",
          span: 2,
          type: "day",
          defaultVal: [startTime, endTime],
          bind: {
            showTime: {
              format: "HH:mm:ss",
            },
            showSearch: false,
            format: "YYYY-MM-DD HH:mm:ss",
            disabledRange: [moment("2020-1-1"), moment(endTime)],
          },
        },
        furnaceNoLst: {
          label: "炉号",
          comp: 'a-select',
          changeEvent: "change",
          defaultVal: this.defaultFurnaceNoLst,
          span: 1,
          bind: {
            mode: "multiple",
            filterOption: this.filterOption,
          },
          child: [1, 2, 3, 5].reduce((acc, cur) => {
            acc.push({
              comp: 'a-select-option',
              text: cur,
              value: cur,
            });
            return acc;
          }, []),
        }
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { originFurnaceNumber, dealedFurnaceNumber, dealedStatusLst, ManualDealedTime, SamplingTime, ReceiveTime, furnaceNoLst } = this.queryData
      return {
        originFurnaceNumber,
        dealedFurnaceNumber,
        dealedStatusLst,
        ManualDealedTime,
        SamplingTime,
        ReceiveTime,
        furnaceNoLst
      }
    }
  },
  methods: {
    // 查询
    conditionEnter(data) {
      this.queryData = data
      console.log('最终参数', this.getQueryData)
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>
