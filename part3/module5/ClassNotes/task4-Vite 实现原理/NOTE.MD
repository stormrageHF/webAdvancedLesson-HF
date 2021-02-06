# Vite

- Vite 是一个面向现代浏览器的一个更轻，更快的web应用开发工具
- 它基于ECMAScript 标准原生模块系统实现

为了解决在开发阶段 webpack 冷启动时间过长和热更新反应速度慢的问题

## Vite 项目依赖
- Vite
- @vue/compiler-sfc

## 基础使用
- vite serve
- vite build

vite serve - 启动 web server - 编译请求的文件给浏览器
vite-cli-service serve - （webpack）build - bundle - 启动 web server - 浏览器

vite 省略打包过程
vite 支持按需编译

HMR
- Vite HMR
  - 立即编译当前所修改的文件
- Webpack HMR
  - 会自动以这个文件为入口重写 build 一次，所有涉及到的依赖也会被重新加载一次

Build
- vite build
  - Rollup
  - Dynamic import
    - Polyfill

## 打包 or 不打包
- 使用 webpack 打包的两个原因：
1.浏览器环境并不支持模块化
2.零散的模块文件会产生大量的 http 请求

## 开箱即用
- TypeScript - 内置支持
- less/sass/stylus/postcss - 内置支持（需要单独安装）
- JSX
- Web Assembly

## 特性
- 快速冷启动
- 模块热更新
- 按需编译
- 开箱即用


# Vite 实现原理-静态Web服务器

## 核心功能
- 静态 Web 服务器
- 编译单文件组件
  - 拦截浏览器不识别的模块，并处理
- HMR

1. 项目 06-vite-cli ，创建index.js，用 koa 创建一个静态 web 服务器

```js
#!/usr/bin/env node

const Koa = require('koa')
const send = require('koa-send')

const app = new Koa()

// 1.静态web服务器
app.use(async (ctx, next) => {
  await send(ctx, ctx.path, { root: process.cwd(), index: 'index.html' })
  await next()
})

app.listen(3000)
console.log('Server running @ http://localhost:3000');
```

2. npm link 连接到本地npm库
3. 找个 vue3.0 的项目，使用命令 vite-cli 查看服务是否启动成功


# Vite 实现原理-修改第三方模块的路径

如果是js文件，当遇到 import vue from 'vue' 将其内容转化为 import vue from '/@modules/vue'
在模块前加个 /@modules/

```js
// 2. 修改第三方模块路径
app.use(async (ctx, next) => {
  if (ctx.type === 'application/javascript') {
    const contents = await streamToString(ctx.body)
    // import vue from 'vue'
    // import App from './App.vue'
    ctx.body = contents.replace(/(from\s+['"])(?!\.\/)/g, '$1/@modules/')
  }
})
```

重启服务

#  Vite 实现原理-加载第三方模块

请求的路径中是否有/@modules/开头的路径，如果有的话，就加载node_modules中的库
在处理静态web服务之前，创建一个中间件处理加载第三方模块

```js
// 3. 加载第三方模块
app.use(async(ctx, next) => {
  // ctx.path ---> /@modules/vue
  if(ctx.path.startsWith('/@modules/')){
    const moduleName = ctx.path.substr(10)
    const pkgPath = path.join(process.cwd(), 'node_modules', moduleName, 'package.json')
    const pkg = require(pkgPath)
    ctx.path = path.join('/node_modules', moduleName, pkg.module)
  }
  await next()
})
```

#  Vite 实现原理-编译单文件组件

浏览器无法处理import引入的单文件组件模块和样式模块，它只能处理js模块；
所以加载的其他模块都需要在服务端处理
在服务器上，把单文件组件编译成js模块，返回给浏览器
把样式css文件编译成js模块返回给浏览器

第一次请求把单文件组件编译程对象
第二次请求编译单文件组件的模块，返回一个render函数，并且把这个render函数挂载到刚刚那个对象的的render方法上

在处理静态文件服务之后，修改第三方模块路径之前，创建第四个中间件
安装模块 @vue/compiler-sfc


```bash
npm i @vue/compiler-sfc
```

```js
// 4. 处理单文件组件
app.use(async (ctx, next) => {
  if(ctx.path.endsWith('.vue')){
    const contents = await streamToString(ctx.body)
    const { descriptor } = compilerSFC.parse(contents)
    let code;
    if(!ctx.query.type){
      code = descriptor.script.content
      // console.log(code);
      code = code.replace(/export\s+default\s+/g, 'const __script = ')
      code += `
      import { render as __render } from "${ctx.path}?type=template"
      __script.render = __render
      export default __script
      `
    }
    ctx.type = 'application/javascript'
    ctx.body = stringToStream(code)
  }
  await next()
})
```

当前代码解决了第一次请求单文件组件的问题


#   Vite 实现原理-编译单文件组件 2

第二次请求中 url 会带参数 type=template
增加了对 process.evn.NODE_ENV 的处理，不然会报错

```js
// 4. 处理单文件组件
app.use(async (ctx, next) => {
  if(ctx.path.endsWith('.vue')){
    const contents = await streamToString(ctx.body)
    const { descriptor } = compilerSFC.parse(contents)
    let code;
    if(!ctx.query.type){
      code = descriptor.script.content
      // console.log(code);
      code = code.replace(/export\s+default\s+/g, 'const __script = ')
      code += `
      import { render as __render } from "${ctx.path}?type=template"
      __script.render = __render
      export default __script
      `
    }else if (ctx.query.type === 'template'){
      const templateRender = compilerSFC.compileTemplate({ source: descriptor.template.content })
      code = templateRender.code
    }
    ctx.type = 'application/javascript'
    ctx.body = stringToStream(code)
  }
  await next()
})

// 2. 修改第三方模块路径
app.use(async (ctx, next) => {
  if (ctx.type === 'application/javascript') {
    const contents = await streamToString(ctx.body)
    // import vue from 'vue'
    // import App from './App.vue'
    ctx.body = contents
    .replace(/(from\s+['"])(?![\.\/])/g, '$1/@modules/')
    .replace(/process\.env\.NODE_ENV/g, '"development"')
  }
})
```















