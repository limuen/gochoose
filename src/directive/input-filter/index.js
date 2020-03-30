import numberFilter from './filter'

const install = function(Vue) {
  Vue.directive('number', numberFilter)
}

if (window.Vue) {
  window['number'] = numberFilter
  Vue.use(install); // eslint-disable-line
}

numberFilter.install = install
export default numberFilter
