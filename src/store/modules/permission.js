import { errorRoutes, constantRoutes, asyncRoutes} from '@/router'
import Layout from '@/layout'
/**
 * 遍历后台传来的路由字符串，转换为组件对象
 * @param asyncRouter
 */

export function filterAsyncRoutes(asyncRouter) {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRoutes = []
  asyncRouter.forEach(router => {
    router = {
      path: router.path,
      name: router.name,
      redirect: router.redirect,
      component: router.component ? router.component : router.path,
      alwaysShow: router.alwaysShow,
      meta: router.meta,
      hidden: router.hidden,
      children: router.children
    }
    if (router.component) {
      if (router.component === 'Layout') {
        // Layout组件特殊处理
        router.component = Layout
      } else { 
        const component = router.component
        console.log(component,'component')
        router.component = () => import(`@/views${component}`)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRoutes(router.children)
    }
    accessedRoutes.push(router)
  })
  return accessedRoutes
}




/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

const state = {
  routes: [],
  buttons: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTERS: (state, routes) => {
    state.addRoutes = routes
    // 动态路由
    state.routes = constantRoutes.concat(routes)
    // 本地路由
    // state.routes = constantRoutes
  },
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons
  }
}


/**
 * @param routers
 * @param buttons
 */

const actions = {
  generateRoutes({ commit }, { routers, buttons }) {
    return new Promise(resolve => {
      // console.log(routers)
      // 动态路由
      const accessedRoutes = filterAsyncRoutes(routers).concat(errorRoutes)
      // 静态路由
      // const accessedRoutes = constantRoutes
      commit('SET_ROUTERS', accessedRoutes)
      commit('SET_BUTTONS', buttons)
      resolve(accessedRoutes)
    })
  }
}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}
