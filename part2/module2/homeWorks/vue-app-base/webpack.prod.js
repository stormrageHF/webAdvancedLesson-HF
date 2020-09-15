const commonConfig = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'production',
  // devtool: 'nosources-source-map', 
  devtool: 'none',
  plugins: [
    new CleanWebpackPlugin()
  ]
})