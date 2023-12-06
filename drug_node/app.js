// 引入 Express.js 框架
const express = require('express');// 创建一个 Express.js 应用实例
const app = express();// 设置当前 Web 服务的访问端口
const port = 3000;// 响应客户端对于“/”目录的HTTP GET请求

// 初始化模型，如果表不存在就建表
require('./modeling.js')

app.get('/', (req, res) => {    
  // 设置一个模板变量    
  const myName = 'Express';    
  // 根据模板变量的值动态生成<h1>标签    
  // 并将该标签以字符串的形式返回给客户端    
  res.send('<h1>Hello '+myName+'!</h1>');
}) 
	// 设置当前服务启动时要监听的端口以及要执行的动作
app.listen(port, () => {    
  console.log(`请访问http://localhost:${port}/，按“Ctrl+C”键终止服务！`);
})