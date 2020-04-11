import request from "@/utils/request";

/**
 * @description   区域配置
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
