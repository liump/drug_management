# 药品库存管理系统

个人全栈开发计划-药品库存管理系统

数字化管控药品库存，实时掌控库存量，便于入库、出库、取药

## 需求分析
### 模块拆分
1. 人员管理
2. 仓库管理
3. 角色管理
4. 入库
5. 出库
6. 库存预警
7. 可视化大屏

### 需求记录
人员选择角色，角色分员工，主任，管理员

仓库分3表，药品分类，入库，出库

库存预警，通过设置药品与数量，可视化大屏推送低于预定值得药品

可视化大屏：库存预警，入库信息，出库信息

### 建模

tb_user
id, userName, userPassword, role, createTime, lastLoginTime, remark

tb_role
id, roleName, roleCode, createTime, remark

tb_drug_catelogue
id, approvalNumber, drugName, dosage, specifications, holder, productionUnit, drugCode, remark

tb_drug_input
id, drugName, drugCode, total, location, createTime, remark...

tb_drug_output
id, drugName, drugCode, total, location, createTime, remark...

tb_drug_inventory_alert
id, drugName, drugCode, total, createTime, remark

### 设计模式
前后端分离
数据库：MySQL
后端：Node.js
前端：Vue.js

### 接口设计
预计26个API，8个模块

1. 人员管理。 CRUD（删除需要管理员）√
2. 权限管理。 CRUD（删除需要管理员）√
2. 登录 √
    2.1 登录 login
    2.2 人员信息 userInfo
3. Token √
4. 药品分类 √
    4.1 导入
    4.2 查询
5. 药品入库。 CRUD √
6. 药品出库。 CRUD √
7. 库存预警。 CRUD √
8. 可视化大屏 （库存预警、入库信息、出库信息、库存类别、出库Top10） 

## 大屏设计
[柱状图-入库信息 demo1.js](https://www.isqqw.com/viewer?id=42996)
[柱状图-出库信息 demo2.js](https://www.isqqw.com/viewer?id=42770)
[柱状图-出库Top10 demo3.js](https://www.isqqw.com/viewer?id=42728)
[饼图-库存类别 demo4.js](https://www.isqqw.com/viewer?id=42129)
[柱状图-库存预警 demo5.js](https://www.isqqw.com/viewer?id=42368)