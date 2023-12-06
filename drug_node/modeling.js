// 引入 Knex.js 框架
const knex = require('knex')

// 创建数据库连接对象
const MyDB = knex({
	client: 'mysql',
	version: '8.0',
	// 指定knex要操作的数据库为MySQL
	connection: {
		host: '127.0.0.1',
		// 设置数据库所在的服务器地址
		port: 3306,
		user: 'user1',
		// 设置登录数据库的用户名
		password: 'mysql@123',
		// 设置登录数据库的密码
		database: 'db_drug'
		// 设置要操作的数据库名称
	}
})

// 创建表 用户表
MyDB.schema.hasTable('tb_user')  // 查看数据库中是否已经存在 tb_user 表
	.then(function (exists) {
		if (exists == false) {
			// 如果 tb_user 表不存在就创建它    
			return MyDB.schema.createTable('tb_user', function (table) {
				// 创建 tb_user 表      
				// 将 id 设置为类型为 bigInt 的主键字段      
				table.bigInteger('id').primary();
				table.string('userNmae');
				// 将 userNmae 设置为字符串类型的字段  
				table.string('userPassword');
				// 将 userPassword 设置为字符串类型的字段   
				table.string('role');
				// 将 role 设置为字符串类型的字段   
				table.string('createTime');
				// 将 createTime 设置为字符串类型的字段  
				table.string('lastLoginTime');
				// 将 lastLoginTime 设置为字符串类型的字段   
				table.string('remark');
				// 将 remark 设置为字符串类型的字段  
			});
		}
	});

// 创建表 用户权限
// tb_role
// id, roleName, roleCode, createTime, remark
MyDB.schema.hasTable('tb_role')
	.then(function (exists) {
		if (exists == false) {
			return MyDB.schema.createTable('tb_role', function (table) {
				table.bigInteger('id').primary();
				table.string('roleName');
				table.string('roleCode');
				table.string('createTime');
				table.string('remark');
			});
		}
	});

// 创建表 药品分类表
// tb_drug_catelogue
// id, approvalNumber, drugName, dosage, specifications, holder, productionUnit, drugCode, remark
MyDB.schema.hasTable('tb_drug_catelogue')
	.then(function (exists) {
		if (exists == false) {
			return MyDB.schema.createTable('tb_drug_catelogue', function (table) {
				table.bigInteger('id').primary();
				table.string('approvalNumber'); // 批准文号
				table.string('drugName'); // 产品名称
				table.string('dosage'); // 剂型
				table.string('specifications'); // 规格
				table.string('holder'); // 上市许可持有人
				table.string('productionUnit'); // 生产单位
				table.string('drugCode'); // 药品编码
				table.string('remark'); // 药品编码备注
			});
		}
	});

// 创建表 药品入库表
// tb_drug_input
// id, drugName, drugCode, total, location, createTime, remark
MyDB.schema.hasTable('tb_drug_input')
	.then(function (exists) {
		if (exists == false) {
			return MyDB.schema.createTable('tb_drug_input', function (table) {
				table.bigInteger('id').primary();
				table.string('approvalNumber'); // 批准文号
				table.string('drugName'); // 产品名称
				table.string('dosage'); // 剂型
				table.string('specifications'); // 规格
				table.string('holder'); // 上市许可持有人
				table.string('productionUnit'); // 生产单位
				table.string('drugCode'); // 药品编码
				table.string('total'); // 入库数量
				table.string('location'); // 货架位置
				table.string('createTime'); // 入库时间
				table.string('remark'); // 药品编码备注
			});
		}
	});

// 创建表 药品出库表
// tb_drug_output
// id, drugName, drugCode, total, location, createTime, remark
MyDB.schema.hasTable('tb_drug_output')
	.then(function (exists) {
		if (exists == false) {
			return MyDB.schema.createTable('tb_drug_output', function (table) {
				table.bigInteger('id').primary();
				table.string('approvalNumber'); // 批准文号
				table.string('drugName'); // 产品名称
				table.string('dosage'); // 剂型
				table.string('specifications'); // 规格
				table.string('holder'); // 上市许可持有人
				table.string('productionUnit'); // 生产单位
				table.string('drugCode'); // 药品编码
				table.string('total'); // 出库数量
				table.string('location'); // 货架位置
				table.string('createTime'); // 出库时间
				table.string('remark'); // 药品编码备注
			});
		}
	});



// 创建表 药品预警表
// tb_drug_inventory_alert
// id, drugName, drugCode, total, createTime, remark
MyDB.schema.hasTable('tb_drug_inventory_alert')
	.then(function (exists) {
		if (exists == false) {
			return MyDB.schema.createTable('tb_drug_inventory_alert', function (table) {
				table.bigInteger('id').primary();
				table.string('approvalNumber'); // 批准文号
				table.string('drugName'); // 产品名称
				table.string('dosage'); // 剂型
				table.string('specifications'); // 规格
				table.string('holder'); // 上市许可持有人
				table.string('productionUnit'); // 生产单位
				table.string('drugCode'); // 药品编码
				table.string('total'); // 出库数量
				table.string('createTime'); // 出库时间
				table.string('remark'); // 药品编码备注
			});
		}
	});