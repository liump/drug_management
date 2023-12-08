// 引入 Express.js 框架
const express = require('express');// 创建一个 Express.js 应用实例
const app = express();// 设置当前 Web 服务的访问端口
const port = 3000;// 响应客户端对于“/”目录的HTTP GET请求

module.exports = app;

// 初始化模型，如果表不存在就建表
require('./modeling.js')
// 药品分类模块API
require('./DrugCatelogue.js')

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

