# 渲染一个vue实例
mkdir vue-ssr
cd vue-ssr
yarn init -y
yarn add vue vue-server-renderer
create server.js file

```
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
  template: `<div id="app">
               <h1>{{ message }}</h1>     
             </div>`,
  data: {
    message: 'test hf'
  }
})
// 把 vue 渲染成字符串
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html); // <div id="app" data-server-rendered="true"><h1>test hf</h1></div>
})
```
命令行 node server.js 


# 结合到 web 服务中
yarn add express
用 express 创建一个 server
用server 启动一个服务，端口 3000，请求地址 '/'
请求返回html
启动服务 nodemon server.js
```
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const express = require('express')

const server = express()
server.get('/', (req, res) => {
  const app = new Vue({
    template: `<div id="app">
               <h1>{{ message }}</h1>     
             </div>`,
    data: {
      message: 'test 韩飞'
    }
  })
  // 把 vue 渲染成字符串
  renderer.renderToString(app, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
   //  console.log(html); // <div id="app" data-server-rendered="true"><h1>test hf</h1></div>
    res.end(html)
  })
})

server.listen(3000, ()=>{
  console.log('server running at port 3000.');
})
```
打开浏览器，访问地址 localhost:3000
观察是否有html字符串返回

中文显示乱码错误
解决方案1：res.header 设置utf8编码
```
res.setHeader('Content-Type','text/html;charset=utf8')
```
解决方案2：返回html模板, meta 中设置编码
```
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name = "viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `)
```
建议：header 和 meta 都设置

# 使用 html 模板
创建 index.tamplate.html 文件定义模板，内容数据替换部分需要标记一个注释 <!--vue-ssr-outlet-->
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name = "viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!--vue-ssr-outlet-->
</body>
</html>
```
使用 fs 读取本地模板
```
...
const fs = require('fs')

const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8')
})
...
    res.end(html)
...
```

# 在模板中使用外部数据
1. 修改模板，需要使用外部数据的地方替换 {{}}
变量用 {{}} 标签用 {{{}}}
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name = "viewport" content="width=device-width, initial-scale=1.0">
  {{{ meta }}}
  <title>{{ title }}</title>
</head>
<body>
  <!--vue-ssr-outlet-->
</body>
</html>
```
2. renderToString 第二个参数传入数据对象
```
  renderer.renderToString(app, {
    title: '测试测试',
    meta: `<meta name="description" content="测试测试">`
  }, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
    // console.log(html); // <div id="app" data-server-rendered="true"><h1>test hf</h1></div>
    // res.setHeader('Content-Type','text/html;charset=utf8')
    res.end(html)
  })
```
3. 重启服务


# 构建配置-基本思路
动态绑定，数据响应式默认是不会出现在ssr的，从上面的demo 中可以看出，浏览器获取的是html字符串，根本不涉及到任何js代码；
所以就算你写了vue的数据响应代码，服务器渲染不会带这种交互功能的，毕竟最后给浏览器的只是一串 html 字符串，单纯的静态展示；
可以参考官网 https://ssr.vuejs.org/zh/guide/structure.html#%E4%BB%8B%E7%BB%8D%E6%9E%84%E5%BB%BA%E6%AD%A5%E9%AA%A4


# 构建配置-源码结构
主要目的是为了同构应用，需要打包出两个主要的js，参考文档 https://ssr.vuejs.org/zh/guide/structure.html#%E4%BD%BF%E7%94%A8-webpack-%E7%9A%84%E6%BA%90%E7%A0%81%E7%BB%93%E6%9E%84
```
一个基本项目可能像是这样：

src
├── components
│   ├── Foo.vue
│   ├── Bar.vue
│   └── Baz.vue
├── App.vue
├── app.js # 通用 entry(universal entry)
├── entry-client.js # 仅运行于浏览器
└── entry-server.js # 仅运行于服务器
```
所以这一节的目的主要是实现不同的入口（entry）文件，以及标准的源码结构
接下来需要创建目录 src， src下需要创建几个文件
源文件 App.vue
```
<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <h2>客户端动态交互</h2>
    <div>
      <input v-model="message">
    </div>
    <div>
      <button @click="onClick">点击测试</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      message: '韩飞'
    }
  },
  methods: {
    onClick(){
      console.log('Hello World!');
    }
  }
}
</script>

<style>

</style>
```
通用入口文件 app.js
```
/**
 * 通用启动入口
*/
import Vue from 'vue'
import App from './App.vue'

// 导出一个工厂函数，用于创建新的
// 应用程序，router 和 store 实例
export function createApp() {
  const app = new Vue({
    // 根实例简单的渲染应用程序组件
    render: h => h(App)
  })
  return { app }
}
```
客户端入口文件 entry-client.js
```
/**
 * 客户端入口
*/

import { createApp } from './app'

// 客户端特定引导逻辑

const { app } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app')
```
服务端入口文件 entry-server.js
```
/**
 * 服务端启动入口
*/

import { createApp } from './app'

export default context => {
  const { app } = createApp()
  // 服务端路由处理，数据预取
  return app
}
```

# 构建配置-安装依赖
上面源码和入口文件都准备好了，接下来就是安装依赖准备打包构建
1. 安装生产依赖
npm i vue vue-server-renderer express cross-env

包                         说明
vue Vue.js                 核心库
vue-server-renderer Vue    服务端渲染工具
express                    基于 Node 的 Web 服务框架
cross-env                  通过 npm scripts 设置跨平台环境变量

2. 安装开发依赖
npm i -D webpack webpack-cli webpack-merge webpack-node-externals @babel/core @babel/plugin-transform-runtime @babel/preset-env babel-loader css-loader url-loader file-loader rimraf vue-loader vue-template-compiler friendly-errors-webpack-plugin

包                              说明
webpack                         webpack 核心包
webpack-cli                     webpack 的命令行工具
webpack-merge webpack           配置信息合并工具
webpack-node-externals          排除 webpack 中的 Node 模块
rimraf                          基于 Node 封装的一个跨平台 rm -rf 工具
friendly-errors-webpack-plugin  友好的 webpack 错误提示

@babel/core                     Babel 相关工具
@babel/plugin-transform-runtime
@babel/preset-env
babel-loader

vue-loader
vue-template-compiler           处理 .vue 资源

file-loader                     处理字体资源
css-loader                      处理 CSS 资源
url-loader                      处理图片资源

# 构建配置-webpack 配置文件
（1）初始化 webpack 打包配置文件
build 
├── webpack.base.config.js # 公共配置 
├── webpack.client.config.js # 客户端打包配置文件 
└── webpack.server.config.js # 服务端打包配置文件

webpack.base.config.js
```
/*** 公共配置 */
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: resolve('../dist/'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      // 路径别名，@ 指向 src 
      '@': resolve('../src/')
    },
    // 可以省略的扩展名 
    // 当省略扩展名的时候，按照从前往后的顺序依次解析 
    extensions: ['.js', '.vue', '.json']
  },
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: [
      // 处理图片资源 
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192, },
          },
        ],
      },
      // 处理字体资源 
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader',],
      },
      // 处理 .vue 资源 
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 处理 CSS 资源
      // 它会应用到普通的 `.css` 文件 
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      // CSS 预处理器，参考：https://vue-loader.vuejs.org/zh/guide/pre-processors.html 
      // 例如处理 Less 资源 
      // {
      //   test: /\.less$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     'less-loader'
      //   ]
      // },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
}
```
webpack.client.config.js
```
/*** 客户端打包配置 */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
module.exports = merge(baseConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  module: {
    rules: [
      // ES6 转 ES5 
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
    ]
  },
  // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中， 
  // 以便可以在之后正确注入异步 chunk。 
  optimization: {
    splitChunks: {
      name: "manifest", minChunks: Infinity
    }
  },
  plugins: [
    // 此插件在输出目录中生成 `vue-ssr-client-manifest.json`。 
    new VueSSRClientPlugin()
  ]
})
```
webpack.server.config.js
```
/*** 服务端打包配置 */
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
module.exports = merge(baseConfig, {
  // 将 entry 指向应用程序的 server entry 文件
  entry: './src/entry-server.js',
  // 这允许 webpack 以 Node 适用方式处理模块加载 
  // 并且还会在编译 Vue 组件时， 
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。 
  target: 'node',
  output: {
    filename: 'server-bundle.js',
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports) 
    libraryTarget: 'commonjs2'
  },
  // 不打包 node_modules 第三方包，而是保留 require 方式直接加载 
  externals: [nodeExternals({
    // 白名单中的资源依然正常打包 
    allowlist: [/\.css$/]
  })],
  plugins: [
    // 这是将服务器的整个输出构建为单个 JSON 文件的插件。 
    // 默认文件名为 `vue-ssr-server-bundle.json`
    new VueSSRServerPlugin()
  ]
})
```

# 构建配置-配置构建命令

```
  "scripts": { 
    "build:client": "cross-env NODE_ENV=production webpack --config build/webpack.client.config.js", 
    "build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.config.js", 
    "build": "rimraf dist && npm run build:client && npm run build:server" 
  },
```
rm -rf dist 删除 dist 目录，rimraf 是删除文件用的

# 构建配置-启动应用
需改 server.js
```
const Vue = require('vue')
const express = require('express')
const fs = require('fs')

const template = fs.readFileSync('./index.template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  template,
  clientManifest
})

const server = express()
// 修改路径
server.use('/dist', express.static('./dist'))
server.get('/', (req, res) => {

  // 把 vue 渲染成字符串
  renderer.renderToString({
    title: '测试测试',
    meta: `<meta name="description" content="测试测试">`
  }, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
    // console.log(html); // <div id="app" data-server-rendered="true"><h1>test hf</h1></div>
    // res.setHeader('Content-Type','text/html;charset=utf8')
    res.end(html)
  })
})

server.listen(3000, () => {
  console.log('server running at port 3000.');
})
```

# 构建配置-解析渲染流程

# 构建配置开发模式-基本思路

实现功能：自动构建，自动打包，自动刷新网页
1. 修改 package.json
```
    "start": "cross-env NODE_ENV=production node server.js",
    "dev": "node server.js"
```
2. 修改 server.js
```
const Vue = require('vue')
const express = require('express')
const fs = require('fs')

const isProd = process.env.NODE_ENV === 'production'
let renderer 
if (isProd) {
  const template = fs.readFileSync('./index.template.html', 'utf-8')
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
    template,
    clientManifest
  })
} else {
  // 开发模式 --> 监视代码自动打包构建 --> 重新生成 renderer

}

const server = express()
// 修改路径
server.use('/dist', express.static('./dist'))

const render = (req, res) => {

  // 把 vue 渲染成字符串
  renderer.renderToString({
    title: '测试测试',
    meta: `<meta name="description" content="测试测试">`
  }, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
    // console.log(html); // <div id="app" data-server-rendered="true"><h1>test hf</h1></div>
    // res.setHeader('Content-Type','text/html;charset=utf8')
    res.end(html)
  })
}
server.get('/', isProd ? render : (req,res) => {
  // 等待有了 renderer 渲染器以后，调用render
  render()
})

server.listen(3000, () => {
  console.log('server running at port 3000.');
})
```

# 构建配置开发模式-提取处理模块
1. 修改 server.js 文件
```
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
  onReady = setupDevServer(server, (serverBundle, template, clientManifest)=>{
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest
    })
  })
}


const render = (req, res) => {

  // 把 vue 渲染成字符串
  renderer.renderToString({
    title: '测试测试',
    meta: `<meta name="description" content="测试测试">`
  }, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
    // console.log(html); // <div id="app" data-server-rendered="true"><h1>test hf</h1></div>
    // res.setHeader('Content-Type','text/html;charset=utf8')
    res.end(html)
  })
}
server.get('/', isProd ? render : async (req,res) => {
  // 等待有了 renderer 渲染器以后，调用render
  await onReady
  render()
})

server.listen(3000, () => {
  console.log('server running at port 3000.');
})
```
2. 创建 build/setup-dev-server.js 文件
```
module.exports = (server, callback)=>{
  const onReady = new Promise()
  
  return onReady
}
```
# 构建配置开发模式-update更新函数

```
module.exports = (server, callback) => {
  let ready
  const onReady = new Promise(r => ready = r)
  // 监视构建 --> 更新renderer
  let template
  let serverBundle
  let clientManifest
  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready()
      callback(serverBundle, template, clientManifest)
    }
  }
  // 监视构建 template --> 调用 update --> 更新renderer渲染器
  // 监视构建 serverBundle --> 调用 update --> 更新renderer渲染器
  // 监视构建 clientManifest --> 调用 update --> 更新renderer渲染器

  return onReady
}
```

#  构建配置开发模式-处理模板文件
1. 通过 fs 和path 读取本地模板html 文件
2. 安装chokidar 监视模板html文件变化
3. 在首次读取文件和文件change时，调用 update 方法
```
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')

module.exports = (server, callback) => {
  let ready
  const onReady = new Promise(r => ready = r)
  // 监视构建 --> 更新renderer
  let template
  let serverBundle
  let clientManifest
  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready()
      callback(serverBundle, template, clientManifest)
    }
  }
  // 监视构建 template --> 调用 update --> 更新renderer渲染器
  const templatePath = path.resolve(__dirname, '../index.template.html')
  template = fs.readFileSync(templatePath, 'utf-8')
  update()
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })
  // 监视构建 serverBundle --> 调用 update --> 更新renderer渲染器
  // 监视构建 clientManifest --> 调用 update --> 更新renderer渲染器

  return onReady
}
```

# 构建配置开发模式-服务端监视打包
1. 引入webpack，通过webpack.server.config.js来构建，创建 compiler 对象，自带watch方法
2. 用fs 在 watch 回调函数中读取 vue-ssr-server-bundle.json 文件内容
3. 调用 update 方法
```
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const webapck = require('webpack')
const { json } = require('express')

const resolve = file => path.resolve(__dirname, file)

module.exports = (server, callback) => {
  let ready
  const onReady = new Promise(r => ready = r)
  // 监视构建 --> 更新renderer
  let template
  let serverBundle
  let clientManifest
  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready()
      callback(serverBundle, template, clientManifest)
    }
  }
  // 监视构建 template --> 调用 update --> 更新renderer渲染器
  const templatePath = path.resolve(__dirname, '../index.template.html')
  template = fs.readFileSync(templatePath, 'utf-8')
  update()
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })
  // 监视构建 serverBundle --> 调用 update --> 更新renderer渲染器
  const serverConfig = require('./webpack.server.config')
  const serverCompiler = webapck(serverConfig)
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    if (stats.hasErrors()) return
    serverBundle = JSON.parse(
      fs.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    )
    update()
  })
  // 监视构建 clientManifest --> 调用 update --> 更新renderer渲染器

  return onReady
}
```

#  构建配置开发模式-把数据写入内存中
1. 安装 webpack-dev-middleware
2. 导入这个包
3. 调用这个包
4. 选项关闭日志
5. 注销刚才的watch
6. 监听 serverCompiler 的done 钩子函数
7. 在这个钩子函数中从内存中读取配置文件
8. update
```
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const webapck = require('webpack')
const devMiddleware = require('webpack-dev-middleware')

const resolve = file => path.resolve(__dirname, file)

module.exports = (server, callback) => {
  let ready
  const onReady = new Promise(r => ready = r)
  // 监视构建 --> 更新renderer
  let template
  let serverBundle
  let clientManifest
  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready()
      callback(serverBundle, template, clientManifest)
    }
  }
  // 监视构建 template --> 调用 update --> 更新renderer渲染器
  const templatePath = path.resolve(__dirname, '../index.template.html')
  template = fs.readFileSync(templatePath, 'utf-8')
  update()
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })
  // 监视构建 serverBundle --> 调用 update --> 更新renderer渲染器
  const serverConfig = require('./webpack.server.config')
  const serverCompiler = webapck(serverConfig)
  const serverDevMiddleware = devMiddleware(serverCompiler, {
    logLevel: 'silent' // 关闭日志输出，统一由 FriendlyErrorsWebpackPlugin 处理
  })
  serverCompiler.hooks.done.tap('server', ()=>{
    serverBundle = JSON.parse(
      serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    )
    console.log(serverBundle);
    update()
  })
  // serverCompiler.watch({}, (err, stats) => {
  //   if (err) throw err
  //   if (stats.hasErrors()) return
  //   serverBundle = JSON.parse(
  //     fs.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
  //   )
  //   update()
  // })
  // 监视构建 clientManifest --> 调用 update --> 更新renderer渲染器

  return onReady
}
```

# 构建配置开发模式-客户端构建
和上一节类似
```
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const webapck = require('webpack')
const devMiddleware = require('webpack-dev-middleware')

const resolve = file => path.resolve(__dirname, file)

module.exports = (server, callback) => {
  let ready
  const onReady = new Promise(r => ready = r)

  // 监视构建 --> 更新renderer
  let template
  let serverBundle
  let clientManifest
  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready()
      callback(serverBundle, template, clientManifest)
    }
  }
  // 监视构建 template --> 调用 update --> 更新renderer渲染器
  const templatePath = path.resolve(__dirname, '../index.template.html')
  template = fs.readFileSync(templatePath, 'utf-8')
  update()
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })
  // 监视构建 serverBundle --> 调用 update --> 更新renderer渲染器
  const serverConfig = require('./webpack.server.config')
  const serverCompiler = webapck(serverConfig)
  const serverDevMiddleware = devMiddleware(serverCompiler, {
    logLevel: 'silent' // 关闭日志输出，统一由 FriendlyErrorsWebpackPlugin 处理
  })
  serverCompiler.hooks.done.tap('server', () => {
    serverBundle = JSON.parse(
      serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    )
    update()
  })
  // 监视构建 clientManifest --> 调用 update --> 更新renderer渲染器
  const clientConfig = require('./webpack.client.config')
  const clientCompiler = webapck(clientConfig)
  const clientDevMiddleware = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    logLevel: 'silent' // 关闭日志输出，统一由 FriendlyErrorsWebpackPlugin 处理
  })
  clientCompiler.hooks.done.tap('client', () => {
    clientManifest = JSON.parse(
      clientDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8')
    )
    console.log(clientManifest);
    update()
  })

  // 将 clientDevMiddleware 挂载倒 express 的服务中，提供对其内存中数据的访问
  server.use(clientDevMiddleware)

  return onReady
}
```
修改 server.js
```
server.get('/', isProd ?
  render :
  async (req, res) => {
    // 等待有了 renderer 渲染器以后，调用render
    await onReady
    render(req, res)
  })

```

# 构建配置开发模式-热更新
1. 安装 webpack-hot-middleware
2. add plugins
3. 修改 entry的app
4. 修改 filename
5. 挂载倒 server
6. 关闭 hmr 的日志
```
const hotMiddleware = require('webpack-hot-middleware')
...
  const clientConfig = require('./webpack.client.config')
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  clientConfig.entry.app = [
    'webpack-hot-middleware/client?quiet=true&reload=true', // 和服务端交互处理热更新一个客户端脚本
    clientConfig.entry.app
  ]
  clientConfig.output.filename = '[name].js' // 热更新模式下不hash
...
 server.use(hotMiddleware(clientCompiler, {
    log: false // 关闭日志
  }))
```

# 编写通用应用注意事项
# 配置vue-router
src/pages
src/router/index.js
```
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'

Vue.use(VueRouter)

export const createRouter = () => {
  const router = new VueRouter({
    mode: 'history', // 兼容前后端
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/About')
      },
      {
        path: '/posts',
        name: 'post-list',
        component: () => import('@/pages/Posts')
      },
      {
        path: '*',
        name: 'error404',
        component: () => import('@/pages/404')
      }
    ]
  })

  return router
}

```

#  路由处理-将路由注册到根实例
```
/**
 * 通用启动入口
*/
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index'

// 导出一个工厂函数，用于创建新的
// 应用程序，router 和 store 实例
export function createApp() {
  const router = createRouter()
  const app = new Vue({
    router, // 把路由挂载到Vue实例
    // 根实例简单的渲染应用程序组件
    render: h => h(App)
  })
  return { app, router }
}
```

# 路由处理-适配服务端入口
在 entry-server js文件中配置
```
// entry-server.js
import { createApp } from './app'

export default async context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  const { app, router } = createApp()

    // 设置服务器端 router 的位置
    router.push(context.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    await new Promise(router.onReady.bind(router))
    return app
}
```
# 路由处理-服务端server适配
修改 server js文件
```
const render = async (req, res) => {
  try {
    // 把 vue 渲染成字符串
    const html = await renderer.renderToString({
      title: '测试测试',
      meta: `<meta name="description" content="测试测试">`，
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
```

# 路由处理-适配客户端入口
entry-client js 文件
```
/**
 * 客户端入口
*/

import { createApp } from './app'

// 客户端特定引导逻辑

const { app, router } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
  app.$mount('#app')
})
```

# 路由处理-处理完成
App.vue 中添加路由出口
```
  <div id="app">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/posts">Posts</router-link>
      </li>
    </ul>

    <!-- 路由出口 -->
    <router-view />
  </div>
```
yarn dev 刷新浏览器查看网页是否正常工作
这里涉及到预加载
```
<html lang="en"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="测试测试">
  <title>测试测试</title>
<link rel="preload" href="/dist/app.5014669287e17a5ee372.js" as="script">
<link rel="prefetch" href="/dist/1.dc52b73a6dd7e9ea687b.js">
<link rel="prefetch" href="/dist/2.74f019e0b71de016680a.js">
<link rel="prefetch" href="/dist/3.5e42ed2db9ad457c5e54.js">
</head>
<body>
  <div id="app"><ul><li><a href="/" aria-current="page" class="router-link-exact-active router-link-active">Home</a></li> <li><a href="/about" class="">About</a></li> <li><a href="/posts" class="">Posts</a></li></ul> <div><h1>Home Page</h1></div></div>
  <script src="/dist/app.5014669287e17a5ee372.js" defer=""></script>

</body>
</html>
```
preload 提前下载js文件，但是不会解析加载它，真正开始解析加载是在后面的script标签里，所以不影响网页的渲染
prefetch 在浏览器空闲的时候，预加载资源，主要是其他页的资源，这个不稳定

#  管理页面Head内容

官方自带有，这里使用的是第三方的vuemeta
app.js 导入 VueMeta 安装，定义meta 模式
```
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - 拉钩教育'
  }
})
```
entry-server.js 中添加 meta 到 context 中
```
// entry-server.js
import { createApp } from './app'

export default async context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  const { app, router } = createApp()

  const meta = app.$meta()

  // 设置服务器端 router 的位置
  router.push(context.url)

  context.meta = meta

  // 等到 router 将可能的异步组件和钩子函数解析完
  await new Promise(router.onReady.bind(router))
  return app
}
```
index.template.html 中head中注入meta
```
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  {{{ meta.inject().title.text() }}}
  {{{ meta.inject().meta.text() }}}
</head>
```
在vue文件中添加meta的相关信息,Home.vue
```
export default {
  name: 'HomePage',
  metaInfo: {
    title: '首页'
  }
}
```
启动应用

# 数据预取和状态管理-思路分析
#  数据预取和状态管理-数据预取
store/index.js
```
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      posts: []
    }),

    mutations: {
      setPosts (state, data) {
        state.posts = data
      }
    },

    actions: {
      // 在服务端渲染期间务必让 action 返回一个 Promise
      async getPosts ({ commit }) {
        // return new Promise()
        const { data } = await axios.get('https://cnodejs.org/api/v1/topics')
        commit('setPosts', data.data)
      }
    }
  })
}
```
app.js
```
/**
 * 通用启动入口
*/
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index'
import VueMeta from 'vue-meta'
import { createStore } from './store/index'

Vue.use(VueMeta)
Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - 拉钩教育'
  }
})

// 导出一个工厂函数，用于创建新的
// 应用程序，router 和 store 实例
export function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router, // 把路由挂载到Vue实例
    store, // 把容器挂载到Vue实例
    // 根实例简单的渲染应用程序组件
    render: h => h(App)
  })
  return { app, router, store }
}
```
修改 posts.vue
```
<template>
  <div>
    <h1>Post List</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostList',
  metaInfo: {
    title: 'Posts'
  },
  data () {
    return {
      // posts: []
    }
  },
  computed: {
    ...mapState(['posts'])
  },

  // Vue SSR 特殊为服务端渲染提供的一个生命周期钩子函数
  serverPrefetch () {
    // 发起 action，返回 Promise
    // this.$store.dispatch('getPosts')
    return this.getPosts()
  },
  methods: {
    ...mapActions(['getPosts'])
  },
  // 服务端渲染
  //     只支持 beforeCreate 和 created
  //     不会等待 beforeCreate 和 created 中的异步操作
  //     不支持响应式数据
  // 所有这种做法在服务端渲染中是不会工作的！！！
  // async created () {
  //   console.log('Posts Created Start')
  //   const { data } = await axios({
  //     method: 'GET',
  //     url: 'https://cnodejs.org/api/v1/topics'
  //   })
  //   this.posts = data.data
  //   console.log('Posts Created End')
  // }
}
</script>

<style>

</style>
```

# 数据预取和状态管理-将预取数据同步到客户端
entry-server.js
```
  const { app, router, store } = createApp()

  context.renderer = () => {
    // Renderer 会把 context.state 数据对象内联到页面模板中
    // 最终发送给客户端的页面中会包含一段脚本：window.__INITIAL_STATE__ = context.state
    // 客户端就要把页面中的 window.__INITIAL_STATE__ 拿出来填充到客户端 store 容器中
    context.state = store.state
  }
```
entry-client.js
```
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
```