import request from "@/utils/request";

/**
 * @description   查询所有大区（搜索下拉用）
 * @author LiMuEn
 * @date 2020-03-25
 * @export
 * @param {Object} params
 */
export function allRegion(params) {
    return request({
        url: "/region/allRegion",
        method: "get",
        params
    })
}

/**
 * @description   查询大区下的加盟商（搜索下拉用）
 * @author LiMuEn
 * @date 2020-03-25
 * @export
 * @param {Object} params
 */
export function allianceListByRegionId(params) {
    return request({
        url: "/alliance/allianceListByRegionId",
        method: "get",
        params
    });
}


/**
 * @description   获取列表
 * @author LiMuEn
 * @date 2020-03-25
 * @export
 * @param {Object} params
 */
export function queryManagerListPage(params) {
    return request({
        url: "/areaManage/queryManagerListPage",
        method: "get",
        params
    });
}

/**
 * @description   新增
 * @author LiMuEn
 * @date 2020-03-25
 * @export
 * @param {Object} params
 */
export function createarea(data) {
    return request({
        url: "/areaManage/insert",
        method: "POST",
        data
    });
}

