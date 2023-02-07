import Vue from 'vue'
import App from './App.vue'

import "./assets/style/public.scss";
import 'element-ui/lib/theme-chalk/index.css';


import router from "@/router";
import store from './store'

import ElementUI from 'element-ui'
import vueInstall from '@/common/vue-install';

// import { forbidDebugger } from '@/common/utils'

Vue.use(ElementUI) //引入饿了么UI
Vue.config.productionTip = false
Vue.use(vueInstall); // 安装插件

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    // 禁用右键, 防止恶意使用Debug攻击网站
    // forbidDebugger();
  }
}).$mount('#app')
