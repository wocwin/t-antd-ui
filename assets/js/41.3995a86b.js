(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{904:function(e,a,l){"use strict";l.r(a);l(141),l(26),l(85);var n=l(5),t=l.n(n),u=t()().endOf("day"),i={name:"dh-conditional-demo",data:function(){return{queryData:{originFurnaceNumber:null,dealedFurnaceNumber:null,dealedStatusLst:null,ManualDealedTime:null,SamplingTime:null,ReceiveTime:null,furnaceNoLst:null},statusData:[{value:"0",label:"没有异常"},{value:10,label:"原始炉号格式错误"},{value:11,label:"原始炉号重复"},{value:20,label:"处理失败"},{value:30,label:"处理成功"},{value:40,label:"作废"}],originNumber:[{value:"0",label:"原编号1"},{value:10,label:"原编号2"},{value:11,label:"原编号3"},{value:20,label:"原编号4"},{value:30,label:"原编号5"},{value:40,label:"原编号6"}],dealedNumber:[{value:"0",label:"目标编号1"},{value:10,label:"目标编号2"},{value:11,label:"目标编号3"},{value:20,label:"目标编号4"},{value:30,label:"目标编号5"},{value:40,label:"目标编号6"}]}},computed:{conditionParams:function(){return{originFurnaceNumber:{label:"源编号",placeholder:"请选择源编号",comp:"a-select",changeEvent:"change",child:this.originNumber.reduce((function(e,a){return e.push({comp:"a-select-option",text:a.label,value:a.value}),e}),[])},dealedFurnaceNumber:{label:"目标编号",comp:"a-select",changeEvent:"change",child:this.dealedNumber.reduce((function(e,a){return e.push({comp:"a-select-option",text:a.label,value:a.value}),e}),[])},dealedStatusLst:{label:"处理状态",comp:"a-select",changeEvent:"change",span:2,bind:{mode:"multiple"},child:this.statusData.reduce((function(e,a){return e.push({comp:"a-select-option",text:a.label,value:a.value}),e}),[])},ManualDealedTime:{label:"处理时间",comp:"TAntdDatePicker",changeEvent:"change",span:2,type:"day",bind:{showTime:{format:"HH:mm:ss"},showSearch:!1}},SamplingTime:{label:"化验时间",comp:"TAntdDatePicker",changeEvent:"change",span:2,type:"day",bind:{showTime:{format:"HH:mm:ss"},showSearch:!1}},ReceiveTime:{label:"采集发送时间",comp:"TAntdDatePicker",changeEvent:"change",span:2,type:"day",bind:{showTime:{format:"HH:mm:ss"},showSearch:!1,format:"YYYY-MM-DD HH:mm:ss",disabledRange:[t()("2020-1-1"),t()(u)]}},furnaceNoLst:{label:"炉号",comp:"a-select",changeEvent:"change",bind:{mode:"multiple"},child:[1,2,3,5].reduce((function(e,a){return e.push({comp:"a-select-option",text:a,value:a}),e}),[])}}},getQueryData:function(){var e=this.queryData;return{originFurnaceNumber:e.originFurnaceNumber,dealedFurnaceNumber:e.dealedFurnaceNumber,dealedStatusLst:e.dealedStatusLst,ManualDealedTime:e.ManualDealedTime,SamplingTime:e.SamplingTime,ReceiveTime:e.ReceiveTime,furnaceNoLst:e.furnaceNoLst}}},methods:{conditionEnter:function(e){console.log("查询参数",e),console.log("最终参数",this.getQueryData)}}},c=l(14),o=Object(c.a)(i,(function(){var e=this.$createElement,a=this._self._c||e;return a("t-antd-layout-page",[a("t-antd-conditional",{attrs:{isShowOpen:!1,opts:this.conditionParams},on:{submit:this.conditionEnter}})],1)}),[],!1,null,null,null);a.default=o.exports}}]);