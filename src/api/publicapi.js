import request from "@/utils/request";

/**
 * @description   省市县根据条件查询
 * @author LiMuEn
 * @date 2020-03-24
 * @export
 * @param {Object} params
 * @param {Number} params.parent         父类编码
 * @param {Number} params.code      编码
 */
export function queryByCode(params) {
  return request({
    url: "/api/district/queryByCode",
    method: "get",
    params
  })
}


/**
 * @description   上传图片
 * @author LiMuEn
 * @date 2020-03-24
 * @export
 * @param {Object} data
 */
export function uploadoss(data) {
  return request({
    url: "/api/upload/oss",
    method: "post",
    data
  })
}


/**
 * @description   根据父类ID查询
 * @author LiMuEn
 * @date 2020-03-24
 * @export
 * @param {Object} params
 * @param {Number} params.pid       6:车辆状态
 */
export function CarselectByPid(params) {
  return request({
    url: "/api/dict/selectByPid",
    method: "GET",
    params
  })
}