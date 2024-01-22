const app = require('../app.js')
const MyDB = require('../MyDB.js')


// list query
app.get('/drugCatelogue', function (req, res, next) {
  // get query params, like { currentPage: '1', pageSize: '10', drugName: '片' }
  let queryParams = req.query || {}
  let currentParams = queryParams.currentPage - 1
  let sizeParams = queryParams.pageSize
  let resData = {
    currentPage: currentParams + 1,
    pageSize: sizeParams,
    data: [],
    total: 0
  }
  // select list for pageNo， pageSize and drugName
  MyDB('tb_drug_catelogue')
    .select('*')
    // .where(queryParams)
    .whereLike('drugName', `%${queryParams.drugName || ''}%`)
    .limit(sizeParams)
    .offset(currentParams * sizeParams)
    .then(async (response) => {
      resData.data = response

      let total = await MyDB('tb_drug_catelogue').count()
      resData.total = total[0][`count(*)`] || 0

      return res.status(200).send({ code: 200, msg: 'success', data: resData });

    })
    .catch((error) => {
      console.log("🚀 ~ file: DrugCatelogue.js:126 ~ error:", error)
      return res.status(400).send({ code: 400, msg: error, data: resData });
    });


});