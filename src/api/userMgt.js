import request from '@/utils/request'

const bUrl = '/campus-admin/'
// 用户管理
// 用户list
export function adminUserApi(params, method) {
  return request({
    url: bUrl + 'api/v1/admin/user',
    method: method || 'get',
    params
  })
}

export function adminUserApi2( data, method ) {
  return request({
    url: bUrl + 'api/v1/admin/user',
    method: method || 'post',
    noQS: true,
    data: data
  })
}
// 重置密码
export function cgPasswordApi( data, method ) {
  return request({
    url: bUrl + 'api/v1/admin/user/change/password',
    method: method || 'post',
    data: data
  })
}
// 启用禁用
export function cgStatusApi( data, method ) {
  return request({
    url: bUrl + 'api/v1/admin/user/status',
    method: method || 'post',
    data: data
  })
}

// 用户详情
export function userDetailApi(params, method) {
  return request({
    url: bUrl + 'api/v1/admin/user/detail',
    method: method || 'get',
    params
  })
}
// 用户角色查询
export function userRoleApi(params, method) {
  return request({
    url: bUrl + 'api/v1/admin/user/user-role',
    method: method || 'get',
    params
  })
}