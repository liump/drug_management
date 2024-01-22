import http from './http';

//POST
// 登录后，获取token
export const HttpLogin = (data: any) => {
    return http({
        url: '/login',
        method: 'POST',
        data,
    });
};