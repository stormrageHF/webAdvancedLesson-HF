const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024 // 10 kb
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            // attrs: ['img:src', 'a:href']  // 这个怎么会报错啊?
            attributes: {
              list: [
                {
                  tag: 'a',
                  attribute: 'href',
                  type: 'src'
                },
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src'
                }
              ]
            }
          }
        }
      }
    ]
  }
}