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
      meta: { title: 'Experiment List', icon: 'list', activeMenu: '/experiment/list' }
    },
    {
      path: 'create',
      component: () => import('@/views/experiment/create'),
      name: 'CreateExperiment',
      meta: { title: 'Create Experiment', icon: 'edit', activeMenu: '/experiment/create', roles: ['admin', 'active'] }
    },
    {
      path: 'mine',
      component: () => import('@/views/experiment/mine/index'),
      name: 'MyExperiment',
      meta: { title: 'My Experiment', icon: 'my-experiment', activeMenu: '/experiment/mine', roles: ['admin', 'active'] },
      children: [
        {
          path: 'created',
          component: () => import('@/views/experiment/mine/created'),
          name: 'Created',
          meta: { title: 'Created', icon: 'created', activeMenu: '/experiment/mine/created' }
        },
        {
          path: 'involved',
          component: () => import('@/views/experiment/mine/involved'),
          name: 'Involved',
          meta: { title: 'Involved', icon: 'involved', activeMenu: '/experiment/mine/involved' }
        }
      ]
    },
    {
      path: 'edit/:experimentId',
      component: () => import('@/views/experiment/edit'),
      name: 'ExperimentEdit',
      meta: { title: 'Experiment Edit' },
      hidden: true
    },
    {
      path: 'detail/:experimentId',
      component: () => import('@/views/experiment/detail'),
      name: 'ExperimentDetail',
      meta: { title: 'Experiment Detail' },
      hidden: true
    },
    {
      path: 'config/:experimentId',
      component: () => import('@/views/experiment/config'),
      name: 'ChartConfig',
      meta: { title: 'Chart Config' },
      hidden: true
    },
    {
      path: 'chart/:experimentId',
      component: () => import('@/views/experiment/config'),
      name: 'Chart',
      meta: { title: 'Chart' },
      hidden: true
    }
  ]
}

export default experimentRouter
