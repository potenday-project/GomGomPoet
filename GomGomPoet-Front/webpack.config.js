const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);
    config.devServer= {
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        },
        compress: false
    };
    return config;
};