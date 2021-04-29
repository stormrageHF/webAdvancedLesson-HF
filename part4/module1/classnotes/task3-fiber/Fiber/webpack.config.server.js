const path = require("path")
const nodeExternals = require("webpack-node-externals")  //作用：打包的时候跳过 node_module

module.exports = {
  target: "node",
  mode: "development",
  entry: "./server.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js"
  },
  module: { // 需要打包的模块
    rules: [
      {
        test: /\.js$/,  // 所有 .js 结尾的文件
        exclude: /node_modules/,  //  不处理 node_modules 
        use: {
          loader: "babel-loader" // babel-loader 来处理
        }
      }
    ]
  },
  externals: [nodeExternals()] // 不打包 node_modules
}
