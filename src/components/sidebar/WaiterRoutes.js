export default {
  root: {
    name: '/',
    displayName: 'waiterRoutes.home',
  },
  routes: [
    {
      name: 'orderMeal',
      displayName: '点餐',
      meta: {
        icon: 'vuestic-iconset-statistics',
      },
      disabled: true,
    },
    {
      name: 'orderDetail',
      displayName: '订单详情',
      meta: {
        icon: 'vuestic-iconset-forms',
      },
      disabled: true,
    },
    {
      name: 'mealState',
      displayName: '菜品状态',
      meta: {
        icon: 'vuestic-iconset-tables',
      },
      disabled: true,
    },
    {
      name: 'tables',
      displayName: '推送公告',
      meta: {
        icon: 'vuestic-iconset-ui-elements',
      },
      disabled: true,
    },
  ]
}
