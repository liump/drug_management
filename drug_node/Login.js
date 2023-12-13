/**
 * drug login modules
 */
const app = require('./app.js')
const MyDB = require('./MyDB.js')

const TB_NAME = 'tb_user'

// JWT
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'login2023'

app.post('/login', async (req, res) => {
  let params = req.body || {}
  let resData = {}
  let selectColumn = ['userName', 'nickName', 'role', 'createTime', 'lastLoginTime', 'remark']
  
  // 校验密码, 如果校验成功, 生成jwt
  MyDB(TB_NAME)
    .select(...selectColumn)
    .where('userName', params.userName)
    .andWhere('userPassword', params.userPassword)
    .then(response => {
      // 参数1: 生成到token中的信息
      // 参数2: 密钥
      // 参数3: token的有效时间: 60, "2 days", "10h", "7d"
      const token = jwt.sign(
        { user: response[0] },
        SECRET_KEY,
        { expiresIn: '1h' }
      )

      resData.userInfo = response[0]
      resData.token = token

      return res.status(200).send({ code: 200, msg: '操作成功', data: resData })
    })
    .catch(err => {
      return res.status(400).send({ code: 400, msg: err, data: resData })
    })

})