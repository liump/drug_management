import { axios } from './request.js'

const api = {
    pre: '/drugOutput'
}

// select
export function httpDrugOutputQuery(parameter) {
    return axios({
        url: api.pre,
        method: 'get',
        params: parameter
    })
}

// insert
export function httpDrugOutputInsert(parameter) {
    return axios({
        url: api.pre,
        method: 'post',
        data: parameter
    })
}

// update
export function httpDrugOutputUpdate(parameter) {
    return axios({
        url: api.pre,
        method: 'put',
        data: parameter
    })
}

// delete
export function httpDrugOutputDelete(parameter) {
    return axios({
        url: api.pre,
        method: 'delete',
        data: parameter
    })
}

