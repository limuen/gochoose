import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/managerUser/login',
    method: 'post',
    data
  })
}

/**
 * 
 * 查询个人权限菜单
 */

export function queryUserMenu(token) {
  return request({
    url: '/ruleMenu/queryUserMenu',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
