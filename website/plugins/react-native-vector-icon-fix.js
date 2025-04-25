module.exports = function () {
    return {
        name: 'react-native-vector-icon-fix',
        configureWebpack(config, isServer, utils) {
            console.log('Configuring Webpack for react-native-vector-icon-fix...');
            return {
                resolve: {
                    mainFields: ['browser', 'module', 'main'],
                    extensions: ['.wasm', '.mjs', '.web.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
                },
            };
        },
    };
};