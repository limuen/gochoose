import request from '@/utils/request'




/**
 * @description   分页查询操作日志
 * @author LiMuEn
 * @date 2020-05-6
 * @export
 * @param {Object} data
 */
export function findOperateLogPage(data) {
    return request({
      url: '/api/back/oOperateLog/findOperateLogPage',
      method: 'post',
      data
    })
  }