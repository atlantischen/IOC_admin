import request from '@/utils/request'

const bUrl = '/campus-admin/'
// 角色
export function parkRoleApi(params, method) {
  return request({
    url: bUrl + 'api/v1/admin/campus-role',
    method: method || 'get',
    params
  })
}
export function parkRoleInfoApi(params, method) {
  return request({
    url: bUrl + 'api/v1/admin/campus-role/detail',
    method: method || 'get',
    params
  })
}


export function parkRoleApi2( data, method ) {
  return request({
    url: bUrl + 'api/v1/admin/campus-role',
    method: method || 'post',
    noQS: true,
    data: data
  })
}

// 角色 权限查询
export function roleMenuApi( params, method ) {
  return request({
    url: bUrl + 'api/v1/admin/campus-role/menu-ids',
    method: method || 'get',
    params
  })
}


// 角色 对象查询
export function roleUserApi( params, method ) {
  return request({
    url: bUrl + 'api/v1/admin/campus-role/user-ids',
    method: method || 'get',
    params
  })
}

