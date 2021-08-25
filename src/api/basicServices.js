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