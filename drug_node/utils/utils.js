const crypto = require('crypto');

module.exports = {
    // 获取唯一的订单编码
    generateOrderCode: function generateOrderCode(timestamp) {
        timestamp = timestamp || Date.now()
        // 生成一个随机字符串作为编码前缀
        const prefix = crypto.randomBytes(8).toString('hex');
        // 将订单ID和时间戳拼接到编码前缀后面
        const code = `${prefix}${timestamp}`;
        // 对编码进行哈希处理，确保唯一性
        const hash = crypto.createHash('sha256').update(code).digest('hex');
        return hash;
    }

}


