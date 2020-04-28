import { login, logout, getInfo, queryUserMenu } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  user_id: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 登陆
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.userName)
        setToken(data.userName)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询个人菜单
  queryUserMenu( { commit, state } ) {
    return new Promise((resolve, reject) => {
      queryUserMenu().then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请重新登录。')
        }
        console.log(data,'queryUserMenu')
        data.ruleName = data.ruleName.split(',')
        const { ruleName, id, userName, avatar  } = data
        // roles must be a non-empty array
        if (!ruleName || ruleName.length <= 0) {
          reject('getInfo: ruleName must be a non-null array!')
        }

        commit('SET_ROLES', ruleName)
        commit('SET_USERID', id)
        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo().then(response => {
  //       const { data } = response
  //       console.log(data,'getInfo')
  //       if (!data) {
  //         reject('验证失败，请重新登录。')
  //       }
  //       // const { roles, name, avatar, introduction } = data
  //       const { roles, user_id, name, avatar, introduction } = data
  //       // roles must be a non-empty array
  //       if (!roles || roles.length <= 0) {
  //         reject('getInfo: roles must be a non-null array!')
  //       }

  //       commit('SET_ROLES', roles)
  //       commit('SET_USERID', user_id)
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       commit('SET_INTRODUCTION', introduction)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // save token
  saveToken({ commit }, token) {
    return new Promise(resolve => {
      commit('SET_TOKEN', token)
      setToken(token)
      resolve()
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
