const commonConfig = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const path = require('path')


module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 静态资源路径
    open: true,
    hotOnly: true  // HMR 开启
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre'
      }
    ]
  }
})