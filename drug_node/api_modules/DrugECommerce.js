/**
 * drug modules 药品明细
 */
const app = require('../app.js')
const MyDB = require('../MyDB.js')
const dayjs = require('dayjs')

// const { generateOrderCode } = require('../utils/utils.js')

/**
 * select 药品明细查询
 */
app.get('/eCommerce/list', (req, res) => {
    let params = req.query || {}
    let { pageNo, pageSize, drugName } = params
    pageNo = pageNo || 1
    pageSize = pageSize || 10
    let resData = {
        pageNo: pageNo,
        pageSize: pageSize,
        data: [],
        total: 0
    }

    MyDB.raw(`
        SELECT  
            dc.drugCode,  
            dc.approvalNumber, dc.drugName, dc.dosage, dc.specifications, dc.holder, dc.productionUnit, dc.remark,
            ii.total AS input_total,  
            io.total AS output_total,  
            ii.total - COALESCE(io.total, 0) AS balance,
            tdd.price AS price  
        FROM  
            tb_drug_catelogue dc  
        LEFT JOIN  
            tb_drug_input ii ON dc.drugCode = ii.drugCode  
        LEFT JOIN  
            tb_drug_output io ON dc.drugCode = io.drugCode
        LEFT JOIN  
            tb_drug_detail tdd ON dc.drugCode = tdd.drugCode
        HAVING  
            balance > 0  AND dc.drugName like '%${drugName}%'
        LIMIT ${pageSize} 
        OFFSET ${(pageNo - 1) * 10};
        `)
        .then(response => {
            resData = response[0] || []
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })

        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData })
        })
})

/**
 * select 用户信息
 */
app.get('/userInfo', (req, res) => {
    console.log(req.auth.user)
    let _user = req.auth.user
    res.send({
        status: 200,
        message: 'success',
        data: _user,
    })
})

/**
 * insert 购物车
 */
app.post('/shoppingCart', (req, res) => {
    let params = req.body || {}
    let resData = {}
    let _user = req.auth.user

    params = {
        // 添加用户id, 来自JWT, 可以从 req.auth.user 中获取(token 解析)
        userId: _user.id,
        // 添加 drugCode
        drugCode: params.drugCode,
        // 添加创建时间
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }

    MyDB('tb_shopping_cart')
        .insert(params)
        .then(response => {
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData });
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData });
        })
})

/**
 * select 购物车
 */
app.get('/shoppingCart', (req, res) => {
    let resData = {
        data: [],
    }
    // FIXME: 目前没有计算一个品种的数量, 需要根据条数自己计算
    MyDB
        .select('*')
        .from('tb_shopping_cart')
        .leftJoin('tb_drug_catelogue', 'tb_shopping_cart.drugCode', 'tb_drug_catelogue.drugCode')
        .leftJoin('tb_drug_detail', 'tb_shopping_cart.drugCode', 'tb_drug_detail.drugCode')
        .then(async response => {
            resData.data = response || []
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData });
        })
})

/**
 * delete 购物车
 */
app.delete('/shoppingCart', (req, res) => {
    let params = req.body || {}
    let resData = {}
    let drugCode = params.drugCode

    // 先查出第一个, 然后删除
    MyDB('tb_shopping_cart')
        .select()
        .where('drugCode', drugCode)
        .limit(1)
        .then(response => {
            let _first_id = response[0].id
            if (_first_id) {
                MyDB('tb_shopping_cart')
                    .del()
                    .where('id', _first_id)
                    .then(response => {
                        return res.status(200).send({ code: 200, msg: '操作成功！', data: resData });
                    })
                    .catch(err => {
                        return res.status(400).send({ code: 400, msg: err, data: resData });
                    })

            }
            // return res.status(200).send({ code: 200, msg: '操作成功！', data: resData });
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData });
        })

})


/**
 * insert 确认后生成的订单
 */
app.post('/order', async (req, res) => {
    let params = req.body || {}
    let resData = {}

    // 添加 useId
    const _user = req.auth.user

    let orderCode = await MyDB('tb_drug_order')
        .max('id', { as: 'id' })
    orderCode = orderCode[0].id || 0
    if (`${orderCode}`.length < 13) {
        orderCode = 1_000_000_000_000 + orderCode
    }

    // 获取要生成订单的商品 params.list, params 最终构建为数组
    params = (params.list || []).map(item => {
        const obj = {
            // 添加 useId
            userId: _user.id,
            // 订单编号 orderCode
            orderCode: orderCode,
            // 添加 drugCode
            drugCode: item.drugCode,
            // 添加 price
            price: item.price,
            // 添加创建时间 createTime
            createTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }

        return obj
    })

    MyDB('tb_drug_order')
        .insert(params)
        .then(response => {
            // TODO: 生成订单后 移除购物车内商品
            MyDB('tb_shopping_cart')
                .where('userId', _user.id)
                .del()
                .then(_res => {
                    console.log("🚀 ~ app.post ~ _res:", _res)

                })
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData });
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData });
        })

})

/**
 * select 通过 drugCode 查询药品类别及药品明细
 */
app.get('/drugDetail', async (req, res) => {
    let params = req.query || {}
    let { drugCode } = params
    let resData = {}

    await MyDB('tb_drug_detail')
        .select()
        .where('drugCode', drugCode)
        .then(response => {
            resData = response[0] || {}
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData })
        })
})

/**
 * tb_drug_detail 修改价格, 没有就新增,有就修改
 */
app.post('/drugDetail', async (req, res) => {
    let params = req.body || {}
    let resData = {}
    let _user = req.auth.user
    // 参数处理
    params = {
        drugCode: params.drugCode,
        // imgUrl: params., // 图片未处理
        price: params.price,
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        remark: params.remark
    }

    const isDrug = await MyDB('tb_drug_detail')
        .select()
        .where("drugCode", params.drugCode)
    // 结果为数组, 如果有 isDrug[0] 视为找到了值
    // 如果有 编辑
    if (isDrug[0]) {
        MyDB('tb_drug_detail')
            .where("drugCode", params.drugCode)
            .update(params)
            .then(response => {
                return res.status(200).send({ code: 200, msg: '编辑操作成功！', data: resData });
            })
            .catch(err => {
                return res.status(400).send({ code: 400, msg: err, data: resData });
            })
    } else {
        // 如果没有 新增
        MyDB('tb_drug_detail')
            .insert(params)
            .then(response => {
                return res.status(200).send({ code: 200, msg: '新增操作成功！', data: resData });
            })
            .catch(err => {
                return res.status(400).send({ code: 400, msg: err, data: resData });
            })
    }



    // params = {
    //     // 添加用户id, 来自JWT, 可以从 req.auth.user 中获取(token 解析)
    //     userId: _user.id,
    //     // 添加 drugCode
    //     drugCode: params.drugCode,
    //     // 添加创建时间
    //     createTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    // }

    // MyDB('tb_shopping_cart')
    //     .insert(params)
    //     .then(response => {
    //         return res.status(200).send({ code: 200, msg: '操作成功！', data: resData });
    //     })
    //     .catch(err => {
    //         return res.status(400).send({ code: 400, msg: err, data: resData });
    //     })
})

/**
 * select 查询订单列表
 */
app.get('/orderList', (req, res) => {
    let _user = req.auth.user
    let _userId = _user.id
    let resData = {}

    MyDB('tb_drug_order')
        .select()
        .where('userId', _userId)
        .orderBy('createTime', 'desc')
        .then(response => {
            resData = response || []
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData })
        })

})


/**
 * select 通过订单id查询详情(多个药品明细)
 */
app.get('/orderDetail', (req, res) => {
    let params = req.query || {}
    let { id } = params
    let resData = {}

    MyDB('tb_drug_order')
        .select()
        .where('id', id)
        .then(response => {
            resData = response[0] || {}
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData })
        })
})

/**
 * select 查询库存药品明细列表
 */
