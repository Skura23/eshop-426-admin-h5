// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission' // permission control


// 设置 js中可以访问 $cdn
import {
  $cdn
} from '@/config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
// import '@/plugins/vant'
// 全部引入
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 按需引入elementui
// import {
//   Button,
//   Select,
//   Timeline,
//   TimelineItem,
// } from 'element-ui';
// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// Vue.use(Timeline);
// Vue.use(TimelineItem);
// 全局引入 elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'

// 引入全局样式
import '@/assets/css/index.scss'
import '@/assets/css/utils.scss'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})