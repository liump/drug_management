import { axios } from './request.js'

const api = {
    pre: '/user'
}

// select
export function httpUserQuery(parameter) {
    return axios({
        url: api.pre,
        method: 'get',
        params: parameter
    })
}

// insert
export function httpUserInsert(parameter) {
    return axios({
        url: api.pre,
        method: 'post',
        data: parameter
    })
}

// update
export function httpUserUpdate(parameter) {
    return axios({
        url: api.pre,
        method: 'put',
        data: parameter
    })
}

// delete
export function httpUserDelete(parameter) {
    return axios({
        url: api.pre,
        method: 'delete',
        data: parameter
    })
}

