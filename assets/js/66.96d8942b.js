(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{938:function(e,a,t){"use strict";t.r(a);var r={name:"TModuleFormDemo",data:function(){return{formOpts:{goodsInformation:{title:"货品信息",name:"goodsInformation",ref:null,opts:{labelPosition:"top",formData:{id:"".concat(Math.floor(10*Math.random()+1)),account:void 0,password:void 0,name:void 0,sex:void 0,hobby:[],accountType:void 0,status:void 0},fieldList:[{label:"账号",value:"account",type:"input",comp:"a-input",event:"account"},{label:"密码",value:"password",type:"password",comp:"a-input"},{label:"昵称",value:"name",type:"input",comp:"a-input"},{label:"性别",value:"sex",type:"select-arr",comp:"a-select",list:"sexList",bind:{disabled:!1},arrLabel:"key",arrKey:"value"},{label:"平台用户",value:"accountType",type:"select-obj",comp:"a-select",list:"accountTypeList"},{label:"状态",value:"status",type:"select-arr",list:"statusList",comp:"a-select",arrLabel:"key",arrKey:"value"},{label:"爱好",value:"hobby",type:"checkbox",comp:"a-checkbox-group",list:"hobbyList",event:"checkbox",widthSize:1}],rules:{account:[{required:!0,message:"请输入账号",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],name:[{required:!0,message:"请输入昵称",trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],status:[{required:!0,message:"请选择状态",trigger:"change"}],accountType:[{required:!0,message:"请选择平台用户",trigger:"change"}],hobby:[{type:"array",required:!0,message:"请至少选择一个爱好",trigger:"change"}]},listTypeInfo:{hobbyList:[{label:"吉他",value:"0"},{label:"看书",value:"1"},{label:"美剧",value:"2"},{label:"旅游",value:"3"},{label:"音乐",value:"4"}],sexList:[{key:"女",value:1},{key:"男",value:0}],accountTypeList:{0:"手机用户",1:"论坛用户",2:"平台用户"},statusList:[{key:"启用",value:1},{key:"停用",value:0}]}}},freight:{title:"运费信息",name:"freight",opts:{formData:{phone:"",createDate:"",valDate:[null,null],wechat:"",qq:"",email:"",desc:"",number:""},fieldList:[{label:"手机号码",value:"phone",type:"input",comp:"a-input",bind:{maxLength:11}},{label:"创建时间",value:"createDate",isSelfCom:!0,bind:{},comp:"a-date-picker"},{label:"日期范围",value:"valDate",isSelfCom:!0,comp:"a-range-picker",bind:{separator:"-"}},{label:"微信",value:"wechat",type:"input",comp:"a-input"},{label:"QQ",value:"qq",type:"input",comp:"a-input"},{label:"邮箱",value:"email",type:"input",comp:"a-input"},{label:"计数器",value:"number",type:"inputNumber",bind:{controls:!1,min:2,max:99},comp:"a-input-number"},{label:"描述",value:"desc",type:"textarea",comp:"a-input",widthSize:1}],rules:{phone:[{required:!0,message:"请输入手机号码",trigger:"blur"}],createDate:[{required:!0,message:"请选择创建时间",trigger:"change"}],valDate:[{required:!0,message:"请选择element日期",trigger:"change"}],wechat:[{required:!0,message:"请输入微信",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"}],qq:[{required:!0,message:"请输入QQ",trigger:"blur"}]}}}}}},methods:{resetForm:function(){console.log("重置表单"),this.$refs.sourceForm.resetFormFields()},clearValidate:function(){console.log("清除校验"),this.$refs.sourceForm.clearValidate()},save:function(){this.$refs.sourceForm.saveHandle()},submit:function(e){console.log("最终提交数据",e)}}},l=t(14),o=Object(l.a)(r,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("t-antd-layout-page",[t("t-antd-layout-page-item",[t("t-antd-module-form",{ref:"sourceForm",attrs:{title:"自定义底部按钮",formOpts:e.formOpts,submit:e.submit},scopedSlots:e._u([{key:"footerBtn",fn:function(){return[t("a-button",{attrs:{type:"primary"},on:{click:e.clearValidate}},[e._v("清除校验")]),e._v(" "),t("a-button",{attrs:{type:"primary"},on:{click:e.resetForm}},[e._v("重置")]),e._v(" "),t("a-button",{attrs:{type:"danger"},on:{click:e.save}},[e._v("保存")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);a.default=o.exports}}]);