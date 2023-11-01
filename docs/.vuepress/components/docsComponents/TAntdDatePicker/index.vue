<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <div>基本模式</div>
      <t-antd-date-picker
        v-model="selectDay"
        format="YYYY-MM-DD"
        allowClear
        @change="dateChange($event,'day')"
      />
      <div>选择月份</div>
      <t-antd-date-picker type="month" v-model="selectMonth" @change="dateChange($event,'month')" />
      <div>选择时间</div>
      <t-antd-date-picker show-time v-model="selectTime" @change="dateChange($event,'time')" />
      <div>限制可选择日期范围</div>
      <t-antd-date-picker
        show-time
        :disabledRange="disabledRange"
        @change="dateChange($event,'optionalDate')"
      />
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      selectDay: [null, null],
      selectMonth: [],
      selectTime: [],
      disabledRange: [moment("2020-12-01"), moment()]
    }
  },
  methods: {
    dateChange(date, type) {
      switch (type) {
        case 'day':
          console.log('基本模式_开始时间', moment(date[0]).format("YYYY-MM-DD"))
          console.log('基本模式_结束时间', moment(date[1]).format("YYYY-MM-DD"))
          break;
        case 'month':
          console.log('选择月份_开始时间', moment(date[0]).format("YYYY-MM"))
          console.log('选择月份_结束时间', moment(date[1]).format("YYYY-MM"))
          break;
        case 'time':
          console.log('选择时间_开始时间', moment(date[0]).format("YYYY"))
          console.log('选择时间_结束时间', moment(date[1]).format("YYYY"))
          break;
        case 'optionalDate':
          console.log('限制可选择日期范围_开始时间', moment(date[0]).format("YYYY"))
          console.log('限制可选择日期范围_结束时间', moment(date[1]).format("YYYY"))
          break;
      }
    }
  }
}
</script>
