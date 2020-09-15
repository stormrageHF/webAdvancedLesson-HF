const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { HotModuleReplacementPlugin } = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

class MyPlugin {
  apply(compiler) { // apply 方法会在 webpack 启动时自动调用
    // console.log(compiler); // compiler 核心 包含此次构建的所有信息

    // 找到 emit 勾子（这是一个要将 assets 导入 output 的时候调用的勾子），tap 添加方法，第一个参数是 插件名字，第二个参数是回调函数
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation 是此次打包的上下文
      for (const name in compilation.assets) {
        // console.log(name); // 文件名字
        // console.log(compilation.assets[name].source()); // 文件内容
        // 处理 js
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '')  // 去掉开头的注释
          // 写回去
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length
          }
        }
      }
    })
  }
}

module.exports = (env,argv)=>{
  const config = {
    mode: 'none',
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist'),
      // publicPath: 'dist/'
    },
    devtool: 'source-map',
    devServer: {
      contentBase: ['./public'],
      proxy: {
        '/api':{
          // http://localhost:8080/api/users -> https://api.github.com/api/users
          target: 'https://api.github.com',
          // http://localhost:8080/api/users -> https://api.github.com/users
          pathRewrite: {
            '^/api': ''
          },
          // 不能用 localhost:8080 当主机名请求 github
          // 默认代理服务器会使用本地浏览器里的主机名 locahost：8080 作为代理主机名，公网服务器不认
          changeOrigin: true
        }
      },
      // hot: true,
      hotOnly: true
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            'html-loader',
            './markdown-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new htmlWebpackPlugin({
        title: 'ceshi-ceshi',
        meta: {
          viewport: 'width=device-width'
        },
        template: './src/index.html'
      }),
      new htmlWebpackPlugin({
        filename: 'test.html'
      }),
      // 开发阶段一般不用
      // new CopyWebpackPlugin({
      //   patterns: [{ from: "public", to: "dist" }]
      // }),
      new MyPlugin(),
      new HotModuleReplacementPlugin()
    ]
  }
  if(env === 'production'){
    config.mode = 'production'
    config.devtool = false
    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(['public'])
    ]
  }
  return config
}