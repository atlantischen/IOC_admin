import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/campus-auth/oauth/token',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/campus-admin/api/v1/admin/account/me',
    method: 'get',
    
  })
}
export function getCode(phone) {
  return request({
    url: '/campus-admin/api/v1/admin/account/send_code',
    method: 'get',
    params:phone
    
  })
}
export function getActivateAccount(params) {
  return request({
    url: '/campus-admin/api/v1/admin/account/activation',
    method: 'get',
    params
    
  })
}

export function logout() {
  return request({
    url: '/campus-auth/oauth/logout',
    method: 'post'
  })
}

