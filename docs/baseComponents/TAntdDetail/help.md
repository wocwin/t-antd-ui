# TAntdDetail详情组件

---

### 1、代码示例

```html
<t-antd-detail :descData="descData" />
```

### 2、配置参数（Attributes）继承 a-descriptions Attributes

| 参数          | 说明                                               | 类型            | 默认值               |
| :------------ | :------------------------------------------------- | :-------------- | :------------------- |
| descData      | 详情页面数据源                                     | Array           | -                    |
| ----label     | 详情字段说明标题                                   | String          | -                    |
| ----value     | 详情字段返回值                                     | String          | -                    |
| ----fieldName | value 返回值的字段                                 | String          | -                    |
| ----slotName  | 插槽（自定义 value）                               | slot            | -                    |
| ----span      | 占用的列宽，默认占用 1 列，最多 4 列               | Number          | 1                    |
| ----tooltip   | value 值的提示语                                   | String/function | -                    |
| ----iconClass | tooltip 提示语的 icon                              | String          | 'exclamation-circle' |
| ----style     | tooltip 提示语的 icon的样式                        | Object          | -                    |
| ----filters   | 字典类型（即后台返回的是数字类型）过滤转成中文     | Object          | -                    |
| -------list   | 字典 list 定义的数据名即 listTypeInfo 里面对应的值 | String          | -                    |
| -------key    | 下拉数据源的 key 字段                              | String          | 'value'              |
| -------label  | 下拉数据源的 label 字段                            | String          | 'label'              |
| descColumn    | 布局一行显示几列（默认：一行显示 4 列）            | Number          | 4                    |
| dataList      | 开启 filters 时详情接口返回的数据                  | Object          | {}                   |
| listTypeInfo  | 开启 filters 时下拉数据源                          | Object          | {}                   |