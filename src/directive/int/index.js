import int from './int'

const install = function(Vue) {
  Vue.directive('int', int)
}

if (window.Vue) {
  window['int'] = int
  Vue.use(install); // eslint-disable-line
}

int.install = install
export default int
