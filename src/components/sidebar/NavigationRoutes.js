export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'statistics',
      displayName: '订单管理',
      meta: {
        icon: 'vuestic-iconset-statistics',
      },
      disabled: true,
    },
    {
      name: 'form-wizard',
      displayName: '菜品管理',
      meta: {
        icon: 'vuestic-iconset-forms',
      },
      disabled: true,
    },
    {
      name: 'tables',
      displayName: '推送公告',
      meta: {
        icon: 'vuestic-iconset-tables',
      },
    },
    {
      name: 'pages',
      displayName: '人事管理',
      meta: {
        icon: 'vuestic-iconset-ui-elements',
      },
      disabled: true,
    },
  ],
}
