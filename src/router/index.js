import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const routeFiles = require.context('./routes', false, /\.js$/);
const constRoutes = routeFiles.keys().reduce((routes, routePath) => {
  const route = routeFiles(routePath).default;
  let temp = [...routes]
  temp.push(...route)
  return temp
},[])

const router = new Router({
    routes: constRoutes
})

router.beforeEach((to, from, next) => {
  console.log('routerr====>', to, from, next())
  if(to.fullPath === '/') {
    next({name: 'index'})
  } else {
    if(!to.name) {
      next({name: 'noPage'})
    } else {
      next()
    }
  }
})
export default router