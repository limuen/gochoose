import request from "@/utils/request";

/**
 * @description   获取列表
 * @author LiMuEn
 * @date 2020-03-26
 * @export
 * @param {Object} params
 */
export function queryManagerListPage(params) {
    return request({
        url: "/operation/queryManagerListPage",
        method: "get",
        params
    });
}