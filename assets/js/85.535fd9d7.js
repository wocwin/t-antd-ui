(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{961:function(e,t,n){"use strict";n.r(t);n(26),n(230);var a={name:"rowSelection",data:function(){var e=this;return{selectedRowKeys:[],pagination:{current:1,pageSize:10,total:0},columns:[{title:"取料地",dataIndex:"addrName",width:100},{title:"物料名称",dataIndex:"materialName",width:160},{title:"产地",dataIndex:"materialProducingArea",width:160},{title:"取样时间点",dataIndex:"timeNames",width:160,customRender:function(e){return e.toString()}},{title:"接收机构",dataIndex:"usingDeptNames",width:160,customRender:function(t,n){return{children:e.$createElement("div",{},[e.$createElement("a-tooltip",{attrs:{title:t.toString()}},[e.$createElement("span",{domProps:{innerHTML:t.toString()},style:{maxWidth:160,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",cursor:"pointer"}})])])}}},{title:"类型",dataIndex:"samplingType",width:100,customRender:function(e){return 0==e?"常规":1==e?"非常规":2==e?"通用":void 0}},{title:"状态",dataIndex:"status",width:100,isCustomRender:!0,customRender:function(t,n){return{children:e.$createElement("div",{},[e.$createElement("a-switch",{attrs:{checked:Boolean(n.status),size:"small"},on:{change:function(t){e.onStatusChange(t,n)}}})])}}},{title:"操作",dataIndex:"handler",width:120,isCustomRender:!0,customRender:function(t,n){return{children:e.$createElement("div",{},[e.$createElement("a-popconfirm",{attrs:{title:"你确定要删除吗？"},on:{confirm:e.del.bind(e,n)}},[e.$createElement("a-button",{domProps:{innerHTML:"删除"},attrs:{type:"link"},style:{padding:"0 5px 0 0"}})]),e.$createElement("a-button",{domProps:{innerHTML:"修改"},attrs:{type:"link"},on:{click:e.edit.bind(e,n)},style:{padding:"0 0 0 5px"}})])}}}],sourceData:[{id:85,addrName:"916料场",materialName:"卡粉-new",materialProducingArea:"京环-new",samplingType:0,status:1,timeNames:["2点半"],usingDeptNames:["BBQ煤炉","总调度室","球团3期","竖炉"]},{id:80,addrName:"一号料场",materialName:"测试物料",materialProducingArea:"测试场地",samplingType:2,status:1,timeNames:["12点"],usingDeptNames:["总调度室","112烧结厂"]},{id:79,addrName:"一号料场",materialName:"喷煤",materialProducingArea:"二期喷煤厂",samplingType:0,status:1,timeNames:["20点","08点"],usingDeptNames:["总调度室","112烧结厂"]}]}},methods:{onSelectChange:function(e){console.log(7878,e),this.selectedRowKeys=e},onStatusChange:function(e,t){console.log(e,t)},handleTableChange:function(e){console.log(1212,e)},creat:function(){console.log("新增操作")},anew:function(){console.log("重新处理操作")},toVoids:function(){console.log("作废操作")},del:function(e){console.log("删除操作",e)},edit:function(e){console.log("编辑操作",e)}}},o=n(14),i=Object(o.a)(a,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("t-antd-layout-page",[n("t-antd-layout-page-item",[n("t-antd-table",{attrs:{title:"样品列表222","column-setting":"",pagination:e.pagination,columns:e.columns,dataSource:e.sourceData,tableOpt:{rowSelection:{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange},bordered:!0}},on:{paginationChange:e.handleTableChange},scopedSlots:e._u([{key:"btn",fn:function(){return[n("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:e.creat}},[e._v("新增")]),e._v(" "),n("a-button",{attrs:{type:"primary",disabled:0===e.selectedRowKeys.length},on:{click:e.anew}},[e._v("重新处理")]),e._v(" "),n("a-button",{attrs:{type:"primary",disabled:0===e.selectedRowKeys.length},on:{click:e.toVoids}},[e._v("作废")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);t.default=i.exports}}]);