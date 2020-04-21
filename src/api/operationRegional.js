import request from '@/utils/request'

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
    url: '/operateRegion/queryManagerListPage',
    method: 'get',
    params
  })
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
    url: '/operateRegion/insert',
    method: 'POST',
    data
  })
}

/**
 * @description   运营区域查询
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function findById(params) {
  return request({
    url: '/operateRegion/findById',
    method: 'GET',
    params
  })
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
    url: '/operateRegion/update',
    method: 'PUT',
    data
  })
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
    url: '/operateRegion/findPositionModelList',
    method: 'GET',
    params
  })
}
/**
 * @description   根据大区ID和加盟商ID获取运营区域(该接口没有地图参数)
 * @author LiMuEn
 * @date 2020-03-31
 * @export
 * @param {Object} params
 */

export function operateRegionfindByLargeFranchisee(params) {
  return request({
    url: '/operateRegion/findByLargeFranchisee',
    method: 'GET',
    params
  })
}
/**
 * @description   责任区域分页查询
 * @author shengxianghui
 * @date 2020-04-10
 * @export
 * @param {Object} params
 */

export function dutyParkQueryManagerListPage(params) {
  return request({
    url: '/dutyRegion/dutyParkQueryManagerListPage',
    method: 'GET',
    params
  })
}

/**
 * @description   责任区域新增
 * @author shengxianghui
 * @date 2020-04-10
 * @export
 * @param {Object} data
 */

export function dutyParkInsert(data) {
  return request({
    url: '/dutyRegion/dutyParkInsert',
    method: 'POST',
    data
  })
}
/**
 * @description   责任区域修改信息
 * @author shengxianghui
 * @date 2020-04-10
 * @export
 * @param {Object} data
 */

export function dutyParkUpdate(data) {
  return request({
    url: '/dutyRegion/dutyParkUpdate',
    method: 'PUT',
    data
  })
}
/**
 * @description   责任区域删除
 * @author shengxianghui
 * @date 2020-04-10
 * @export
 * @param {Object} params
 */

export function dutyParkDelete(params) {
  return request({
    url: '/dutyRegion/delete',
    method: 'DELETE',
    params
  })
}
/**
 * @description   根据大区ID和加盟商ID获取责任区域
 * @author shengxianghui
 * @date 2020-04-10
 * @export
 * @param {Object} params
 */

export function findByLargeFranchisee(params) {
  return request({
    url: '/dutyRegion/findByLargeFranchisee',
    method: 'GET',
    params
  })
}
/**
 * @description   获取已有责任区域
 * @author shengxianghui
 * @date 2020-04-10
 * @export
 * @param {Object} params
 */

export function dutyParkFindPositionModelList(params) {
  return request({
    url: '/dutyRegion/dutyParkFindPositionModelList',
    method: 'GET',
    params
  })
}
/**
 * @description   根据ID查询责任区域信息
 * @author shengxianghui
 * @date 2020-04-10
 * @export
 * @param {Object} params
 */

export function dutyParkFindById(params) {
  return request({
    url: '/dutyRegion/dutyParkFindById',
    method: 'GET',
    params
  })
}
/**
 * @description   停车点启用禁用
 * @author shengxianghui
 * @date 2020-04-11
 * @export
 * @param {Object} params
 */

export function parkSpotavailable(params) {
  return request({
    url: '/parkSpot/available',
    method: 'PUT',
    params
  })
}
/**
 * @description   停车点新增
 * @author shengxianghui
 * @date 2020-04-11
 * @export
 * @param {Object} data
 */

export function parkSpotdutyParkInsert(data) {
  return request({
    url: '/parkSpot/dutyParkInsert',
    method: 'POST',
    data
  })
}
/**
 * @description   停车点修改信息
 * @author shengxianghui
 * @date 2020-04-11
 * @export
 * @param {Object} data
 */

export function parkSpotdutyParkUpdate(data) {
  return request({
    url: '/parkSpot/dutyParkUpdate',
    method: 'PUT',
    data
  })
}
/**
 * @description   停车点条件查询
 * @author shengxianghui
 * @date 2020-04-11
 * @export
 * @param {Object} params
 */

export function parkSpotdutyParkQuery(params) {
  return request({
    url: '/parkSpot/dutyParkQuery',
    method: 'GET',
    params
  })
}
/**
 * @description   停车点根据ID查询责任区域信息
 * @author shengxianghui
 * @date 2020-04-11
 * @export
 * @param {Object} params
 */

export function parkSpotdutyParkFindById(params) {
  return request({
    url: '/parkSpot/dutyParkFindById',
    method: 'GET',
    params
  })
}
/**
 * @description   停车点根据大区ID和加盟商ID获取停车点
 * @author shengxianghui
 * @date 2020-04-11
 * @export
 * @param {Object} params
 */

export function parkSpotfindByLargeFranchisee(params) {
  return request({
    url: '/parkSpot/findByLargeFranchisee',
    method: 'GET',
    params
  })
}
/**
 * @description   停车点分页查询返回总条数
 * @author shengxianghui
 * @date 2020-04-11
 * @export
 * @param {Object} params
 */

export function parkSpotdutyParkQueryManagerListPage(params) {
  return request({
    url: '/parkSpot/dutyParkQueryManagerListPage',
    method: 'GET',
    params
  })
}
/**
 * @description   停车点获取已有停车点
 * @author shengxianghui
 * @date 2020-04-11
 * @export
 * @param {Object} params
 */

export function parkSpotdutyParkFindPositionModelList(params) {
  return request({
    url: '/parkSpot/dutyParkFindPositionModelList',
    method: 'GET',
    params
  })
}

/**
 * @description   禁行区根据ID查询区域信息
 * @author shengxianghui
 * @date 2020-04-14
 * @export
 * @param {Object} params
 */

export function forbiddenRegionfindById(params) {
  return request({
    url: '/forbiddenRegion/findById',
    method: 'GET',
    params
  })
}
/**
 * @description   根据大区ID和加盟商ID获取禁行区域(无地图)
 * @author shengxianghui
 * @date 2020-04-14
 * @export
 * @param {Object} params
 */

export function forbiddenRegionfindByLargeFranchisee(params) {
  return request({
    url: '/forbiddenRegion/findByLargeFranchisee',
    method: 'GET',
    params
  })
}
/**
 * @description   获取已有禁行区域
 * @author shengxianghui
 * @date 2020-04-14
 * @export
 * @param {Object} params
 */

export function forbiddenRegionfindPositionModelList(params) {
  return request({
    url: '/forbiddenRegion/findPositionModelList',
    method: 'GET',
    params
  })
}
/**
 * @description   禁行区域分页查询
 * @author shengxianghui
 * @date 2020-04-14
 * @export
 * @param {Object} params
 */

export function forbiddenRegionqueryListPage(params) {
  return request({
    url: '/forbiddenRegion/queryListPage',
    method: 'GET',
    params
  })
}
/**
 * @description   禁行区域分页查询返回总条数
 * @author shengxianghui
 * @date 2020-04-14
 * @export
 * @param {Object} params
 */

export function forbiddenRegionqueryManagerListPage(params) {
  return request({
    url: '/forbiddenRegion/queryManagerListPage',
    method: 'GET',
    params
  })
}
/**
 * @description   禁行区域修改
 * @author shengxianghui
 * @date 2020-04-14
 * @export
 * @param {Object} data
 */

export function forbiddenRegionupdate(data) {
  return request({
    url: '/forbiddenRegion/update',
    method: 'PUT',
    data
  })
}
/**
 * @description   禁行区域删除
 * @author shengxianghui
 * @date 2020-04-14
 * @export
 * @param {Object} params
 */

export function forbiddenRegiondelete(params) {
  return request({
    url: '/forbiddenRegion/delete',
    method: 'DELETE',
    params
  })
}
/**
 * @description   禁行区域添加
 * @author shengxianghui
 * @date 2020-04-14
 * @export
 * @param {Object} data
 */

export function forbiddenRegioninsert(data) {
  return request({
    url: '/forbiddenRegion/insert',
    method: 'POST',
    data
  })
}
