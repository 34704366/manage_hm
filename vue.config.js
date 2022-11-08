const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
}

module.exports = {
    // 配置alias
    chainWebpack: config => {
        config.resolve.alias
        .set('@', resolve('./src'))
        .set('utils',resolve('src/utils'))
    }
}