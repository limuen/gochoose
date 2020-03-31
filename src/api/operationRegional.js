import request from "@/utils/request";

/**
 * @description   区域配置
 * @author LiMuEn
 * @date 2020-03-31
 */
/**
 * @description   运营区域分页查询返回总条数
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function OpearteListPage(params) {
    return request({
        url: "/operateRegion/queryManagerListPage",
        method: "get",
        params
    });
}