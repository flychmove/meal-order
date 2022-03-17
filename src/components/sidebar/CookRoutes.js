export default {
  root: {
    name: '/',
    displayName: 'cookRoutes.home',
  },
  routes: [
    {
      name: 'main',
      displayName: '后厨主页',
      meta: {
        icon: 'vuestic-iconset-statistics',
      },
      disabled: true,
    },
    {
      name: 'tables',
      displayName: '推送公告',
      meta: {
        icon: 'vuestic-iconset-tables',
      },
      disabled: true,
    },
  ]
}
