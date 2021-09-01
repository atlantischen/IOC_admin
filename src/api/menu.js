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
//菜单列表
export function MenuManagement(params, method) {
    return request({
        url: bUrl + 'api/v1/admin/menu',
        method: method || 'get',
        params
    })
}
//菜单新增Menu modification
export function MenuroleApi(data, method) {
    return request({
        url: bUrl + 'api/v1/admin/menu',
        method: method || 'post',
        noQS: true,
        data
    })
}
export function MenuModification(data, method) {
    return request({
        url: bUrl + 'api/v1/admin/menu',
        method: method || 'PUT',
        noQS: true,
        data
    })
}