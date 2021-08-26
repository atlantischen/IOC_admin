import request from '@/utils/request'

const bUrl = '/campus-admin/'

export function adminRoleApi(params, method) {
  return request({
    url: bUrl + 'api/v1/admin/role',
    method: method || 'get',
    params
  })
}
export function adminRoleInfoApi(params, method) {
  return request({
    url: bUrl + 'api/v1/admin/role/detail',
    method: method || 'get',
    params
  })
}


export function adminRoleApi2( data, method ) {
  return request({
    url: bUrl + 'api/v1/admin/role',
    method: method || 'post',
    noQS: true,
    data: data
  })
}

