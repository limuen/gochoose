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
    url: '/api/operateRegion/queryManagerListPage',
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
    url: '/api/operateRegion/insert',
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
    url: '/api/operateRegion/findById',
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
    url: '/api/operateRegion/update',
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
    url: '/api/operateRegion/findPositionModelList',
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
    url: '/api/operateRegion/findByLargeFranchisee',
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
    url: '/api/dutyRegion/dutyParkQueryManagerListPage',
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
    url: '/api/dutyRegion/dutyParkInsert',
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
    url: '/api/dutyRegion/dutyParkUpdate',
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
    url: '/api/dutyRegion/delete',
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
    url: '/api/dutyRegion/findByLargeFranchisee',
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
    url: '/api/dutyRegion/dutyParkFindPositionModelList',
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
    url: '/api/dutyRegion/dutyParkFindById',
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
    url: '/api/parkSpot/available',
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
    url: '/api/parkSpot/dutyParkInsert',
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
    url: '/api/parkSpot/dutyParkUpdate',
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
    url: '/api/parkSpot/dutyParkQuery',
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
    url: '/api/parkSpot/dutyParkFindById',
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
    url: '/api/parkSpot/findByLargeFranchisee',
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
    url: '/api/parkSpot/dutyParkQueryManagerListPage',
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
    url: '/api/parkSpot/dutyParkFindPositionModelList',
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
    url: '/api/forbiddenRegion/findById',
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
    url: '/api/forbiddenRegion/findByLargeFranchisee',
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
    url: '/api/forbiddenRegion/findPositionModelList',
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
    url: '/api/forbiddenRegion/queryListPage',
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
    url: '/api/forbiddenRegion/queryManagerListPage',
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
    url: '/api/forbiddenRegion/update',
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
    url: '/api/forbiddenRegion/delete',
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
    url: '/api/forbiddenRegion/insert',
    method: 'POST',
    data
  })
}
