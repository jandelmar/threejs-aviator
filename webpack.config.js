const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: {
        vendor: ['three'],
        app: path.resolve(__dirname, './js/app')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        // new MinifyPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true
    }
};