const url = process.env.VUE_APP_BASE_API_WB;
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
    // url: `${url}/back/oOperateLog/findOperateLogPage`,
    url: "http://106.13.231.96:8066/api/back/oOperateLog/findOperateLogPage",
    method: "post",
    data
  });
}
