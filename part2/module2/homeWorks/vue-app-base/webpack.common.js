const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin  = require('vue-loader/lib/plugin')
const CopyWebpackPlugin  = require('copy-webpack-plugin')


module.exports = {
  mode: "production",
  entry: './src/main.js',
  output: {
    filename: "[name].[hash:8].js",
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            esModule: false
          }
        }
      },
      {
        test:/\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue project',
      template: './public/index.html'
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns:[
        'public',
        'src/assets'
      ]
    })
  ]
}

