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


/**
 * @description   运营区域新增
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} data
 */

export function createRegional(data) {
    return request({
        url: "/operateRegion/insert",
        method: "POST",
        data
    });
}

/**
 * @description   运营区域新增
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function findById(params) {
    return request({
        url: "/operateRegion/findById",
        method: "GET",
        params
    });
}

/**
 * @description   运营区域修改
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} data
 */

export function updateRegion(data) {
    return request({
        url: "/operateRegion/update",
        method: "PUT",
        data
    });
}


/**
 * @description   获取已有运营区域
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function findPositionModelList(params) {
    return request({
        url: "/operateRegion/findPositionModelList",
        method: "GET",
        params
    });
}