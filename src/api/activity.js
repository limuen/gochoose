import request from '@/utils/request'

/**
 * @description   活动管理骑行打折分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} params
 * @param {Number} params.size         每页显示条数
 * @param {Number} params.current      当前页数
 */
export function queryManagerListPage(params) {
    return request({
        url: "/api/activityDiscount/queryManagerListPage",
        method: "get",
        params
    })
}

/**
 * @description   活动管理骑行打折分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function insert(data) {
    return request({
        url: "/api/activityDiscount/insert",
        method: "POST",
        data
    })
}

/**
 * @description   活动管理骑行打折分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} params
 */
export function findById(params) {
    return request({
        url: "/api/activityDiscount/findById",
        method: "get",
        params
    })
}


/**
 * @description   活动管理骑行打折分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function updateActivity(data) {
    return request({
        url: "/api/activityDiscount/update",
        method: "PUT",
        data
    })
}


/**
 * @description   活动管理骑行打折分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} params
 */
export function updateByStatus(params) {
    return request({
        url: "/api/activityDiscount/updateByStatus",
        method: "GET",
        params
    })
}


/**
 * @description   活动管理新用户券分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} params
 */
export function NewListPage(params) {
    return request({
        url: "/api/activityNew/queryManagerListPage",
        method: "GET",
        params
    })
}


/**
 * @description   活动管理新用户新增
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function Newinsert(data) {
    return request({
        url: "/api/activityNew/insert",
        method: "POST",
        data
    })
}

/**
 * @description   活动管理新用户根据主键查询
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} params
 */
export function NewfindById(params) {
    return request({
        url: "/api/activityNew/findById",
        method: "GET",
        params
    })
}


/**
 * @description   活动管理新用户根据主键查询
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function Newupdate(data) {
    return request({
        url: "/api/activityNew/update",
        method: "PUT",
        data
    })
}


/**
 * @description   活动管理新用户根据主键修改状态
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function NewupdateByStatus(params) {
    return request({
        url: "/api/activityNew/updateByStatus",
        method: "GET",
        params
    })
}


// 活动管理分享设置

/**
 * @description   活动管理分享分页获取数据
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function ShareListPage(params) {
    return request({
        url: "/api/activityShare/queryManagerListPage",
        method: "GET",
        params
    })
}



/**
 * @description   活动管理新分享主键修改状态
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function ShareByStatus(params) {
    return request({
        url: "/api/activityShare/updateByStatus",
        method: "GET",
        params
    })
}



/**
 * @description   活动管理新分享主键修改状态
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function insertShare(data) {
    return request({
        url: "/api/activityShare/insert",
        method: "POST",
        data
    })
}

/**
 * @description   活动管理新分享根据主键查询
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function SharefindById(params) {
    return request({
        url: "/api/activityShare/findById",
        method: "GET",
        params
    })
}



/**
 * @description   活动管理新分享根据主键查询
 * @author LiMuEn
 * @date 2020-04-7
 * @export
 * @param {Object} data
 */
export function Shareupdate(data) {
    return request({
        url: "/api/activityShare/update",
        method: "PUT",
        data
    })
}