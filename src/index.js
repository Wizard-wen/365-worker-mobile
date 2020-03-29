






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

const Hogwards = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
