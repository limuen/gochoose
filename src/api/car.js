import request from '@/utils/request'

/**
 * @description   电池管理更换记录分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} params
 */
export function batteryListPage(params) {
    return request({
        url: "/batteryChange/queryManagerListPage",
        method: "get",
        params
    })
}

/**
 * @description   电池管理更换记录分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} params
 */
export function batteryPage(params) {
    return request({
        url: "/battery/queryManagerListPage",
        method: "get",
        params
    })
}

/**
 * @description   电池管理更换记录新增
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function batteryinsert(data) {
    return request({
        url: "/battery/insert",
        method: "post",
        data
    })
}

// 电池管理

/**
 * @description   车辆管理
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function carListPage(data) {
    return request({
        url: "/electrombile/queryManagerListPage",
        method: "post",
        data
    })
}