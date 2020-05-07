import request from '@/utils/request'

/**
 * @description   电池管理更换记录分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} params
 */
export function batteryListPage(params) {
    return request({
        url: "/api/batteryChange/queryManagerListPage",
        method: "get",
        params
    })
}

/**
 * @description   电池管理更换记录分页查询返回总条数
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} params
 */
export function batteryPage(params) {
    return request({
        url: "/api/battery/queryManagerListPage",
        method: "get",
        params
    })
}

/**
 * @description   电池管理更换记录新增
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function batteryinsert(data) {
    return request({
        url: "/api/battery/insert",
        method: "post",
        data
    })
}

/**
 * @description   车辆管理
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} params
 */
export function carListPage(params) {
    return request({
        url: "/api/electrombile/queryManagerListPage",
        method: "GET",
        params
    })
}


/**
 * @description   车辆管理新增
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function carInsert(data) {
    return request({
        url: "/api/electrombile/insert",
        method: "post",
        data
    })
}

/**
 * @description   车辆管理批量新增
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function batchcarInsert(data) {
    return request({
        url: "/api/electrombile/importInsert",
        method: "post",
        data
    })
}



/**
 * @description   车辆管理通过id查询
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} params
 */
export function carByelectrombileId(params) {
    return request({
        url: "/api/electrombile/selectByelectrombileId",
        method: "GET",
        params
    })
}



/**
 * @description   车辆管理修改
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function carUpdate(data) {
    return request({
        url: "/api/electrombile/update",
        method: "PUT",
        data
    })
}



// 定位

/**
 * @description   车辆管理定位
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function electrombileLocation(params) {
    return request({
        url: "/api/electrombile/electrombileLocation",
        method: "GET",
        params
    })
}

//车辆所有定位

/**
 * @description   车辆管理定位
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function allElectrombileLocation(params) {
    return request({
        url: "/api/electrombile/allElectrombileLocation",
        method: "GET",
        params
    })
}

/**
 * @description   车辆管理批量添加
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function importElectrombile(data) {
    return request({
        url: "/api/electrombile/importElectrombile",
        method: "POST",
        data
    })
}


/**
 * @description   车辆管理生成二维码
 * @author LiMuEn
 * @date 2020-04-08
 * @export
 * @param {Object} data
 */
export function createQrCode(params) {
    return request({
        url: "/api/electrombile/createQrCode",
        method: "GET",
        params
    })
}



/**
 * @description   开锁锁车
 * @author LiMuEn
 * @date 2020-05-06
 * @export
 * @param {Object} data
 */
export function execute(data) {
    return request({
        url: "http://47.104.78.109:8081/command/manager/execute",
        method: "POST",
        data
    })
}


/**
 * @description   车辆编号生成二维码
 * @author LiMuEn
 * @date 2020-05-06
 * @export
 * @param {Object} params
 */
export function QrCodeByNumber(params) {
    return request({
        url: "/api/electrombile/QrCodeByNumber",
        method: "GET",
        params
    })
}


/**
 * @description   车辆编号生成二维码
 * @author LiMuEn
 * @date 2020-05-06
 * @export
 * @param {Object} params
 */
export function electrombileNumberVerify(params) {
    return request({
        url: "/api/electrombile/electrombileNumberVerify",
        method: "GET",
        params
    })
}


/**
 * @description   车辆轨迹
 * @author LiMuEn
 * @date 2020-05-07
 * @export
 * @param {Object} params
 */
export function electrombileTrack(params) {
    return request({
        url: "/api/electrombile/electrombileTrack",
        method: "GET",
        params
    })
}