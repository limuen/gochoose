import request from "@/utils/request";

/**
 * @description   用户管理订单记录
 * @author LiMuEn
 * @date 2020-03-31
 */
/**
 * @description   用户管理订单记录退款记录分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-13
 * @export
 * @param {Object} params
 */

export function freesheetListPage(params) {
    return request({
        url: "/refundRecord/queryManagerListPage",
        method: "get",
        params
    });
}


/**
 * @description   用户管理订单记录
 * @author LiMuEn
 * @date 2020-04-18
 */
/**
 * @description   用户管理订单记录订单列表分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-13
 * @export
 * @param {Object} params
 */

export function orderListPage(params) {
    return request({
        url: "/order/queryManagerListPage",
        method: "get",
        params
    });
}