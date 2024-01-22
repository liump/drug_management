# 药品-web-电商

这是药品系统中web电商部分(drug-ui-ecommerce), 使用 next.js + React.js + typeScript + Tailwind 构建, 后台在之前的基础上迭代(drug-node).

## 需求
1. 前后端分离, 后端 Node.js, 前端 React.js + typeScript.
2. 页面: 首页, 购物车, 结算页, 详情页, 我的, 订单管理, 订单详情, 登录, 注册.
3. 后台管理系统同步需求改造, 涉及3个表, 2个页面(订单管理, 药品明细)相关工作.

# 详细设计
## 药品明细
id, drugCode, imgUrl, price
## 订单
id, orderCode, drugCode, price, createTime
## 购物车
id, userId, drugCode

# API设计
## 首页
1. 药品库存明细分页列表(搜索支持名称, 公司).
2. 用户信息(userInfo).

## 购物车
1. 用户ID对应的购物车分类列表
2. 删除商品
3. 增加到购物车

## 结算
1. 确认后生成的订单(创建)
2. 删除购物车内的物品

## 详情
1. 通过 drugCode 查询药品类别及药品明细

## 订单管理
1. 查询订单列表(搜索支持: 用户)
2. 通过订单id查询详情(多个药品明细)

## 药品明细
1. 查询库存药品明细列表

