import { axios } from './request.js'

// select 
// pageNo=1&pageSize=10&drugName=
export function httpDrugPriceQuery(parameter) {
    return axios({
        url: '/eCommerce/list',
        method: 'get',
        params: parameter
    })
}

// update 
export function httpDrugPriceEdit(parameter) {
    return axios({
        url: '/drugDetail',
        method: 'post',
        data: parameter
    })
}


