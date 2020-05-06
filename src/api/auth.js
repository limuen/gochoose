import request from '@/utils/request'

export function getAuthList(params) {
  return request({
    url: '/api/system/auth-list',
    method: 'get',
    params
  })
}
