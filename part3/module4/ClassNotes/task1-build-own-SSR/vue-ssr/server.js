const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('./build/setup-dev-server')

const server = express()
// 修改路径
server.use('/dist', express.static('./dist'))

const isProd = process.env.NODE_ENV === 'production'
let renderer
let onReady
if (isProd) {
  const template = fs.readFileSync('./index.template.html', 'utf-8')
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
  })
} else {
  // 开发模式 --> 监视代码自动打包构建 --> 重新生成 renderer
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest
    })
  })
}


const render = async (req, res) => {
  try {
    // 把 vue 渲染成字符串
    const html = await renderer.renderToString({
      title: '测试测试',
      meta: `<meta name="description" content="测试测试">`,
      url: req.url
    })
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end(html)
  } catch (err) {
    res.status(500).end('Internal Server Error.')
  }

}
// 服务端路由设置为*，意味着所有的路由都会进入这里
server.get('*', isProd ?
  render :
  async (req, res) => {
    // 等待有了 renderer 渲染器以后，调用render
    await onReady
    render(req, res)
  })

server.listen(3000, () => {
  console.log('server running at port 3000.');
})







