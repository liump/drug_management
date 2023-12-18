// 引入 Express.js 框架
const express = require('express');// 创建一个 Express.js 应用实例
const app = express();// 设置当前 Web 服务的访问端口
const port = 3000;// 响应客户端对于“/”目录的HTTP GET请求

// body 解析
const bodyParser = require('body-parser');
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
  extended: true
}));

const nocache = require('nocache');
app.use(nocache());

// 导入校验token的模块, 解析JWT字符串, 还原成 JSON 对象 的模块
const { expressjwt: jwt } = require('express-jwt');
const SECRET_KEY = 'login2023' // 与生成token的密钥要一致!

// 1. 使用中间件解析token
// 2. 使用 .unless 排除无需校验的路由(比如: 登录)
app.use(
  jwt({
    secret: SECRET_KEY,
    algorithms: ['HS256'], // 使用何种加密算法解析
  })
    .unless({ path: ['/login'] }) // 登录页无需校验
)

// jwt 相关错误处理
app.use(function (err, req, res, next) {
  console.log(err, err.name);
  let code = 500;
  let message = 'Internal Server Error';
  // token解析的错误
  if (err.name === 'UnauthorizedError') {
    code = 401
    message = 'no login'
  }
  res.statusCode = code;
  res.send({
    status: code,
    message,
  })
})

module.exports = app;

// 初始化模型，如果表不存在就建表
require('./modeling.js')
// 药品分类模块API
require('./DrugCatelogue.js')
// 入库
require('./DrugInput.js')
// 出库
require('./DrugOutput.js')
// 用户表
require('./DrugUser.js')
// 权限表
require('./DrugRole.js')
// 库存预警
require('./DrugAlert.js')
// 登录
require('./Login.js')
// 大屏
require('./DrugBigScreen.js')


app.get('/', (req, res) => {
  let defaultJson = {
    code: 200,
    msg: 'node express server'
  }
  let resJson = JSON.stringify(defaultJson)
  res.send(resJson);
})

// 设置当前服务启动时要监听的端口以及要执行的动作
app.listen(port, () => {
  console.log(`请访问http://localhost:${port}/，按“Ctrl+C”键终止服务！`);
})
