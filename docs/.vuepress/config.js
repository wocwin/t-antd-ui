module.exports = {
  title: 'TAntdui基础组件文档库',
  description: '基于ant-design-vue二次封装基础组件示例',
  base: '/t-antd-ui/',
  // port: 6666,
  // dest: './dist',   // 设置输出目录
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `./favicon.ico` }]
  ],
  markdown: {
    // lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/wocwin/t-antd-ui',
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',
    nav: [
      { text: '主页', link: '/' },
      // { text: '实际项目问题', link: '/projectProblem/permission' },
      { text: '基础组件', link: '/baseComponents/' },
      // { text: 'Tui主题', link: '/theme/base' },
      { text: "Gitee码云", link: "https://gitee.com/wocwin/t-antd-ui" }
    ],
    sidebar: {
      '/baseComponents/': [
        {
          title: '常用组件',
          collapsable: false,
          children: [
            // 'TAntdLayoutConditional/base', // 筛选器布局组件
            // 'TAntdLayoutTable/base', // 默认table布局组件
            // 'TAntdLayoutForm/base', // 配置化表单组件
            'TAntdDatePicker/base', // 日期范围组件
            'TAntdModal/base' // 弹窗组件
          ]
        },
        {
          title: '详情组件',
          collapsable: false,
          children: [
            'TAntdDetail/base',
            'TAntdDetail/border',
            'TAntdDetail/descColumn',
            'TAntdDetail/layout',
            'TAntdDetail/echo',
            'TAntdDetail/slotName',
            'TAntdDetail/tooltip',
            'TAntdDetail/help',
          ]
        },
        {
          title: '下拉选择组件',
          collapsable: false,
          children: [
            'TAntdSelect/base',
            'TAntdSelect/singlePagination', // 单选分页
            'TAntdSelect/customLabel', // 自定义label
            'TAntdSelect/multiple', // 多选
            'TAntdSelect/multiplePagination', // 多选分页
            'TAntdSelect/help', // 使用帮助(Attributes)
          ]
        },
        {
          title: '查询条件组件',
          collapsable: false,
          children: [
            'TAntdConditional/base',
            'TAntdConditional/isShowOpen', // 不显示收起展开
            'TAntdConditional/isExpansion', // 默认展开
            'TAntdConditional/slot', // 插槽使用
            'TAntdConditional/event', // 第三方组件事件
            'TAntdConditional/labelRender', // tsx自定义label使用
            'TAntdConditional/defaultVal', // 默认值
            'TAntdConditional/linkage', // 联动使用
            'TAntdConditional/TAntdSelectUse', // 结合TSelect使用
            'TAntdConditional/help', // 使用帮助(Attributes)
          ]
        },
        {
          title: '表单组件',
          collapsable: false,
          children: [
            'TAntdForm/base', // 基本模式
            'TAntdForm/labelPosition', // 对齐方式
            'TAntdForm/widthSize', // 每行展示多少项
            'TAntdForm/rules', // 表单验证
            'TAntdForm/eventHandle', // 事件使用
            'TAntdForm/labelRender', // 自定义label
            'TAntdForm/slotName', // 自定义输入框插槽
            'TAntdForm/textShow', // 文本展示
            'TAntdForm/isTrim', // 去除前後空格
            'TAntdForm/comUse', // 自己组件使用
            'TAntdForm/assignment', // 赋值回显
            'TAntdForm/help' // 使用帮助(Attributes)
          ]
        },
        {
          title: '模块表单组件',
          collapsable: false,
          children: [
            'TAntdModuleForm/base', // 基本模式
            'TAntdModuleForm/slotName', // 模块插槽使用
            'TAntdModuleForm/disabled', // 某个模块是否禁用展开
            'TAntdModuleForm/labelPosition', // 模块表单对齐方式
            'TAntdModuleForm/rules', // 模块表单表单验证
            'TAntdModuleForm/validateError', //  模块表单校验错误提示
            'TAntdModuleForm/footer', // 模块表单自定义底部按钮
            'TAntdModuleForm/tabs', //  模块表单显示tabs(注意只显示在最后一个模块)
            'TAntdModuleForm/isGoBackEvent', //  模块表单自定义返回事件（默认返回上一页）
            'TAntdModuleForm/isShowBack', //  模块表单没有返回icon
            'TAntdModuleForm/extra', //  模块表单title右侧插槽使用
            'TAntdModuleForm/titleBtn', // 某个模块Title右侧插槽使用

            'TAntdModuleForm/detail', // 模块详情基本模式
            'TAntdModuleForm/detailspan', // 模块详情每行展示项
            'TAntdModuleForm/tooltip', // 模块详情提示项
            'TAntdModuleForm/detailslot', // 模块详情插槽使用
            'TAntdModuleForm/detailslotName', // 模块详情某个值value插槽使用
            'TAntdModuleForm/detaildisabled', // 某个模块是否禁用展开
            'TAntdModuleForm/detailTitleBtn', // 某个模块Title右侧插槽使用
            'TAntdModuleForm/help' // 使用帮助(Attributes)
          ]
        },
        {
          title: 'TAntdTable组件',
          collapsable: false,
          children: [
            'TAntdTable/base',
            'TAntdTable/columnSet',
            'TAntdTable/columnSlot',
            'TAntdTable/colWidth',
            'TAntdTable/customRender',
            'TAntdTable/operation',
            'TAntdTable/pagination',
            'TAntdTable/rowSelection',
            'TAntdTable/tableSlot',
            'TAntdTable/titleTable',
            'TAntdTable/help'
          ]
        },
      ],
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            'cache-loader',
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: [
                  '@babel/preset-env', // 可以识别es6语法
                  '@vue/babel-preset-jsx' // 解析jsx语法
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsxSuffixTo: [/\.vue$/, /\.md$/]
              }
            }
          ]
        }
      ]
    }
  },
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // ts-loader 的所有配置项
        },
      },
    ],
    // ['@vuepress/plugins-back-to-top', false],
    ['vuepress-plugin-gotop-plus', {
      // mobileShow: false,
      threshold: 150
    }],
    '@vuepress-reco/extract-code'
  ]
}
