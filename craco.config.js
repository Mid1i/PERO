const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@api': resolvePath('./src/api'),
            '@assets': resolvePath('./src/assets'),
            '@components': resolvePath('./src/components'),
            '@hooks': resolvePath('./src/hooks'),
            '@pages': resolvePath('./src/pages'),
            '@services': resolvePath('./src/services'),
            '@utils': resolvePath('./src/utils'),
        }
    },
}