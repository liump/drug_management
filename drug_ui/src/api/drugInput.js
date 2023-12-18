import { axios } from './request.js'

const api = {
    pre: '/drugInput'
}

// select
export function httpDrugInputQuery(parameter) {
    return axios({
        url: api.pre,
        method: 'get',
        params: parameter
    })
}

// insert
export function httpDrugInputInsert(parameter) {
    return axios({
        url: api.pre,
        method: 'post',
        data: parameter
    })
}

// update
export function httpDrugInputUpdate(parameter) {
    return axios({
        url: api.pre,
        method: 'put',
        data: parameter
    })
}

// delete
export function httpDrugInputDelete(parameter) {
    return axios({
        url: api.pre,
        method: 'delete',
        data: parameter
    })
}

