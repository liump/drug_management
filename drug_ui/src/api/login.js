import { axios } from './request.js'

const api = {
    login: '/login'
}

export function httpLogin(parameter) {
    return axios({
        url: api.login,
        method: 'post',
        data: parameter
    })
}

