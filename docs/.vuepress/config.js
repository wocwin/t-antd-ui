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
            'TAntdSelect/base', // 下拉选择组件
            'TAntdModal/base' // 弹窗组件
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
            // 'TAntdConditional/TAntdRangePicker', // 结合TDatePicker使用
            'TAntdConditional/help', // 使用帮助(Attributes)
          ]
        },
        {
          title: '表单组件',
          collapsable: false,
          children: [
            'TAntdForm/base', // 配置化表单组件
            // 'TForm/base', // 基本模式
            // 'TForm/labelPosition', // 对齐方式
            // 'TForm/widthSize', // 每行展示多少项
            // 'TForm/rules', // 表单验证
            // 'TForm/eventHandle', // 事件使用
            // 'TForm/labelRender', // 自定义label
            // 'TForm/slotName', // 自定义输入框插槽
            // 'TForm/textShow', // 文本展示
            // 'TForm/comUse', // 自己组件使用
            // 'TForm/assignment', // 赋值回显
            // 'TForm/submit', // 切换页面获取表单数据
            // 'TForm/dynamic', // 动态增减表单项
            // 'TForm/help' // 使用帮助(Attributes)
          ]
        },
        {
          title: '模块表单组件',
          collapsable: false,
          children: [
            'TAntdModuleForm/base', // 配置化表单组件
            // 'TModuleForm/base', // 基本模式
            // 'TModuleForm/slotName', // 模块插槽使用
            // 'TModuleForm/disabled', // 某个模块是否禁用展开
            // 'TModuleForm/labelPosition', // 模块表单对齐方式
            // 'TModuleForm/rules', // 模块表单表单验证
            // 'TModuleForm/validateError', //  模块表单校验错误提示
            // 'TModuleForm/footer', // 模块表单自定义底部按钮
            // 'TModuleForm/tabs', //  模块表单显示tabs(注意只显示在最后一个模块)
            // 'TModuleForm/isGoBackEvent', //  模块表单自定义返回事件（默认返回上一页）
            // 'TModuleForm/isShowBack', //  模块表单没有返回icon
            // 'TModuleForm/extra', //  模块表单title右侧插槽使用
            // 'TModuleForm/titleBtn', // 某个模块Title右侧插槽使用

            // 'TModuleForm/detail', // 模块详情基本模式
            // 'TModuleForm/detailspan', // 模块详情每行展示项
            // 'TModuleForm/tooltip', // 模块详情提示项
            // 'TModuleForm/detailslot', // 模块详情插槽使用
            // 'TModuleForm/detailslotName', // 模块详情某个值value插槽使用
            // 'TModuleForm/detaildisabled', // 某个模块是否禁用展开
            // 'TModuleForm/detailTitleBtn', // 某个模块Title右侧插槽使用
            // 'TModuleForm/help' // 使用帮助(Attributes)
          ]
        },
        {
          title: 'TTable组件',
          collapsable: false,
          children: [
            'TAntdTable/base', // 默认table布局组件
            // 'TTable/TAdaptivePage', // 一屏显示
            // 'TTable/base', // 基本
            // 'TTable/pagination', // 分页
            // 'TTable/virtual', // 虚拟列表
            // 'TTable/notSort', // 指定列不需要排序
            // 'TTable/customSort', // 自定义排序
            // 'TTable/mergedCell', // 合并单元格
            // 'TTable/headerGroup', // 表头合并
            // 'TTable/slotNameMerge', // 表头合并插槽显示
            // // 'TTable/headerGroupEditTable', // 表头合并单元格编辑功能
            // 'TTable/renderCol', // render列渲染
            // 'TTable/slotName', // 插槽列渲染
            // 'TTable/filters', // 字典过滤
            // 'TTable/objRenderPorp', // 对象模式渲染
            // 'TTable/renderHeader', // 自定义列标题 label
            // 'TTable/radio', // 单选
            // 'TTable/treeTable',
            // 'TTable/rules', // 单元格编辑--校验
            // 'TTable/singleEditKeyup', // 单元格编辑键盘事件
            // 'TTable/singleEditTable', // 开启单个单元格编辑
            // 'TTable/eventHandle', // 单元格编辑使用第三方组件事件
            // 'TTable/cellEditSave', // 单元格编辑保存单行操作
            // 'TTable/editTable', // 开启整行编辑模式
            // 'TTable/rowSort', // 行拖拽排序
            // 'TTable/checkbox', // 基本复选
            // 'TTable/columnSet', // 显示隐藏列
            // 'TTable/operation', // 操作栏
            // 'TTable/customRender', // customRender操作自定义渲染
            // 'TTable/tree', // TreeTable组件
            // 'TTable/help' // 使用帮助(Attributes)
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
