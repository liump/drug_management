/**
 * drug bigScreen modules
 */
const app = require('./app.js')
const MyDB = require('./MyDB.js')

/**
 * select alert
 */
app.get('/bigScreen/alert', (req, res) => {
    let resData = {}

    MyDB.raw(`
        select 
            *,
            (select sum(total) total from tb_drug_input where drugCode = tb_alert.drugCode)
                -
            (select sum(total) total from tb_drug_output where drugCode = tb_alert.drugCode)   
                as resultTotal
        from tb_drug_inventory_alert tb_alert limit 0,6;
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
 * select input
 */
app.get('/bigScreen/input', (req, res) => {
    let resData = {}

    MyDB('tb_drug_input')
        // .select(["approvalNumber", " dosage", " drugCode", " drugName", " holder", " productionUnit", " specifications", " total"])
        .select()
        .orderBy('createTime', 'desc')
        .limit(5)
        .then(response => {
            resData = response
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData })
        })
})

/**
 * select output
 */
app.get('/bigScreen/output', (req, res) => {
    let resData = {}

    MyDB('tb_drug_output')
        .select()
        .orderBy('createTime', 'desc')
        .limit(5)
        .then(response => {
            resData = response
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData })
        })
})

/**
 * select catelogue
 */
app.get('/bigScreen/catelogue', (req, res) => {
    let resData = {}

    MyDB('tb_drug_catelogue')
        .select('dosage')
        .count('*', {as: 'count'})
        .groupBy('dosage')
        .then(response => {
            resData = response
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData })
        })
})

/**
 * select output Top10
 */
app.get('/bigScreen/outputTop10', (req, res) => {
    let resData = {}

    MyDB('tb_drug_output')
        .select()
        .orderBy('total', 'desc')
        .limit(10)
        .then(response => {
            resData = response
            return res.status(200).send({ code: 200, msg: '操作成功！', data: resData })
        })
        .catch(err => {
            return res.status(400).send({ code: 400, msg: err, data: resData })
        })
})