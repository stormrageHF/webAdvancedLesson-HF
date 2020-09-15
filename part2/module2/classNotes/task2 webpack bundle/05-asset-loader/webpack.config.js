module.exports = {
  entry: "./src/main.css",
  output: {
    filename: "bundle.js"
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /.css$/,  // 匹配 css 结尾的文件 
        use: ['style-loader','css-loader'] // 处理文件用的loader 倒序 先用的在后面
      }
    ]
  }
}