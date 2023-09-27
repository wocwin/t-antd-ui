/** TTable组件 路由 **/

import Layout from '@/layout'
/* 定义component */
const Base = () => import('@/views/demo/TTable/base')
const columnSet = () => import('@/views/demo/TTable/columnSet')
const customRender = () => import('@/views/demo/TTable/customRender')
const operation = () => import('@/views/demo/TTable/operation')
const Pagination = () => import('@/views/demo/TTable/pagination')
const rowSelection = () => import('@/views/demo/TTable/rowSelection')
const SlotName = () => import('@/views/demo/TTable/slotName')
const tableSlot = () => import('@/views/demo/TTable/tableSlot')
const titleTable = () => import('@/views/demo/TTable/titleTable')

const TTableRouter = {
  path: '/t-table',
  component: Layout,
  redirect: '/t-table/base',
  name: 'TTable组件',
  meta: {
    title: 'TTable组件',
    icon: 'table'
  },
  children: [
    {
      path: 'base',
      name: '基本使用',
      component: Base,
      meta: { title: '基本使用' }
    },
    {
      path: 'rowSelection',
      name: '复选框功能',
      component: rowSelection,
      meta: { title: '复选框功能' }
    },
    {
      path: 'columnSet',
      name: '显示隐藏列',
      component: columnSet,
      meta: { title: '显示隐藏列' }
    },
    {
      path: 'operation',
      name: '操作按钮',
      component: operation,
      meta: { title: '操作按钮' }
    },
    {
      path: 'customRender',
      name: '自定义渲染',
      component: customRender,
      meta: { title: '自定义渲染' }
    },
    {
      path: 'pagination',
      name: '分页功能',
      component: Pagination,
      meta: { title: '分页功能' }
    },
    {
      path: 'slot-name',
      name: '插槽渲染',
      component: SlotName,
      meta: { title: '插槽渲染' }
    },
    {
      path: 'tableSlot',
      name: 'Table插槽渲染',
      component: tableSlot,
      meta: { title: 'Table插槽渲染' }
    },
    {
      path: 'titleTable',
      name: 'table标题',
      component: titleTable,
      meta: { title: 'table标题' }
    }
  ]
}

export default TTableRouter
