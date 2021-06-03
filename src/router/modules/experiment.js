import Layout from '@/layout'

const experimentRouter = {
  path: '/experiment',
  component: Layout,
  redirect: '/experiment/list',
  name: 'Experiment',
  meta: {
    title: 'Experiment',
    icon: 'experiment',
    roles: ['admin', 'active']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/experiment/list'),
      name: 'ExperimentList',
      meta: { title: 'Experiment List', icon: 'list', noCache: true, activeMenu: '/experiment/list' }
    },
    {
      path: 'create',
      component: () => import('@/views/experiment/create'),
      name: 'CreateExperiment',
      meta: { title: 'Create Experiment', icon: 'edit', noCache: true, activeMenu: '/experiment/create', roles: ['admin', 'active'] }
    },
    {
      path: 'mine',
      component: () => import('@/views/experiment/mine/index'),
      name: 'MyExperiment',
      meta: { title: 'My Experiment', icon: 'my-experiment', noCache: true, activeMenu: '/experiment/mine', roles: ['admin', 'active'] },
      children: [
        {
          path: 'created',
          component: () => import('@/views/experiment/mine/created'),
          name: 'Created',
          meta: { title: 'Created', icon: 'created', noCache: true, activeMenu: '/experiment/mine/created' }
        },
        {
          path: 'involved',
          component: () => import('@/views/experiment/mine/involved'),
          name: 'Involved',
          meta: { title: 'Involved', icon: 'involved', noCache: true, activeMenu: '/experiment/mine/involved' }
        }
      ]
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/experiment/edit'),
      name: 'ExperimentEdit',
      meta: { title: 'Experiment Edit', noCache: true },
      hidden: true
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/experiment/detail'),
      name: 'ExperimentDetail',
      meta: { title: 'Experiment Detail', noCache: true },
      hidden: true
    }
  ]
}

export default experimentRouter
