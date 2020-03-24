import request from "@/utils/request";

/**
 * @description   查询大区下的加盟商（搜索下拉用）
 * @author LiMuEn
 * @date 2020-03-24
 * @export
 * @param {Object} params
 */
export function allianceListByRegionId(params) {
    return request({
      url: "/alliance/allianceListByRegionId",
      method: "get",
      params
    })
  }

/**
 * @description   加盟商管理分页查询返回总条数
 * @author LiMuEn
 * @date 2020-03-24
 * @export
 * @param {Object} params
 * @param {Number} params.size         每页显示条数
 * @param {Number} params.current      当前页数
 * @param {String} params.allianceName  加盟商名称
 * @param {Number} params.regionId  	所属大区id
 */
export function allianceList(params) {
  return request({
    url: "/alliance/queryManagerListPage",
    method: "get",
    params
  })
}


/**
 * @description   添加加盟商
 * @author LiMuEn
 * @date 2020-03-24
 * @export
 * @param {Object} params
 */
export function createalliance(data) {
  return request({
    url: " /alliance/insert",
    method: "POST",
    data
  })
}