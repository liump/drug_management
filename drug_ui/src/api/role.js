import { axios } from './request.js'

const api = {
    role: '/role'
}

// select
export function httpRoleQuery(parameter) {
    return axios({
        url: api.role,
        method: 'get',
        params: parameter
    })
}

// insert
export function httpRoleInsert(parameter) {
    return axios({
        url: api.role,
        method: 'post',
        data: parameter
    })
}

// update
export function httpRoleUpdate(parameter) {
    return axios({
        url: api.role,
        method: 'put',
        data: parameter
    })
}

// delete
export function httpRoleDelete(parameter) {
    return axios({
        url: api.role,
        method: 'delete',
        data: parameter
    })
}

