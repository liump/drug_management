import http from '../utils/http';

//POST
// 登录后，获取token
export const UserLogin = (data: any) => {
    return http({
        url: '/Login/Authenticate',
        method: 'POST',
        data,
    });
};

//GET
//查询文件列表
// export const getFileData = (data) => {
//     return http({
//         url: '/FileMgmt/GetFileList',
//         params: data
//     })
// }