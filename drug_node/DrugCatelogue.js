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
      // 其他操作...
      return res.status(200).send({code: 200, msg: '上传成功！'});
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
const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/uploads/drugCode.xlsx`));
let excelSource = workSheetsFromBuffer[0].data.filter(el => el.length > 0)
let excelColumn = excelSource[2]
console.log("🚀 ~ file: DrugCatelogue.js:48 ~ excelColumn:", excelColumn)
let excelData = excelSource.slice(3)
console.log("🚀 ~ file: DrugCatelogue.js:50 ~ excelData:", excelData)

/**
 * read excel end
 */