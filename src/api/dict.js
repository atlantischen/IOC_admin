import request from '@/utils/request'

const bUrl = '/campus-admin/'
// 主字典
// 列表分页
export function adminDictApi(params, method) {
  return request({
    url: bUrl + 'api/v1/admin/dict',
    method: method || 'get',
    params
  })
}
export function adminDictApi2(data, method) {
  return request({
    url: bUrl + 'api/v1/admin/dict',
    method: method || 'POST',
    noQS: true,
    data
  })
}
// 单个详情
export function adminDictApiInfo(params) {
  return request({
    url: bUrl + 'api/v1/admin/dict/info',
    method: 'get',
    params
  })
}


//子字典
export function adminDictItemApi(params, method ) {
  return request({
    url: bUrl + 'api/v1/admin/dict-item',
    method: method || 'get',
    params
  })
}
export function adminDictItemApi2( data, method ) {
  return request({
    url: bUrl + 'api/v1/admin/dict-item',
    method: method || 'post',
    data: data
  })
}
export function adminDictItemApiInfo(params ) {
  return request({
    url: bUrl + 'api/v1/admin/dict-item/info',
    method: 'get',
    params
  })
}
