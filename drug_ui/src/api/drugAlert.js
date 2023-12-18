import { axios } from './request.js'

const api = {
    pre: '/inventoryAlert'
}

// select
export function httpDrugAlertQuery(parameter) {
    return axios({
        url: api.pre,
        method: 'get',
        params: parameter
    })
}

// insert
export function httpDrugAlertInsert(parameter) {
    return axios({
        url: api.pre,
        method: 'post',
        data: parameter
    })
}

// update
export function httpDrugAlertUpdate(parameter) {
    return axios({
        url: api.pre,
        method: 'put',
        data: parameter
    })
}

// delete
export function httpDrugAlertDelete(parameter) {
    return axios({
        url: api.pre,
        method: 'delete',
        data: parameter
    })
}

