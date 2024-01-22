/**
 * upload start
 */
const app = require('./app.js')
const multer = require('multer');
const dayjs = require('dayjs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 指定保存路径为当前工作目录下的uploads文件夹
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = dayjs().format('YYYY-MM-DD')
    // drugCode
    let originalname = file.originalname.split('.')
    // originalname[0]: drugCode, originalname[1]: xlsx
    let fileName = `${originalname[0]}_${uniqueSuffix}.${originalname[1]}`
    cb(null, fileName)
  }
});
const upload = multer({ storage });

// 药品分类 上传药品本位码
app.post('/drugCatelogue/upload', upload.single('file'), async (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded!');
  } else {
    // 清空数据表 // 调用函数并传入需要清空的表格名称
    await truncateTable('tb_drug_catelogue');

    console.log(`File ${file.filename} is successfully uploaded.`);
    // 读取 excel
    let loadData = await handleLoadData(file.filename)

    // 插入数据表
    await handleInsertData(loadData.excelData)

    return res.status(200).send({ code: 200, msg: '上传成功！' });
  }
});
// 删除指定表格中所有记录
async function truncateTable(tableName) {
  try {
      await MyDB(tableName).truncate();
      console.log(`成功清空 ${tableName} 表`);
  } catch (error) {
      console.error(`清空 ${tableName} 表失败`, error);
  }
}

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

/**
 * get excel data start
 */
const MyDB = require('./MyDB.js')

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
    return obj
  })

  // 执行
  MyDB('tb_drug_catelogue')
    .insert(insertData)
    .then(response => {
      console.log("🚀 ~ file: DrugCatelogue.js:97 ~ handleInsertData ~ response: insert success")
    })
    .catch((error) => {
      console.error("🚀 ~ file: DrugCatelogue.js:100 ~ handleInsertData ~ response: insert error")
    });

}

/**
 * get excel data end
 */
