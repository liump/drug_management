/**
 * drug user modules
 */
const app = require('./app.js')
const MyDB = require('./MyDB.js')
const dayjs = require('dayjs')

const TB_NAME = 'tb_drug_inventory_alert'

/**
 * select
 */
app.get('/inventoryAlert', (req, res) => {
    let params = req.query || {}
    let { pageNo, pageSize, drugName } = params
    let resData = {
        pageNo: pageNo,
        pageSize: pageSize,
        data: [],
        total: 0
    }
    MyDB(TB_NAME)
        .select()
        .whereLike('drugName', `%${drugName || ''}%`)
        .limit(pageSize)
        .offset((pageNo - 1) * pageSize)
        .then(async response => {
            let total = await MyDB(TB_NAME).count('id')
            resData.data = response || []
            resData.total = total[0][`count('id')`] || 0
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData });
        })
})

/**
 * insert
 */
app.post('/inventoryAlert', (req, res) => {
    let params = req.body || {}
    let resData = {}
    // add createTime
    params.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    MyDB(TB_NAME)
        .insert(params)
        .then(response => {
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData });
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData });
        })
})

/**
 * update
 */
app.put('/inventoryAlert', (req, res) => {
    let params = req.body || {}
    let resData = {}
    let id = params.id
    delete params.id

    MyDB(TB_NAME)
        .update(params)
        .where('id', id)
        .then(response => {
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData });
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData });
        })
})

/**
 * delete
 */
app.delete('/inventoryAlert', (req, res) => {
    let params = req.body || {}
    let resData = {}
    let id = params.id
    MyDB(TB_NAME)
        .del()
        .where('id', id)
        .then(response => {
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData });
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData });
        })
})