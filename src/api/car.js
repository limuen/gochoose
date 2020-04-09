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

/**
 * @description   车辆管理
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} params
 */
export function carListPage(params) {
    return request({
        url: "/electrombile/queryManagerListPage",
        method: "GET",
        params
    })
}


/**
 * @description   车辆管理新增
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function carInsert(data) {
    return request({
        url: "/electrombile/insert",
        method: "post",
        data
    })
}


/**
 * @description   车辆管理通过id查询
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} params
 */
export function carByelectrombileId(params) {
    return request({
        url: "/electrombile/selectByelectrombileId",
        method: "GET",
        params
    })
}



/**
 * @description   车辆管理修改
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function carUpdate(data) {
    return request({
        url: "/electrombile/update",
        method: "PUT",
        data
    })
}





