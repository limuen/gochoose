
import request from '@/utils/request'

/**
 * @description   计费管理分页查询返回总条数
 * @author LiMuEn
 * @date 2020-03-30
 * @export
 * @param {Object} params
 * @param {Number} params.size         每页显示条数
 * @param {Number} params.current      当前页数
 */
export function queryManagerListPage(params) {
    return request({
        url: "/api/chargeSetUp/queryManagerListPage",
        method: "get",
        params
    })
}


/**
 * @description   添加计费
 * @author LiMuEn
 * @date 2020-03-30
 * @export
 * @param {Object} data
 */
export function createCharge(data) {
    return request({
        url: "/api/chargeSetUp/insert",
        method: "post",
        data
    })
}


/**
 * @description   根据主键查询
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */
export function findById(params) {
    return request({
        url: "/api/chargeSetUp/findById",
        method: "GET",
        params
    })
}


/**
 * @description   根据主键查询
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} data
 */
export function update(data) {
    return request({
        url: "/api/chargeSetUp/update",
        method: "PUT",
        data
    })
}


/**
 * @description   根据主键查询
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} data
 */
export function deletecharge(params) {
    return request({
        url: "/api/chargeSetUp/delete",
        method: "DELETE",
        params
    })
}



/**
 * @description   根据主键查询
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 * @param {Number} params.largeAreaId       大区ID
 * @param {Number} params.franchiseeId      	加盟商ID
 */
export function chargeFranchisee(params) {
    return request({
        url: "/api/chargeSetUp/findByLargeFranchisee",
        method: "GET",
        params
    })
}
