import { axios } from './request.js'

const api = {
    pre: '/bigScreen',
    outputTop10: '/bigScreen/outputTop10',
    input: '/bigScreen/input',
    catelogue: '/bigScreen/catelogue',
    output: '/bigScreen/output',
    alert: '/bigScreen/alert',
}

// select (center) top10
export function httpBigScreenTop10(parameter) {
    return axios({
        url: api.outputTop10,
        method: 'get',
        params: parameter
    })
}

// select (left1) input
export function httpBigScreenInput(parameter) {
    return axios({
        url: api.input,
        method: 'get',
        params: parameter
    })
}

// select (left2) catelogue
export function httpBigScreenCatelogue(parameter) {
    return axios({
        url: api.catelogue,
        method: 'get',
        params: parameter
    })
}

// select (right1) output
export function httpBigScreenOutput(parameter) {
    return axios({
        url: api.output,
        method: 'get',
        params: parameter
    })
}

// select (right2) alert
export function httpBigScreenAlert(parameter) {
    return axios({
        url: api.alert,
        method: 'get',
        params: parameter
    })
}

