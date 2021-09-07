import request from '@/utils/request'

const bUrl = '/campus-admin/'
    // 角色
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


export function adminRoleApi2(data, method) {
    return request({
        url: bUrl + 'api/v1/admin/role',
        method: method || 'post',
        noQS: true,
        data: data
    })
}

// 角色 权限查询
export function roleMenuApi(params, method) {
    return request({
        url: bUrl + 'api/v1/admin/role/menu-ids',
        method: method || 'get',
        params
    })
}


// 角色 对象查询
export function roleApi(params, method) {
    return request({
        url: bUrl + 'api/v1/admin/role/user-ids',
        method: method || 'get',
        params
    })
}