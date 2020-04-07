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
        url: "/activityDiscount/queryManagerListPage",
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
        url: "/activityDiscount/insert",
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
        url: "/activityDiscount/findById",
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
        url: "/activityDiscount/update",
        method: "PUT",
        data
    })
}

