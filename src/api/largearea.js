import request from "@/utils/request";

/**
 * @description   大区管理分页查询返回总条数
 * @author LiMuEn
 * @date 2020-03-23
 * @export
 * @param {Object} params
 * @param {Number} params.size         每页显示条数
 * @param {Number} params.current      当前页数
 */
export function getlargeareaList(params) {
  return request({
    url: "/region/queryManagerListPage",
    method: "get",
    params
  })
}

/**
 * @description   添加大区管理
 * @author LiMuEn
 * @date 2020-03-23
 * @export
 * @param {Object} data
 * @param {String} data.regionName        大区名称
 * @param {String} data.regionCharge      大区负责人名称
 * @param {String} data.chargePhone       负责人电话
 * @param {String} data.regionAddress     联系地址
 * @param {String} data.regionPassword    密码
 */
export function createlargearea(data) {
  return request({
    url: "/region/insert",
    method: "POST",
    data
  })
}

/**
 * @description   添加大区管理
 * @author LiMuEn
 * @date 2020-03-23
 * @export
 * @param {Object} data
 * @param {String} data.regionName        大区名称
 * @param {String} data.regionCharge      大区负责人名称
 * @param {String} data.chargePhone       负责人电话
 * @param {String} data.regionAddress     联系地址
 * @param {String} data.regionPassword    密码
 */
export function updatelargearea(data) {
  return request({
    url: "/region/update",
    method: "PUT",
    data
  })
}



/**
 * @description   添加大区管理
 * @author LiMuEn
 * @date 2020-03-23
 * @export
 * @param {Object} params
 */
export function selectByRegionId(params) {
  return request({
    url: "/region/selectByRegionId",
    method: "GET",
    params
  })
}


