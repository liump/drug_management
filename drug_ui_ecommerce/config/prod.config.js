const { baseUrl } = require('./api.config.js')

module.exports = {
    '/api': {
        target: baseUrl,
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
    },
}
