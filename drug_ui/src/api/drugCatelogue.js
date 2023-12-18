import { axios } from './request.js'

const api = {
    pre: '/drugCatelogue'
}

// select
export function httpDrugCatelogueQuery(parameter) {
    return axios({
        url: api.pre,
        method: 'get',
        params: parameter
    })
}