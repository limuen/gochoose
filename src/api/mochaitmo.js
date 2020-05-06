import request from "@/utils/request";

/**
 * @description   获取列表
 * @author LiMuEn
 * @date 2020-03-27
 * @export
 * @param {Object} params
 */
export function queryManagerListPage(params) {
    return request({
        url: "/api/operation/queryManagerListPage",
        method: "get",
        params
    });
}

/**
 * @description   新增运维管理
 * @author LiMuEn
 * @date 2020-03-27
 * @export
 * @param {Object} data
 */
export function createmochaitmo(data) {
    return request({
        url: "/api/operation/insert",
        method: "POST",
        data
    });
}




/**
 * @description   查询所有运维员角色
 * @author LiMuEn
 * @date 2020-03-27
 * @export
 * @param {Object} params
 */
export function allRole(params) {
    return request({
        url: "/api/role/allRole",
        method: "get",
        params
    });
}


/**
 * @description   根据主键查询
 * @author LiMuEn
 * @date 2020-03-27
 * @export
 * @param {Object} params
 */
export function selectByOperationId(params) {
    return request({
        url: "/api/operation/selectByOperationId",
        method: "get",
        params
    });
}


/**
 * @description   根据主键查询
 * @author LiMuEn
 * @date 2020-03-27
 * @export
 * @param {Object} data
 */
export function updatemochaitmo(data) {
    return request({
        url: "/api/operation/update",
        method: "PUT",
        data
    });
}


/**
 * @description   根据主键查询
 * @author LiMuEn
 * @date 2020-03-27
 * @export
 * @param {Object} params
 */
export function deleteById(params) {
    return request({
        url: "/api/operation/deleteById",
        method: "GET",
        params
    });
}


/**
 * @description   根据主键查询
 * @author LiMuEn
 * @date 2020-03-27
 * @export
 * @param {Object} params
 */

export function staffqueryManagerListPage(params) {
    return request({
        url: "/api/managerUser/queryManagerListPage",
        method: "GET",
        params
    });
}