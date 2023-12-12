# drug project

## PM2

pm2 start app.js
pm2 restart app_name
pm2 reload app_name
pm2 stop app_name
pm2 delete app_name

### 异常
// 安装 pm2 以后运行异常
pm2 -v
// 如果有以下提示，请使用管理员权限打开 powerShell，如果使用 VSCode 将 Code.exe 属性勾选上管理员权限打开
connect EPERM //./pipe/rpc.sock
[PM2] Spawning PM2 daemon with pm2_home=C:\Users\liump\.pm2

## 参考资料
[knex CRUD](https://blog.csdn.net/m0_51810668/article/details/131277990)
[dayjs](https://dayjs.fenxianglu.cn/category/parse.html#%E5%AE%9E%E4%BE%8B)
[PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)