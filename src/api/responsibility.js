import request from "@/utils/request";

/**
 * @description  根据大区ID和加盟商ID获取责任区域
 * @author LiMuEn
 * @date 2020-03-26
 * @export
 * @param {Object} params
 * @param {Number} params.largeAreaId       大区ID
 * @param {Number} params.franchiseeId      加盟商ID	
 */
export function findByLargeFranchisee(params) {
    return request({
        url: "/api/dutyRegion/findByLargeFranchisee",
        method: "get",
        params
    });
}
