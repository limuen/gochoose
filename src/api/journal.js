import request from "@/utils/request";

/**
 * @description   加盟商管理分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-22
 * @export
 * @param {Object} params
 * @param {Number} params.size         每页显示条数
 * @param {Number} params.current      当前页数
 */
export function gpsListPage(params) {
    return request({
        url: "/vehicleInformation/queryManagerListPage",
        method: "get",
        params
    });
}


/**
 * @description   加盟商管理分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-22
 * @export
 * @param {Object} params
 * @param {Number} params.size         每页显示条数
 * @param {Number} params.current      当前页数
 */
export function gpsfindById(params) {
    return request({
        url: "/vehicleInformation/findById",
        method: "get",
        params
    });
}