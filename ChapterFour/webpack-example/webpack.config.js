//代码清单4-2 一个webpack.config.js文件
const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: './app/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'bundle.js',
        // publicPath: '/assets/'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    // devServer: {
    //     static: {
    //         directory: path.join(__dirname, 'public')
    //     },
    //     port: 3001
    // }
}