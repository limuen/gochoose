import request from "@/utils/request";



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
    url: "/api/alliance/queryManagerListPage",
    method: "get",
    params
  });
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
    url: "/api/alliance/insert",
    method: "POST",
    data
  });
}
/**
 * @description   根据主键查询
 * @author LiMuEn
 * @date 2020-03-25
 * @export
 * @param {Object} params
 */
export function selectByAllianceId(params) {
  return request({
    url: "/api/alliance/selectByAllianceId",
    method: "GET",
    params
  });
}

/**
 * @description   修改加盟商
 * @author LiMuEn
 * @date 2020-03-25
 * @export
 * @param {Object} params
 */
export function updatealliance(data) {
  return request({
    url: "/api/alliance/update",
    method: "PUT",
    data
  });
}

/**
 * @description   删除加盟商
 * @author LiMuEn
 * @date 2020-03-24
 * @export
 * @param {Object} params
 */
export function deletealliance(params) {
  return request({
    url: "/api/alliance/deleteById",
    method: "GET",
    params
  });
}
