import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import Int from '@/directive/input-filter'
Vue.use(Int)
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters


Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// 自动化
let Modules = [
  require.context('./components/Amap', true, /\.vue$/),
]
Modules.forEach(el=>{
  el.keys().forEach(fileName => {
    const componentConfig = el(fileName);
    const componentName = fileName.replace(/^\.\//,'').replace(/\.vue$/,'');
    const component = Vue.component(
        componentName.replace(/\//,'-'),
        componentConfig.default || componentConfig
    )
  })
})



// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
