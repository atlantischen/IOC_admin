import request from '@/utils/request'
// 园区列表
export function getParkManageList(params) {
  return request({
    url: '/campus-admin/api/v1/admin/campus/list',
    method: 'get',
    params
  })
}
// 获取园区下拉框
export function getParkSelect(params) {
  return request({
    url: '/campus-admin/api/v1/admin/dict-item',
    method: 'get',
    params
  })
}
// 父级园区
export function getParentPark(params) {
  return request({
    url: '/campus-admin/api/v1/admin/campus/list',
    method: 'get',
    params
  })
}
// 园区删除
export function deleteParkManage(data) {
  return request({
    url: '/campus-admin/api/v1/admin/campus/delete',
    method: 'post',
    data
  })
}
// 默认园区
export function defaultParkManage(data) {
  return request({
    url: '/campus-admin/api/v1/admin/campus/default-campus',
    method: 'post',
    data
  })
}
// 园区修改
export function updateParkManage(data) {
  return request({
    url: '/campus-admin/api/v1/admin/campus/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
      },
    noQS: true,
    data
  })
}
// 园区新增
export function addParkManage(data) {
  return request({
    url: '/campus-admin/api/v1/admin/campus/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
      },
    noQS: true,
    data
  })
}
// app用户
export function getAppUser(params) {
  return request({
    url: '/campus-admin/api/v1/admin/campus-user/list',
    method: 'get',
    params
  })
}
// 机构列表
export function getMechanismList(params) {
  return request({
    url: '/campus-admin/api/v1/admin/organization/list',
    method: 'get',
    params
  })
}
// 楼栋列表
export function getHouse(params) {
  return request({
    url: '/campus-manager/api/v1/manager/house/building',
    method: 'get',
    params
    
  })
}
// 房源列表
export function getRoom(params) {
  return request({
    url: '/campus-manager/api/v1/manager/house/houseList',
    method: 'get',
    params
    
  })
}
// 机构管理新增
export function getOrganization(data) {
  return request({
    url: '/campus-admin/api/v1/admin/organization/save',
    method: 'post',
    noQS: true,
    data
    
  })
}
// 机构管理编辑
export function editOrganization(data) {
  return request({
    url: '/campus-admin/api/v1/admin/organization',
    method: 'put',
    data
    
  })
}
// 机构管理删除
export function deleteOrganization(id) {
  return request({
    url: `/campus-admin/api/v1/admin/organization?ids=${id}`,
    method: 'delete',
 
  
    
  })
}
// 园区管理权限分配查询
export function getMenuApp(params) {
  return request({
    url: '/campus-admin/api/v1/admin/campus/menu-app',
    method: 'get',

    params
  })
}
// 园区管理权限分配查询
export function saveMenuApp(params) {
  return request({
    url: '/campus-admin/api/v1/admin/campus/menu-app',
    method: 'put',
    params
  })
}
// 机构管理权限分配查询
export function getMechanismMenuApp(params) {
  return request({
    url: '/campus-admin/api/v1/admin/organization/menu-ids',
    method: 'get',

    params
  })
}
// 机构管理权限分配查询
export function saveMechanismMenuApp(params) {
  return request({
    url: '/campus-admin/api/v1/admin/organization/menu-ids',
    method: 'put',
    params
  })
}