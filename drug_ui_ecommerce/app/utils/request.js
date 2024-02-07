'use client'

import axios from 'axios'
// import { message } from 'antd';

// 创建 axios 实例
const service = axios.create({
    baseURL: '/api', // api base_url
    timeout: 9000 // 请求超时时间
})


// const [messageApi, contextHolder] = message.useMessage();

const err = (error) => {
    if (error.response) {
        let data = error.response.data

        const token = localStorage.getItem('pro__ecommerce__token')
        console.log("------异常响应------", token)
        console.log("------异常响应------", error.response.status)
        switch (error.response.status) {
            case 500:
                console.log("------error.response------", error.response)
                // messageApi.error(error.response)
                break
            case 404:
                // messageApi.warning(error.response)
                break
            case 504:
                // messageApi.warning('网络超时')
                break
            case 401:
                // messageApi.warning('很抱歉，登录已过期，请重新登录')
                localStorage.clear('pro__ecommerce__token')
                setTimeout(() => {
                    location.href = '/login'
                }, 1500)
                break
            default:
                // messageApi.error(data.message)
                break
        }
    } else if (error.message) {
        if (error.message.includes('timeout')) {
            // messageApi.error('网络超时')
        } else {
            // messageApi.error(error.message)
        }
    }
    return Promise.reject(error)
};

// request interceptor
service.interceptors.request.use(config => {
    const token = localStorage.getItem('pro__ecommerce__token')
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
    return response.data
}, err)

export {
    service as axios
}

