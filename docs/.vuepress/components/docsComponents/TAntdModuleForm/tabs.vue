<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-module-form
        title="显示tabs且默认显示tab2"
        ref="sourceForm"
        :formOpts="formOpts"
        :submit="submit"
        :tabs="tabs"
        isTabMargin
        @tabsChange="tabsChange"
      >
        <!-- tabs插槽 -->
        <template #tab1>基础信息</template>
        <template #tab2>
          <t-antd-table
            title="显示tab2"
            :dataSource="table.data"
            :columns="table.columns"
            :tableOpt="{bordered:true,scroll: {x: '110%'}}"
          />
        </template>
        <template #tab3>
          <div>承运明细</div>
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
      tabs: [
        {
          key: 'tab1',
          title: '基础信息'
        },
        {
          key: 'tab2',
          title: '指派明细'
        },
        {
          key: 'tab3',
          title: '承运明细'
        }
      ],
      formOpts: {
        goodsInformation: {
          title: '货品信息',
          name: 'goodsInformation',
          ref: null,
          opts: {
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
            ]
          }
        },
        loadingDate: {
          name: 'loadingDate',
          title: '承运信息',
          ref: null,
          opts: {
            formData: {
              id: `${Math.floor(Math.random() * 10 + 1)}`, // *唯一ID
              createDate: '', // 创建时间
              valDate: [null, null], // el日期选择范围
              qq: '', // qq
              accountType: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
              email: '', // 邮箱
              desc: '', // 描述
              number: '', // 计算器
              status: '' // *状态: 0：停用，1：启用(默认为1)',
            },
            fieldList: [
              { label: '创建时间', value: 'createDate', isSelfCom: true, bind: {}, comp: 'a-date-picker' },
              { label: '日期范围', value: 'valDate', isSelfCom: true, comp: 'a-range-picker', bind: { separator: '-' } },
              { label: 'QQ', value: 'qq', type: 'input', comp: 'a-input' },
              { label: '邮箱', value: 'email', type: 'input', comp: 'a-input' },
              { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false, min: 2, max: 99 }, comp: 'a-input-number' },
              { label: '描述', value: 'desc', type: 'textarea', comp: 'a-input', widthSize: 1 }
            ],
            // 相关列表
            listTypeInfo: {
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
        }
      },
      table: {
        data: [
          {
            id: '1',
            date: '2019-09-25',
            name: '张三',
            status: '2',
            address: '广东省广州市天河区'
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '3',
            date: '2019-09-27',
            name: '张三2',
            status: '3',
            address: '广东省广州市天河区3'
          }
        ],
        columns: [
          { dataIndex: 'name', title: '姓名', width: 80 },
          { dataIndex: 'date', title: '日期', width: 120 },
          { dataIndex: 'address', title: '地址', width: 200 }
        ]
      }
    }
  },
  mounted() {
    // 默认选中tab2
    this.$refs.sourceForm.setSelectedTab('tab2')
  },
  // 方法
  methods: {
    // tabs切换
    tabsChange(val) {
      console.log('tabs切换', val.name)
    },
    // 提交form表单
    submit(data) {
      console.log('最终提交数据', data)
    }
  }
}
</script>
