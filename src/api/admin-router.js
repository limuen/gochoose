import request from '@/utils/request'

/**
 * @description   查询tree
 * @author LiMuEn
 * @date 2020-3-19
 * @returns
 */
export function getAdminRouterTree(params) {
  return request({
    url: '/api/ruleMenu/authorizeQuery',
    method: 'get',
    params
  })
}


/**
 * @description   修改tree
 * @author LiMuEn
 * @date 2020-3-19
 * @returns
 */
export function authorization(data) {
  return request({
    url: '/api/ruleMenu/authorization',
    method: 'post',
    data
  })
}
export function updateAdminRouter(data) {
  return request({
    url: '/system/router/update-router',
    method: 'post',
    data
  })
}

export function deleteAdminRouter(data) {
  return request({
    url: '/system/router/delete-router',
    method: 'post',
    data
  })
}

export function getAdminRouter(id) {
  return request({
    url: '/system/router/get-admin-router',
    method: 'get',
    params: { id: id }
  })
}

export function updateAdminRouterSort(data) {
  return request({
    url: '/system/router/update-router-sort',
    method: 'post',
    data
  })
}
