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
        url: "/api/refundRecord/queryManagerListPage",
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
        url: "/api/order/queryManagerListPage",
        method: "get",
        params
    });
}


/**
 * @description   用户管理订单列表还车位置
 * @author LiMuEn
 * @date 2020-04-18
 */
/**
 * @description   
 * @author LiMuEn
 * @date 2020-04-23
 * @export
 * @param {Object} params
 */

export function returnPosition(params) {
    return request({
        url: "/api/order/returnPosition",
        method: "get",
        params
    });
}



/**
 * @description   用户管理订单列表退款
 * @author LiMuEn
 * @date 2020-04-18
 */
/**
 * @description   
 * @author LiMuEn
 * @date 2020-04-23
 * @export
 * @param {Object} params
 */

export function returnorderRefund(params) {
    return request({
        url: "/api/order/orderRefund",
        method: "get",
        params
    });
}



/**
 * @description   用户管理订单列表行程
 * @author LiMuEn
 * @date 2020-04-18
 */
/**
 * @description   
 * @author LiMuEn
 * @date 2020-04-23
 * @export
 * @param {Object} params
 */

export function orderRoute(params) {
    return request({
        url: "/api/order/orderRoute",
        method: "get",
        params
    });
}
