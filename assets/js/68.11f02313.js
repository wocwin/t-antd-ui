(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{939:function(e,a,t){"use strict";t.r(a);var l={name:"TModuleFormDemoBase",data:function(){return{formOpts:{goodsInformation:{title:"货品信息",name:"goodsInformation",ref:null,opts:{formData:{id:"".concat(Math.floor(10*Math.random()+1)),account:"",password:"",name:"",sex:"",hobby:[],accountType:"",status:""},fieldList:[{label:"账号",value:"account",type:"input",comp:"a-input",event:"account"},{label:"密码",value:"password",type:"password",comp:"a-input"},{label:"昵称",value:"name",type:"input",comp:"a-input"},{label:"性别",value:"sex",type:"select-arr",comp:"a-select",list:"sexList",bind:{disabled:!1},arrLabel:"key",arrKey:"value"},{label:"平台用户",value:"accountType",type:"select-obj",comp:"a-select",list:"accountTypeList"},{label:"状态",value:"status",type:"select-arr",list:"statusList",comp:"a-select",arrLabel:"key",arrKey:"value"},{label:"爱好",value:"hobby",type:"checkbox",comp:"a-checkbox-group",list:"hobbyList",event:"checkbox",widthSize:1}],listTypeInfo:{hobbyList:[{label:"吉他",value:"0"},{label:"看书",value:"1"},{label:"美剧",value:"2"},{label:"旅游",value:"3"},{label:"音乐",value:"4"}],sexList:[{key:"女",value:1},{key:"男",value:0}],accountTypeList:{0:"手机用户",1:"论坛用户",2:"平台用户"},statusList:[{key:"启用",value:1},{key:"停用",value:0}]}}},freight:{title:"运费信息",name:"freight",opts:{formData:{phone:"",createDate:"",valDate:[null,null],wechat:"",qq:"",email:"",desc:"",number:""},fieldList:[{label:"手机号码",value:"phone",type:"input",comp:"a-input",bind:{maxLength:11}},{label:"创建时间",value:"createDate",isSelfCom:!0,bind:{},comp:"a-date-picker"},{label:"日期范围",value:"valDate",isSelfCom:!0,comp:"a-range-picker",bind:{separator:"-"}},{label:"微信",value:"wechat",type:"input",comp:"a-input"},{label:"QQ",value:"qq",type:"input",comp:"a-input"},{label:"邮箱",value:"email",type:"input",comp:"a-input"},{label:"计数器",value:"number",type:"inputNumber",bind:{controls:!1,min:2,max:99},comp:"a-input-number"},{label:"描述",value:"desc",type:"textarea",comp:"a-input",widthSize:1}]}},loadingDate:{name:"loadingDate",title:"承运信息",ref:null,opts:{formData:{id:"".concat(Math.floor(10*Math.random()+1)),createDate:"",valDate:[null,null],qq:"",accountType:"",email:"",desc:"",number:"",status:""},fieldList:[{label:"创建时间",value:"createDate",isSelfCom:!0,bind:{},comp:"a-date-picker"},{label:"日期范围",value:"valDate",isSelfCom:!0,comp:"a-range-picker",bind:{separator:"-"}},{label:"QQ",value:"qq",type:"input",comp:"a-input"},{label:"邮箱",value:"email",type:"input",comp:"a-input"},{label:"计数器",value:"number",type:"inputNumber",bind:{controls:!1,min:2,max:99},comp:"a-input-number"},{label:"描述",value:"desc",type:"textarea",comp:"a-input",widthSize:1}],listTypeInfo:{sexList:[{key:"女",value:1},{key:"男",value:0}],accountTypeList:{0:"手机用户",1:"论坛用户",2:"平台用户"},statusList:[{key:"启用",value:1},{key:"停用",value:0}]}}}}}},methods:{back:function(){console.log("自定义返回事件")},submit:function(e){console.log("最终提交数据",e)}}},o=t(14),u=Object(o.a)(l,(function(){var e=this.$createElement,a=this._self._c||e;return a("t-antd-layout-page",[a("t-antd-layout-page-item",[a("t-antd-module-form",{ref:"sourceForm",attrs:{title:"自定义返回事件",formOpts:this.formOpts,isGoBackEvent:"",submit:this.submit},on:{back:this.back}})],1)],1)}),[],!1,null,null,null);a.default=u.exports}}]);