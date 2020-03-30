
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
        url: "/chargeSetUp/queryManagerListPage",
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
        url: "/chargeSetUp/insert",
        method: "post",
        data
    })
}