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
            ii.total - COALESCE(io.total, 0) AS balance  
        FROM  
            tb_drug_catelogue dc  
        LEFT JOIN  
            tb_drug_input ii ON dc.drugCode = ii.drugCode  
        LEFT JOIN  
            tb_drug_output io ON dc.drugCode = io.drugCode
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
    // add createTime
    params.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

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

    // TODO: 先查出第一个, 然后删除
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
    // add createTime
    params.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    let orderCode = await MyDB('tb_drug_order')
        .max('id', { as: 'id' })
    let _id = orderCode[0].id || 0
    if (`${_id}`.length < 13) {
        _id = 1_000_000_000_000 + _id
        params.orderCode = `${_id}`
    }

    if (params.orderCode) {
        MyDB('tb_drug_order')
            .insert(params)
            .then(response => {
                return res.status(200).send({ code: 200, msg: '操作成功！', data: resData });
            })
            .catch(err => {
                return res.status(400).send({ code: 400, msg: err, data: resData });
            })
    }

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
 * select 查询订单列表
 */
app.get('/orderList', (req, res) => {
    let _user = req.auth.user
    let _userId = _user.id
    let resData = {}

    MyDB('tb_drug_order')
        .select()
        .where('userId', _userId)
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
