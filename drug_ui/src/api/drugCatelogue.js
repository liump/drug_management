import { axios } from './request.js'

const api = {
    pre: '/drugCatelogue'
}

// select
export function httpDrugQuery(parameter) {
    return axios({
        url: api.pre,
        method: 'get',
        params: parameter
    })
}