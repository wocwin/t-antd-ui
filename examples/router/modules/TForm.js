/** TForm组件 路由 **/

import Layout from '@/layout'
/* 定义component */
const Base = () => import('@/views/demo/TForm')


const TFormRouter = {
  path: '/t-form',
  component: Layout,
  redirect: '/t-form/base',
  name: 'TForm组件',
  meta: {
    title: 'TForm组件',
    icon: 'row'
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

export default TFormRouter
