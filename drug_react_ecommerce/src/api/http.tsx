import axios from 'axios';

import { message } from 'antd';

const service = axios.create({
  baseURL: '/api',
  // baseURL: 'http://iot-bbs.yangzijiang.com/',
  timeout: 3000,
});

//响应拦截器
service.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      // message.error('请重新登录')
      // localStorage.clear()

      // if (isMobileTerminal.value) {
      //   localStorage.setItem('token', '')
      // } else {
      //   console.log('401')
      // router.push('/login')
      localStorage.clear();
      
      // Router.push('/')
      //请求要求身份验证 跳转到登录页
      window.location.href = '/login';

      return response;
      // }
    } else {
      return Promise.reject(new Error(response.status));
    }
  },
  (error) => {
    if (error.message && error.message.indexOf('401') > -1) {
      message.error('请重新登录！');
      localStorage.clear();
      //请求要求身份验证 跳转到登录页
      window.location.href = '/login';
      // location.reload()
    }
  }
);

// 请求拦截
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization =
        `Bearer ` + localStorage.getItem('token');
    } else {
      // console.log(isMobileTerminal.value)
      //   if (isMobileTerminal.value) {
      //     localStorage.setItem('token', '')
      //   } else {
      //     router.push('/login')
      //   }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;

