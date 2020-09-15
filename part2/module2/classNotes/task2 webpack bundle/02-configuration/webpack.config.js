const path = require('path')

module.exports = {
  entry: "./src/main.js", //  入口
  output: {  // 出口
    filename: "bundle.js",
    path: path.join(__dirname, 'output')
  }
}

