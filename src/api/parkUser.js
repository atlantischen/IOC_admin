import request from '@/utils/request'

const bUrl = '/campus-admin/'
// 园区用户
export function parkUserApi(params, method) {
  return request({
    url: bUrl + 'api/v1/admin/campus-campus-user',
    method: method || 'get',
    params
  })
}


export function parkUserApi2( data, method ) {
  return request({
    url: bUrl + 'api/v1/admin/campus-campus-user',
    method: method || 'post',
    noQS: true,
    data: data
  })
}

// 详情
export function parkUserInfoApi( params, method ) {
  return request({
    url: bUrl + 'api/v1/admin/campus-campus-user/detail',
    method: method || 'get',
    params
  })
}
// 启用、禁用
export function cgStatusApi( data, method ) {
  return request({
    url: bUrl + 'api/v1/admin/campus-campus-user/status',
    method: method || 'post',
    data: data
  })
}
// 角色查询
export function getUserRoleApi( params, method ) {
  return request({
    url: bUrl + 'api/v1/admin/campus-campus-user/user-role',
    method: method || 'get',
    params
  })
}
