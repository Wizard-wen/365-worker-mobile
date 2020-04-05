






import Vue from 'vue'
import App from './App'

//全局样式
import './style/index.css'
import './style/styleConfig.scss'




import router from './router/index.js'

import store from './store/index.js'

Vue.config.productionTip = false


import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
/**
 * 以下是路由拦截
 */
import QS from 'qs'
import axios from 'axios'


 //设置ajax根路径
 axios.interceptors.request.use(config => {
  //token加入请求头
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  if(config.method === 'post'){
    config.data = QS.stringify({
      ...config.data,
    })
  }
  return config;

} , error => {
  throw error
});



const Hogwards = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
