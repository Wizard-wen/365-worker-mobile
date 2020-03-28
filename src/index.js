
import Vue from 'vue'
import App from './App'

//全局样式
import '../common/style/index.css'
import '../common/style/styleConfig.scss'



import router from '../common/router/index.js'

import store from '../common/store/index.js'

//全局引入组件
import {
    HogFooter,
    HogHeader,
    HogPage
} from '../common/components'

Vue.config.productionTip = false

//全局引入组件
Vue.component('HogFooter',HogFooter)
Vue.component('HogHeader',HogHeader)
Vue.component('HogPage',HogPage)

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
