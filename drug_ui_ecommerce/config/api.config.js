// const PRODUCTION = 'production'

// true：生产环境
// const isProd = process.env.NODE_ENV === PRODUCTION || process.env.PROD_ENV === PRODUCTION

// docker api配置
const NODE_PRO_URL = process.env.NODE_PRO_URL

// host api 配置
const HOST_URL = '127.0.0.1'

// 生产环境URL
const proUrl = NODE_PRO_URL || `http://${HOST_URL}:3000`

const baseUrl = proUrl

module.exports = {
  // isProd,
  baseUrl,
}
