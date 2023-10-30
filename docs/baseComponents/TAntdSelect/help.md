# t-antd-select——下拉 组件参数配置

**概述：**

`下拉选择组件————可实现单选多选（多选可使用全选功能）`

**代码示例：**

```html
<t-antd-select
  v-model="selectVlaue"
  :optionSource="listTypeInfo.stepList"
  valueKey="label"
  @change="selectChange"
/>
```

### 配置参数（Attributes）继承 a-select Attributes

| 参数             | 说明                                             | 类型                            | 默认值  |
| :--------------- | :----------------------------------------------- | :------------------------------ | :------ |
| v-model          | 绑定值                                           | boolean / string / number/Array | -       |
| mode             | 设置'multiple''tags'多选 （显示全选）            | String                          | -       |
| optionSource     | 下拉数据源                                       | Array                           | -       |
| width            | select宽度（可以设置百分比或px）                 | String                          | 100%    |
| customLabel      | 是否自定义设置下拉label                          | String                          | -       |
| valueKey         | 传入的 option 数组中，要作为最终选择项的键值 key | String                          | 'key'   |
| labelKey         | 传入的 option 数组中，要作为显示项的键值名称     | String                          | 'label' |
| isShowPagination | 是否显示分页（分页不显示全选框）                 | Boolean                         | false   |
| paginationOption | 分页配置项                                       | Object                          | -       |

### 2-1、paginationOption配置参数（Attributes）继承 a-pagination Attributes

| 参数     | 说明                 | 类型   | 默认值 |
| :------- | :------------------- | :----- | :----- |
| current  | 当前页数             | number | 1      |
| pageSize | 每页显示条目个数     | number | 6      |
| total    | 总条目数             | number | 0      |
| bind     | 继承a-pagination属性 | Object | -      |

### 3、继承 a-select&&a-pagination events

| 事件名         | 说明     | 返回值         |
| :------------- | :------- | :------------- |
| current-change | 当前页码 | 当前选中的页码 |