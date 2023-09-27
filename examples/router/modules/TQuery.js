/** TQueryCondition组件 路由 **/

import Layout from '@/layout'
/* 定义component */
const Base = () => import('@/views/demo/TQueryCondition')


const TQueryConditionRouter = {
  path: '/t-query-condition',
  component: Layout,
  redirect: '/t-query-condition/base',
  name: '条件查询组件',
  meta: {
    title: '条件查询组件',
    icon: 'swagger'
  },
  children: [
    {
      path: 'base',
      name: '基本使用',
      component: Base,
      meta: { title: '基本使用' }
    }
  ]
}

export default TQueryConditionRouter
