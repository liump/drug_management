import { axios } from './request.js'

const api = {
    pre: '/role'
}

// select
export function httpRoleQuery(parameter) {
    return axios({
        url: api.pre,
        method: 'get',
        params: parameter
    })
}

// insert
export function httpRoleInsert(parameter) {
    return axios({
        url: api.pre,
        method: 'post',
        data: parameter
    })
}

// update
export function httpRoleUpdate(parameter) {
    return axios({
        url: api.pre,
        method: 'put',
        data: parameter
    })
}

// delete
export function httpRoleDelete(parameter) {
    return axios({
        url: api.pre,
        method: 'delete',
        data: parameter
    })
}

