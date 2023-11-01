# 日期范围组件

---


<common-code-format>
  <docsComponents-TAntdDatePicker-index slot="source"></docsComponents-TAntdDatePicker-index>
   <<< @/docs/.vuepress/components/docsComponents/TAntdDatePicker/index.vue
</common-code-format>

# TAntdDatePicker——日期范围组件参数配置
---
# 代码示例


```html
  <t-antd-date-picker v-model="selectDay" @change="dateChange($event,'optionalDate')"/>
```
# 配置参数（Attributes）


| 参数           | 说明                                                                                 | 类型                               | 默认值                   |
| :------------- | :----------------------------------------------------------------------------------- | :--------------------------------- | :----------------------- |
| value(v-model) | 组件的值，保持空值可传 [ null, null ]                                                | [Moment, Moment]                   | -                        |
| format         | 设置日期格式，配置参考 [moment.js](http://momentjs.com/)                             | string                             | "YYYY-MM-DD HH:mm:ss"    |
| type           | 日期面板的状态，可选值："day"、"month"。可按天、月选择时间范围。（后续支持季度、年） | string                             | "day"                    |
| showTime       | 增加时间选择功能，配置参考[Antd DatePicker组件文档]                                  | boolean,object                     | false                    |
| allowClear     | 支持清空                                                                             | boolean                            | false                    |
| langest        | 最长范围限制，根据类型自动切换。如'day'、'month'分别限制最长*天与最长*月             | boolean,number                     | false                    |
| inputReadOnly  | 设置输入框为只读                                                                     | boolean                            | false                    |
| placeholder    | 设置输入框placeholder                                                                | Array                              | ['开始时间', '结束时间'] |
| disabledRange  | 限制选择的时间范围                                                                   | [ Moment boolean, Moment boolean ] | 无                       |

# 事件（events）


| 事件名 | 说明               |             回调参数             |
| :----: | :----------------- | :------------------------------: |
| change | 范围发生变化时调用 | Function(date: [Moment, Moment]) |  |



