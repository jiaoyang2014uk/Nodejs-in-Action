//代码清单12-3 webpack.config.js

const webpack = require('webpack');
module.exports = {
    module: {
        loaders: [{
            test: /\.jsx?$/, loaders: ['babel-loader']
        }]
    },
    entry: ['./app/index.jsx'],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/js',
        filename: 'app.js'
    }
}