

module.exports = function () {
    return {
        name: 'custom-docusaurus-plugin',
        configureWebpack(config, isServer, utils) {
            return {
                mergeStrategy: { 'resolve.extensions': 'replace' },
                resolve: {
                    extensions: ['.web.js', '.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
                },
            };
        },
    };
};