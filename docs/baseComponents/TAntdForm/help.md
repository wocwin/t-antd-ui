# TAntdForm 参数配置

### 1. 基于 Ant-Design-Vue FormModel 表单组件的二次封装，着重于数据层面，HTML 一行代码

TAntdForm 表单组件
**代码示例：**

```html
<t-antd-form
  :ref-obj.sync="formOpts.ref"
  :formOpts="formOpts"
  :widthSize="1"
  :labelCol="{ span:2}"
  :wrapperCol="{ span:22}"
  @handleEvent="handleEvent"
/>
//注意:ref-obj(form校验规则相当于ref)必须要‘.sync’修饰符
```
### 2. 配置参数继承FormModel的所有属性

| 参数                | 说明                                                                                                  | 类型         | 默认值       |
| :------------------ | :---------------------------------------------------------------------------------------------------- | :----------- | :----------- |
| refObj              | form 表单校验规则方法 （可以参考 antd FormModel 表单方法中的 validate）                               | obj          | -            |
| className           | 自定义类名                                                                                            | String       | -            |
| layout              | 改变表单项 label 与输入框的布局方式(默认：horizontal) /vertical                                       | String       | 'horizontal' |
| widthSize           | 每行显示几个输入项（默认两项） 最大值 4                                                               | Number       | 2            |
| isTrim              | 全局是否开启清除前后空格(comp 为 a-input 且 type 不等于'password')                                    | Boolean      | true         |
| formOpts            | 表单配置项                                                                                            | Object       | {}           |
| ---listTypeInfo     | 下拉选择数据源（type:'select'有效）                                                                   | Object       | {}           |
| ---fieldList        | form 表单每项 list                                                                                    | Array        | []           |
| ------isHideItem    | 某一项不显示                                                                                          | Boolean      | false        |
| ------slotName      | 自定义表单某一项输入框                                                                                | slot         | -            |
| ------childSlotName | 自定义表单某一下拉选择项子组件插槽（a-select-option）                                                 | slot         | -            |
| ------comp          | form 表单每一项组件是输入框还是下拉选择等（可使用第三方 UI 如 a-select/a-input 也可以使用自定义组件） | String       | -            |
| ------formItemBind  | 表单每一项属性（继承FormModelItem的 Attributes）                                                      | Object       | {}           |
| ------bind          | 表单每一项属性（继承第三方 UI 的 Attributes，如 a-input 中的 allowClear 清空功能）默认清空及下拉过滤  | Object       | {}           |
| ------isTrim        | 是否不清除前后空格(comp 为 a-input 且 type 不等于'password')                                          | Boolean      | false        |
| ------type          | form 表单每一项类型                                                                                   | String       | -            |
| ------widthSize     | form 表单某一项所占比例(如果占一整行则设置 1)                                                         | Number       | 2            |
| ------width         | form 表单某一项所占实际宽度                                                                           | String       | 100%         |
| ------arrLabel      | type=select-arr 时，每个下拉显示的中文                                                                | String       | 'label'      |
| ------arrKey        | type=select-arr 时，每个下拉显示的中文传后台的数字                                                    | String       | 'value'      |
| ------label         | form 表单每一项 title                                                                                 | String       | -            |
| ------labelRender   | 自定义某一项 title                                                                                    | function     | -            |
| ------value         | form 表单每一项传给后台的参数                                                                         | String       | -            |
| ------rules         | 每一项输入框的表单校验规则                                                                            | Object/Array | -            |
| ------list          | 下拉选择数据源（仅仅对 type:'select'有效）                                                            | String       | -            |
| ------event         | 表单每一项事件标志（handleEvent 事件）                                                                | String       | -            |
| ------eventHandle   | 继承 comp 组件的事件（返回两个参数，第一个自己自带，第二个 formOpts）                                 | Object       | -            |
| ------isSelfCom     | 是否使用自己封装的组件（TAntdSelect等---含有下拉框）                                                  | Boolean      | false        |
| ---formData         | 表单提交数据(对应 fieldList 每一项的 value 值)                                                        | Object       | -            |
| ---labelCol         | label 宽度（{ span:2}）                                                                               | Object       | {span:2}     |
| ---wrapperCol       | 输入框 宽度                                                                                           | Object       | {span:22}    |
| ---rules            | 规则（可依据 AntdUI FormModel 配置————对应 formData 的值）                                            | Object/Array | -            |
| ---operatorList     | 操作按钮 list                                                                                         | Array        | -            |

### 3. events继承FormModel的所有事件

| 事件名      | 说明                 | 返回值                                                   |
| :---------- | :------------------- | :------------------------------------------------------- |
| handleEvent | 单个查询条件触发事件 | fieldList 中 type/查询条件输入的值/fieldList 中 event 值 |

### 4. Methods

| 事件名        | 说明     | 参数 |
| :------------ | :------- | :--- |
| resetFields   | 重置表单 | -    |
| clearValidate | 清空校验 | -    |


### 5. 关于 Ant-Design-Vue FormModel/FormModelItem 提供的一些属性可直接使用，无需其他配置
