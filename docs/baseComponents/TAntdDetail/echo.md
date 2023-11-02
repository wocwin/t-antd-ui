# 字典回显

---

<common-code-format>
  <docsComponents-TAntdDetail-echo slot="source"></docsComponents-TAntdDetail-echo>
在组件中需配置：

`descColumn`：布局一行显示几列（默认：一行显示 4 列）

`descData` 显示数据源<br/>

若需要配置`filters`（下拉选择转中文）<br/>
`descData`每项中配置`filters`有三个参数

```js
filters: {
      list: 'stockTakeTypeList', // listTypeInfo里面对应的值
      key: 'id', // key  数据源的key字段（默认：value）
      label: 'label' // 数据源的label字段（默认：label）
    }
```

还需要配置`listTypeInfo`下拉数据源；类型 Object<br/>

`dataList`后台返回的详情接口数据

<<< @/docs/.vuepress/components/docsComponents/TAntdDetail/echo.vue
</common-code-format>

