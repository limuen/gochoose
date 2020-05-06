import request from '@/utils/request'

// 角色列表
export function getRole(roleId) {
  return request({
    url: '/system/role/get-role',
    method: 'get',
    params: { role_id: roleId }
  })
}

// 角色列表
export function getRoleList(params) {
  return request({
    url: '/api/rule/queryManagerListPage',
    method: 'get',
    params: params
  })
}

// 新增角色
export function createRole(data) {
  return request({
    url: '/api/rule/insert',
    method: 'post',
    data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/api/rule/update',
    method: 'PUT',
    data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: '/api/rule/deletes',
    method: 'DELETE',
    data
  })
}

// 更新角色可用状态
export function updateRoleEnable(data) {
  return request({
    url: '/api/system/role/update-role-enable',
    method: 'post',
    data
  })
}
