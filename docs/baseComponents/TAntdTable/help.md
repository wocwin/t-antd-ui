# TAntdTable组件参数配置

---


### 1、代码示例

```html
      <t-antd-table
        title="样品列表"
        :pagination="pagination"
        @paginationChange="handleTableChange"
        @showSizeChange="showSizeChange"
        :columns="columns"
        :dataSource="sourceData"
        :tableOpt="{rowSelection: {selectedRowKeys: selectedRowKeys, onChange: onSelectChange}}"
     />
```

### 2、配置参数（Attributes）

| 参数          | 说明                                                                                              | 类型        | 默认值 |
| ------------- | :------------------------------------------------------------------------------------------------ | :---------- | -----: |
| title         | 左上侧标题                                                                                        | string,slot |     无 |
| btn           | 右上侧按钮组插槽                                                                                  | slot        |     无 |
| columns       | table 列描述，详细见下方配置说明。                                                                | array       |     无 |
| dataSource    | table 数据源                                                                                      | array       |     无 |
| tableOpt      | antd table 配置                                                                                   | {}          |     无 |
| pagination    | 分页器配置{current: number, pageSize: number, total: number,paginationOpt:{antd pagination 配置}} | object      |     无 |
| table         | 报表内容插槽，当使用该插槽时，默认 table 将不渲染                                                 | slot        |     无 |
| columnSetting | 是否显示设置（隐藏/显示列）                                                                       | Boolean     |  false |
| name          | 组件唯一标记，类似 Key 值，用于缓存表头数据                                                       | String      |     无 |

### 3、columns 配置参数（columns Attributes）

| 参数         | 说明                       | 类型                         |            默认值 |
| ------------ | :------------------------- | :--------------------------- | ----------------: |
| title        | 列头显示文字               | string                       |                无 |
| dataIndex    | 列数据在数据项中对应的 key | string                       |                无 |
| width        | 列宽度                     | number                       |                无 |
| scopedSlots  | 某列插槽显示               | {customRender：'自定义插槽'} | 当前 dataIndex 值 |
| customRender | 自定义渲染                 | {comps: comp[]}              |                无 |

### 4、comp 配置参数（customRender Attributes）

| 参数   | 说明                                                                      | 类型                                           | 默认值 |
| ------ | :------------------------------------------------------------------------ | :--------------------------------------------- | -----: |
| isShow | 组件渲染条件，返回 true 渲染，反之不渲染                                  | (scope) => {return true}                       |     无 |
| comp   | 组件名称，可直接指定 antd 或其他全局注册的组件如：'a-input'               | string ,component                              |     无 |
| text   | 渲染时组件设置组件文本                                                    | string                                         |     无 |
| bind   | 渲染时组件会调用 v-text 指定设置该配置更新元素的属性                      | object                                         |     无 |
| event  | 设置组件监听的事件，渲染时组件会调用 v-event 指定设置该配置更新元素的事件 | (scope) => ({[propName: eventName]: () => {}}) |     无 |
| slot   | 指定插入的插槽                                                            | string                                         |     无 |
| child  | 支持子组件配置，参数与上方一致                                            | array                                          |     无 |

### 5、pagination 配置参数（pagination Attributes）

| 参数          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | -----: |
| current       | 分页器当前页                     | number |      1 |
| total         | 数据量总数，用于计算分页器总页数 | number |      0 |
| pageSize      | 每一页的数据量                   | number |     10 |
| paginationOpt | antd pagination 属性配置         | object |     无 |

### 6、事件（events）

|      事件名      | 说明                           | 回调参数                                  |
| :--------------: | :----------------------------- | :---------------------------------------- |
| paginationChange | 分页器页码发生变化时触发       | Function(current: number)                 |
|  showSizeChange  | 分页器选择每页显示总条数时触发 | Function(current: number,pageSize:number) |
