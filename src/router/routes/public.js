export default [
  {
    path:'/page404',
    name:'page404',
    component: ()=>import('@/views/public/page404.vue')
  },
  {
    path:'/noPage',
    name:'noPage',
    component: ()=>import('@/views/public/noPage.vue')
  },
]