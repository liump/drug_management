/**
 * drug role modules
 */
const app = require('../app.js')
const MyDB = require('../MyDB.js')
const dayjs = require('dayjs')

const TB_NAME = 'tb_role'

/**
 * select
 */
app.get('/role', (req, res) => {
    let params = req.query || {}
    let { currentPage, pageSize, userName } = params
    let resData = {
        currentPage: currentPage,
        pageSize: pageSize,
        data: [],
        total: 0
    }
    MyDB(TB_NAME)
        .select()
        .whereLike('roleName', `%${userName || ''}%`)
        .orderBy('createTime', 'desc')
        .limit(pageSize)
        .offset((currentPage - 1) * pageSize)
        .then(async response => {
            let total = await MyDB(TB_NAME).count()
            for (const key in total[0]) {
                    total = total[0][key]
            }
            resData.data = response || []
            resData.total = total
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData });
        })
})

/**
 * insert
 */
app.post('/role', (req, res) => {
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
app.put('/role', (req, res) => {
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
app.delete('/role', (req, res) => {
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