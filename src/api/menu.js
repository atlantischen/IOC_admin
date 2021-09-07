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
//开发者菜单列表
export function MenuManagement(params) {
    return request({
        url: bUrl + 'api/v1/admin/menu',
        method: 'get',
        params,
        contentType: "application/json"
    })
}
//开发者菜单新增
export function MenuRoleApi(data) {
    return request({
        url: bUrl + 'api/v1/admin/menu',
        method: 'post',
        noQS: true,
        data
    })
}
//开发者菜单修改
export function MenuModification(data) {
    return request({
        url: bUrl + 'api/v1/admin/menu',
        method: 'PUT',
        noQS: true,
        data
    })
}
//开发者菜单删除
export function MenuDelete(params) {
    return request({
        url: bUrl + 'api/v1/admin/menu',
        method: 'DELETE',
        params
    })
}
//园区菜单列表
export function ParkManagement(params) {
    return request({
        url: bUrl + 'api/v1/admin/campus-menu',
        method: 'get',
        params
    })
}
//园区菜单新增
export function ParkRoleApi(data, ) {
    return request({
        url: bUrl + 'api/v1/admin/campus-menu',
        method: 'post',
        noQS: true,
        data
    })
}
//园区菜单修改
export function ParkModification(data) {
    return request({
        url: bUrl + 'api/v1/admin/campus-menu',
        method: 'PUT',
        noQS: true,
        data
    })
}
//园区菜单删除
export function ParkDelete(params) {
    return request({
        url: bUrl + 'api/v1/admin/campus-menu',
        method: 'DELETE',
        noQS: true,
        params
    })
}
//园区菜单删除
export function LogManagement(params) {
    return request({
        url: bUrl + 'api/v1/admin/log',
        method: 'get',
        params
    })
}