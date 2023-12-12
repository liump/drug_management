// 引入 Knex.js 框架
const knex = require('knex')

// 创建数据库连接对象
const MyDB = knex({
	// 指定knex要操作的数据库为MySQL
	client: 'mysql',
	version: '8.0',
	connection: {
		host: '127.0.0.1',
		// 设置数据库所在的服务器地址
		port: 3306,
		user: 'user1',
		// 设置登录数据库的用户名
		password: 'mysql@123456',
		// 设置登录数据库的密码
		database: 'db_drug'
		// 设置要操作的数据库名称
	},
	useNullAsDefault: true
})

module.exports = MyDB;