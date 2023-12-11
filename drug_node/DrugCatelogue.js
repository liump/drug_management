/**
 * upload start
 */
const app = require('./app.js')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 指定保存路径为当前工作目录下的uploads文件夹
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
});
const upload = multer({ storage });

// 药品分类 上传药品本位码
app.post('/drugCatelogue/upload', upload.single('file'), function (req, res, next) {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded!');
  } else {
    console.log(`File ${file.originalname} is successfully uploaded.`);
    // 读取 excel
    let loadData = handleLoadData(file.originalname)
    // TODO： 清空数据表

    // 插入数据表
    handleInsertData(loadData.excelData)

    return res.status(200).send({ code: 200, msg: '上传成功！' });
  }
});

/**
 * upload end
 */

/**
 * read excel start
 */
// import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default;
var xlsx = require('node-xlsx')
var fs = require('fs')

// Parse a buffer
function handleLoadData(fileName) {
  const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/uploads/${fileName}`));
  let excelSource = workSheetsFromBuffer[0].data.filter(el => el.length > 0)
  let excelColumn = excelSource[2]
  let excelData = excelSource.slice(3)

  return {
    excelColumn: excelColumn,
    excelData: excelData
  }
}

/**
 * read excel end
 */
const MyDB = require('./modeling.js')

function handleInsertData(excelData) {

  // 数据处理
  let insertData = excelData.map(el => {
    let obj = {
      // id: el[0],
      approvalNumber: el[1],
      drugName: el[2],
      dosage: el[3],
      specifications: el[4],
      holder: el[5],
      productionUnit: el[6],
      drugCode: el[7],
      remark: el[8]
    }

    // if (el[0]) {
    //   obj.id = el[0]
    // }
    // if (el[1]) {
    //   obj.approvalNumber = el[1]
    // }
    // if (el[2]) {
    //   obj.drugName = el[2]
    // }
    // if (el[3]) {
    //   obj.dosage = el[3]
    // }
    // if (el[4]) {
    //   obj.specifications = el[4]
    // }
    // if (el[5]) {
    //   obj.holder = el[5]
    // }
    // if (el[6]) {
    //   obj.productionUnit = el[6]
    // }
    // if (el[7]) {
    //   obj.drugCode = el[7]
    // }
    // if (el[8]) {
    //   obj.remark = el[8]
    // }
    return obj
  })
  console.log("🚀 ~ file: DrugCatelogue.js:87 ~ insertData ~ insertData:", insertData)

  // 执行
  MyDB('tb_drug_catelogue')
    .insert(insertData)
    .then(() => console.log("Data inserted successfully."))
    .catch((error) => console.log(`Error occurred while inserting the data: ${error}`));

}

// list query
app.get('/drugCatelogue', {}, function (req, res, next) {

  // return res.status(200).send({ code: 200, msg: '上传成功！' });
});