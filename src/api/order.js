import request from "@/utils/request";

/**
 * @description   用户管理
 * @author LiMuEn
 * @date 2020-03-31
 */
/**
 * @description   用户管理用户管理分页查询返回总条数
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function administrationListPage(params) {
    return request({
        url: "/customer/queryManagerListPage",
        method: "get",
        params
    });
}


// 充值退款
/**
 * @description   余额充值
 * @author LiMuEn
 * @date 2020-04-11
 */
/**
 * @description   用户管理余额充值分页查询返回总条数
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function rechargeListPage(params) {
    return request({
        url: "/rechargeBalance/queryManagerListPage",
        method: "get",
        params
    });
}

//  押金充值
/**
 * @description   押金充值
 * @author LiMuEn
 * @date 2020-04-11
 */
/**
 * @description   用户管理押金充值分页查询返回总条数
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function PledgeListPage(params) {
    return request({
        url: "/rechargePledge/queryManagerListPage",
        method: "get",
        params
    });
}


//  调度费充值
/**
 * @description    调度费充值
 * @author LiMuEn
 * @date 2020-04-11
 */
/**
 * @description   用户管理调度费充值分页查询返回总条数
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function DispatchListPage(params) {
    return request({
        url: "/rechargeDispatch/queryManagerListPage",
        method: "get",
        params
    });
}


//  退款记录
/**
 * @description    退款记录
 * @author LiMuEn
 * @date 2020-04-11
 */
/**
 * @description   用户管理退款记录分页查询返回总条数
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function RefundListPage(params) {
    return request({
        url: "/rechargeRefund/queryManagerListPage",
        method: "get",
        params
    });
}


// 用户管理加入黑名单

/**
 * @description    加入黑名单
 * @author LiMuEn
 * @date 2020-04-11
 */
/**
 * @description   用户管理加入黑名单
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function updateByBlackReason(params) {
    return request({
        url: "/customer/updateByBlackReason",
        method: "get",
        params
    });
}
