export default [
  {
    path:'/index',
    name:'index',
    component: ()=>import('@/views/main/index.vue')
  },
  {
      path:'/view',
      name:'view',
      component: ()=>import('@/views/view.vue')
  }
]