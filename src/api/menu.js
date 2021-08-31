import request from '@/utils/request'

const bUrl = '/campus-admin/'
    // 菜单
export function adminMenuApi(params, method) {
    return request({
        url: bUrl + 'api/v1/admin/menu',
        method: method || 'get',
        params
    })
}
export function MenuManagement(params, method) {
    return request({
        url: bUrl + 'api/v1/admin/menu',
        method: method || 'get',
        params
    })
}
export function MenuroleApi(params, method) {
    return request({
        url: bUrl + 'api/v1/admin/role',
        method: method || 'get',
        params
    })
}