const marked = require('marked')

// 每一个loader 都要导出一个函数

module.exports = source => {
  console.log(source);

  // renturn 必须是一段js代码
  // return 'hello'
  // return "console.log('hello')"

  const html = marked(source)
  // // return html
  // return `module.exports = ${JSON.stringify(html)}`
  // // esm 也支持
  // return `export default ${JSON.stringify(html)}`

  // 返回 html 字符串，由另一个 loader 处理
  return html
}

