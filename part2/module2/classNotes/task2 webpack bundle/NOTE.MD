# 模块打包工具的由来

- ES Modules 本身存在环境兼容问题
- 模块文件过多，网络请求频繁
- 所有的前端资源都需要模块化

首先我们需要工具编译代码，使代码编译后可以使浏览器支持
打包工具，将所有的模块打包成一个文件，降低网络请求的次数
我们不只需要针对js的模块化方案，我们还需要针对 css html image font 的模块化方案，是一个针对前端应用的模块化方案

- 新特性编译
- 模块化 js 打包
- 支持不同类型的资源模块


**==========================================================================================================**

# 模块打包工具概要

webpack 模块打包器（module bundler）

首先可以将零散的模块代码打包到一个文件中，然后通过模块加载器（loader）编译转换

代码拆分（code splitting）按需打包，并不是所有的代码全部打包，渐进式加载模块

支持以模块化的方式载入任意类型的资源文件（asset module）

打包工具解决的是前端整体的模块化而不是只针对js的模块化

**==========================================================================================================**

# webpack 快速上手

## 安装 webpack
```
yarn add webpack webpack-cli --dev
```

## 运行
```
yarn webpack
```

## 配置 packag.json

"scripts": {
  "build": "webpack"
}

## 运行
```
yarn build
```

**==========================================================================================================**

# webpack 配置文件

默认配置 src/index.js --> dist/main.js

我们可以修改这个配置 源目录 目标目录 

新建 webpack.config.js 文件

```
const path = require('path')

module.exports = {
  entry: "./src/main.js", //  入口
  output: {  // 出口
    filename: "bundle.js",
    path: path.join(__dirname, 'output') // 必须是绝对路径
  }
}
```

**==========================================================================================================**

# webpack 工作模式

## mode 默认生产模式

```s
# 开发模式，会加一些调试辅助
yarn webpack --mode development

# 原始模式，最原始的打包
yarn wenpack --mode none

# 生产模式
yarn webpack 
yarn webpack --mode production
```

修改配置文件

mode : "development"

命令不用加 --mode

**==========================================================================================================**

# webpack 打包结果运行原理

mode none 调试上一个项目就可以

**==========================================================================================================**

# 资源模块加载

loader 是实现模块化的核心，借助于 loader 可以加载任何类型的资源

  entry: "./src/main.css",

  打包报错

原因: webpack 打包的时候会把所有文件当成js来处理，css 文件不是js ，需要借助loader

1. css-loader 将 css 代码 push 到数组中，导入 目标 js，也就是把 css 集成到 js 中

2. style-loader 将 css-loader 转换的结果用 style 标签追加到 html 中

安装

yarn add css-loader style-loader --dev

配置

  module: {
    rules: [
      {
        test: /.css$/,  // 匹配 css 结尾的文件 
        use: ['style-loader','css-loader'] // 处理文件用的loader 倒序 先用的在后面
      }
    ]
  }

**==========================================================================================================**

# webpack 导入资源模块

配置中的入口文件还应该是 js 文件
而其他资源模块应该导入 js 文件中
比如：
import './main.css'

webpack 推荐在 js 中引入所需要的各种资源文件

**==========================================================================================================**

# webpack 文件资源加载器

安装 file-loader

yarn add file-loader --dev

配置

  module: {
    rules: [
      {
        test: /.jpg$/,
        use: "file-loader"
      }
    ]
  }

引入资源文件

import icon from './timg.jpg'

默认webpack认为资源都在 html所在目录，如果不在，需要指定一个目录

配置

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/' // 指定资源文件所在目录
  },

原理：先拷贝资源到发布目录，模块中返回这个路径，加载到网页中

**==========================================================================================================**

# webpack url 加载器

正常的 url 是表示文件的路径的

data url 可以直接表示文件 data:[;base64],<data> 

协议 ： [媒体类型/编码], <数据内容>

比如：
data:text/html;charset=UTF-8,<h1>content</h1>

常用于表示图片字体
data:image/png;base64,....

安装加载器

yarn add --dev url-loader

用这个模块打包资源，资源不会出现在目标目录，而是以字符串得形式包进了 js 中，这种方式适合小文件

- 小文件 url-loader ，减少请求次数
- 大文件，单独提取存放，加快加载速度

- 超过 10kb 得图片，单独存放 依赖 file-loader
- 小于 10kb 得文件，嵌入代码 依赖 url-loader

注意点：需要安装 file-loader

    rules: [
      {
        test: /.jpg/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024 // 10 kb
          }
        }
      }
    ]

**==========================================================================================================**

# webpack 常用加载器分类

- 编译转换 css-loader
- 文件操作 file-loader 拷贝，导出路径
- 代码检查 eslint-loader 

**==========================================================================================================**

# webpack 与 ES 2015

因为需要模块，所以默认可以处理 import 和 export 其他新特性并不全部支持

编译 js 需要 babel-loader 

安装 
yarn add --dev babel-loader @babel/core @babel/preset-env 

配置
test: /.js$/,
use: {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env']
  }
}


- webpack 只是打包工具
- 加载器可以编译转换代码

**==========================================================================================================**

# webpack 模块加载方式

- 遵循 ES Modules 标准得 import 声明
- 遵循 CommonJS 标准的 require 声明
- 遵循 AMD 标准的 define 函数和 require 函数
- * 样式代码中的 @import 指令和 url 函数
- * html 代码中的图片标签的 src 属性

这些标准不能混着用

样式代码中 @import 指令和 url 函数

html 中的图片标签的 src 属性

比如：
background-image： url（...png）

css-loader 处理的 css 的时候发现 png 图片资源，此时就会用 url-loader 和 file-loader 来处理

@import url(...css)

也会触发 

img 的 src  也会触发

a 的 href 也触发

打包 html 文件， html-loader 
安装好以后

配置

test: /.html$/,
use: {
  loader: 'html-loader',
  options: {
    attrs: ['img:src','a:href'] // 默认只支持 img：src ，这个配置可以保证 html 中引入资源的地方到会参与打包
  }
}

**==========================================================================================================**

# webpack 核心工作原理

入口文件开始通过导入的相关语法查找依赖关系，形成树，递归树解析资源，最终将内容打包进 bundle js 中

**==========================================================================================================**

# webpack 开发一个loader

实现一个 markdown 的 loader 处理 md 文件

作用： md ---> html/js  ---> html

内部实现原理：md文件 --marked-> html 字符串 --html-loader-> json 转义后的 js 字符串

## 依赖文件
```
    "html-loader": "^1.3.0",
    "marked": "^1.1.1",
```

## 配置文件
```
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
  }
```

## markdown-loader.js

```
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

  // 返回 html 字符串，由 html-loader 处理
  return html
}
```

**==========================================================================================================**

# webpack 插件机制

增强 webpack 自动化能力

loader 负责各种资源模块的加载

plugin 解决其他自动化问题
比如：
自动清除 dist 目录；
拷贝静态文件到输出目录；
压缩输出代码

**==========================================================================================================**

# 自动清除输出目录插件

clean-webpack-plugin

安装

yarn add --dev clean-webpack-plugin

配置 webpack.config.js

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

  plugins: [
    new CleanWebpackPlugin()
  ]
```
测试项目：08-markdown-loader

**==========================================================================================================**

# 自动生成使用 bundle.js 的 html

测试项目：08-markdown-loader

插件 html-webpack-plugin

安装 yarn add --dev html-webpack-plugin

载入 const htmlWebpackPlugin = require('html-webpack-plugin')

配置 
  plugins: [
    new htmlWebpackPlugin()
  ]

记得去掉 output 中的 publicPath

# html-webpack-plugin 选项

1. 简单定义一些属性

    new htmlWebpackPlugin({
      title: 'ceshi-ceshi',
      meta: {
        viewport: 'width=device-width'
      }
    })

2. 由模板生成 html

创建 

src/index.html 

模板语法

<h1><%= htmlWebpackPlugin.options.title %></h1>

修改配置

   new htmlWebpackPlugin({
      title: 'ceshi-ceshi',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html' // 加上模板
    })

# html-webpack-plugin 同时输出多个页面文件

配置文件里再创建一个就可以了

  plugins: [
    new htmlWebpackPlugin({
      title: 'ceshi-ceshi',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html'
    }),
    new htmlWebpackPlugin({  // 再创建一个 about.html 
      filename: 'about.html'
    })
  ]

**==========================================================================================================**

# webpack 插件使用总结

处理 public 目录文件，直接拷贝到 dist ，插件 copy-webpack-plugin

载入 const CopyWebpackPlugin = require('copy-webpack-plugin')

配置
new CopyWebpackPlugin([
  'public'
  // 'public/**'
])

new CopyWebpackPlugin({
  patterns: [{ from: "public", to: "dist" }]
})

可以再github上直接搜索关键词找 webpack plugin 比如 imagemin webpack plugin

**==========================================================================================================**

# webpack 开发一个插件

相比于 loader， plugin 的能力范围非常广

plugin 通过钩子机制实现

## 官方规定：
插件必须是一个函数或者一个包含 apply 方法的对象

## 原理：
就是在 webpack 打包的生命周期中的某个勾子上挂载我们实现的函数（插件），在这个勾子中拿到资源，然后对资源进行处理，最后再将处理后的资源传回去，让 webpack 继续后序的打包

比如实现一个插件，作用是清除 bundle.js 中的开头的 /****/ 注释

## 测试项目：08-markdown-loader

// webpack.config.js 配置

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

  plugins: [
    new MyPlugin()
  ]

**==========================================================================================================**

# webpack 开发体验问题

自动编译，自动刷新浏览器, 支持调试

# 自动编译

watch 工作模式，监听修改，实时编译

命令 yarn webpack --watch

# 自动刷新浏览器 

可以用 browser-sync 工具

监听 dist 下的文件变化

启动两个窗口
一个运行 yarn webpack --watch
一个运行 browser-sync dist --files "**/*"

两个插件一起用的的缺点：开发效率降低，webpack 编译写入磁盘，browser-sync 读取磁盘，增加了磁盘读写操作

# webpack dev server

webpack-dev-server

提供用于开发的 http server
集成自动编译和自动刷新浏览器

yarn webpack-dev-server

为了提供效率，并没有将打包结果写入磁盘，而是在内存里

yarn webpack-dev-server --open

自动打开浏览器

# webpack dev server 静态资源能访问

配置

  devServer: {
    contentBase: ['./public']
  },

会把 public 下的静态资源拷贝

# webpack dev server 代理 API

开发阶段接口跨域问题：

生产模式的地址和 api 的域名是同源的；
但是开发模式下的地址是 http://localhost:8080/ 和 正式 api 地址不同源
有可能会有报错 同源跨域

测试： 将 github 的 api 代理到本地服务器

https://api.github.com/users 

  devServer: {
    contentBase: ['./public'],
    proxy: {
      // 所有以 api 开头的路径都会将域名替换成 target
      '/api':{  

        // http://localhost:8080/api/users -> https://api.github.com/api/users
        target: 'https://api.github.com',

        // http://localhost:8080/api/users -> https://api.github.com/users  重写真正访问的地址
        pathRewrite: {
          '^/api': ''
        },

        // 不能用 localhost:8080 当主机名请求 github
        // 默认代理服务器会使用本地浏览器里的主机名 locahost：8080 作为代理主机名，公网服务器不认
        changeOrigin: true
      }
    }
  },

**==========================================================================================================**

# source map 介绍

构建工具导致我们开发阶段源代码和生产环境运行的代码相差太多

想调试怎么办？ 

source map 逆向解析出源代码

如何在 jquery.min.js 文件中添加对应 source map ？

在文件尾部添加注释 //# sourceMappingURL = jquery-3.4.1.min.map

# webpack 配置 source map

配置

devtool: 'source-map',

开启 source map 以后打包，浏览器调试就可以看到多出来的 webpack:// 目录，源码

webpack 支持 source map 大概有 12 种方式，效果越好的，打包效率越低

# webpack eval 模式的 source map 

这个看视频吧，这种最简单的模式和 source map 关系都不大，用处也不大

# webpack devtool 模式对比

- eval 是否使用 eval 执行模块代码
- cheap-source map 是否包含行信息
- module 是否能够得到 loader 处理之前的源代码

# webpack 选择 source-map 模式

选择合适的模式：
开发环境：
cheap-module-eval-source-map

- 开发阶段调试代码最好还是看到源码 因为 loader 转化之后差异较大
- 首次打包速度慢，重复打包速度快

生产环境：
none 
避免暴露源代码

或者 nosources-source-map 
不暴露源代码，错误信息控制台有

# webpack 自动刷新的问题

dev-server 监视文件变化，自动打包刷新网页
这样的话，网页的各种操作会被刷新冲掉
比如：web 版的编辑器，你写了内容进去，但是因为修改了某个 css 网页一刷新，
编辑内容就没了

办法1： 将内容以代码写死进去
办法2： 额外代码实现刷新前保存，刷新后读取

## 问题核心：自动刷新导致页面状态丢失

## 最优方案：
页面不刷新的前提下，模块也可以及时更新
HMR

# webpack HMR 体验

Hot Module Replacement
最强大的功能之一

# 开启 HMR

命令：
webpack-dev-server --hot 

配置：
const { HotModuleReplacementPlugin } = require('webpack');

devServer: {
  hot: true
},

plugins: [
 new HotModuleReplacementPlugin()
]

# HMR 疑问

js 文件需要手动处理

# 使用 HMR API

第一个参数是模块文件路径
第二个参数是模块文件更新后处理方法

在导入模块的 js 文件中
module.hot.accept('./module.js', ()=>{
  console.log('module hot update !! ');
})

测试项目：08-markdown-loader

# 处理 js 模块热替换

webpack 无法提供通用的  js 模块热更新，因为 js 的逻辑不是固定的

测试项目：08-markdown-loader

# 处理图片模块热替换

module.hot.accept('./test.png', ()=>{
  //
})

# HMR 注意事项

1. 处理 HMR 的代码报错会导致代码刷新
所以在配置中修改为 hotOnly 这样就不会使用页面刷新
// hot: true, 热替换失败，使用自动刷新
hotOnly: true // 热替换失败，不自动刷新

2. 没有启用 HMR ，HMR 的 api 将报错
先判断 module.hot 是否存在 

3. 代码中多了一些与业务无关的代码
不会有影响

**==========================================================================================================**

# 生产环境优化

开发环境注重开发效率

生产环境注重运行效率

不同模式下，不同配置

# 不同环境下的配置

1. 配置文件根据环境不同导出不同的配置
2. 一个环境对应一个配置文件

参考 测试项目：08-markdown-loader

## 第一种配置方法

中小型项目

module.exports = (env,argv)=>{
  const config = {
    //
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


## 第二种配置方法

大型项目

1. 创建三个配置文件 webpack.common.js, webpack.dev.js, webpack.prod.js

参考 09-config

2. 安装 webpack-merge --dev

3. 打包命令

yarn webpack --config webpack.prod.js

**==========================================================================================================**

# DefinePlugin

作用：为代码注入全局成员；

在 production 模式下，这个插件默认启用，往代码里注入 process.env.NODE_ENV

const webpack = require('webpack')

  plugins: [
    new webpack.DefinePlugin({
      // 值要求的是一个代码片段
      API_BASE_URL: JSON.stringify('https://api.example.com')
    })
  ]

一般可以用于注入 api 环境路径，生产环境和开发环境 api 的域名是不一样的
比如： API_BASE_URL 这个变量
在 main.js 中是可以直接拿来用的

**==========================================================================================================**

# webpack Tree shaking  和 webpack 合并模块

tree-shaking 可以去掉代码中未引用的部分

生产环境自动开启

非生产环境，手动配置一些选项，一样可以实现 tree-shaking

  optimization: {
    // 模块只导出被使用的成员 （标记未引用的代码）
    usedExports: true, 

    // 压缩输出结果 （去掉未引用的代码）
    // minimize: true
  }

合并模块

   // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,

减少运行效率和代码体积

scope hoisting （作用域提升）


# tree shaking & babel

babel 老问题：内部转换 js 的时候，会将 esm 转成 commonjs，导致 tree-shaking 失效

新版本 babel 解决这个问题；
内部加了参数 supportsStaticESM ，判断是否开启 esm 转 commonjs

我们可以强制转成commonjs 来验证

presets: [
  // 如果 Babel 加载模块时已经转换了 ESM，则会导致 Tree Shaking 失效
  // ['@babel/preset-env', { modules: 'commonjs' }]

  // 确保不会转换
  // ['@babel/preset-env', { modules: false }]

  // 也可以使用默认配置，也就是 auto，这样 babel-loader 会自动关闭 ESM 转换
  ['@babel/preset-env', { modules: 'auto' }]
]

**==========================================================================================================**

# webpack sideEffects 副作用

副作用：模块执行时除了导出成员之外所作的事

一般用于开发 npm 包标记是否有副作用

一般生产模式自动开启

手动开启
改配置文件
  optimization: {
    sideEffects: true, // 开启
  }

改 package.json  
  "sideEffects": [     // 声明这些文件有副作用
    "./src/extend.js",
    "*.css"
  ]

使用场景之一：
13-side-effects 中 多个模块统一由 index 声明，外部只用了其中一个模块，剩下的没用到但是也导出去打包了；
为了避免这个现象，可以使用 side-effects

**==========================================================================================================**

# webpack 代码分割

所有代码最终都会被打包一起

bundle 体积过大

启动时，并不是每个模块都有必要添加进来

合理的做法：分包，按需加载

# 多入口打包

1. entry 重定义
2. output 重定义

  entry: {
    index: './src/index.js',
    album: './src/album.js'
  },
  output: {
    filename: '[name].bundle.js'
  },

3. 配置 chunks

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/album.html',
      filename: 'album.html',
      chunks: ['album']
    })
  ]

# 提取公共模块

不同的入口肯定会有公共的模块

配置文件

  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all'
    }
  },

会在 dist 目录单独生成一个公共模块的 js 文件

# 动态导入

按需加载

需要某个模块时，再加载某个模块

动态导入的模块会被自动分包

使用 ESM 语法，在需要的时候动态导入使用


  if (hash === '#posts') {
    // mainElement.appendChild(posts())
    import(./posts/posts').then(({ default: posts }) => {
      mainElement.appendChild(posts())
    })
  } else if (hash === '#album') {
    // mainElement.appendChild(album())
    import(./album/album').then(({ default: album }) => {
      mainElement.appendChild(album())
    })
  }

静态导入的语法注释掉 

// import posts from './posts/posts'
// import album from './album/album'

打包以后，会动态生成对应的分包 bundle.js


# 魔法注释 magic comments

用来给分包 bundle.js 命名的

用法在导入的时候添加注释 /* webpackChunkName: 'name' */

    import(/* webpackChunkName: 'components' */'./posts/posts').then(({ default: posts }) => {
      mainElement.appendChild(posts())
    })

**==========================================================================================================**

# 提取 css 到单个文件 MiniCssExtractPlugin 

安装 
yarn add mini-css-extract-plugin -dev

导入
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

创建
  plugins: [
    new MiniCssExtractPlugin()
  ]

用 MiniCssExtractPlugin.loader 代替 style.loader 
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 将样式通过 style 标签注入
          MiniCssExtractPlugin.loader, // 样式通过 link 方式导入
          'css-loader'
        ]
      }

#### css 文件大小超过 150 kb ，用这个单独提取会好一些, 否则没必要


# 压缩单独提取的 css 文件

插件 optimize-css-assets-webpack-plugin

安装 
yarn add optimize-css-assets-webpack-plugin -dev

导入
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

配置 webpack 建议，压缩插件不要放到 plugins 中；而是放到 minimizer 中；
一旦配置了 minimizer ，那默认的生产打包就会走 minimizer ，所以 js 的压缩插件也要配置到这里

  optimization: {
    minimizer: [
      new TerserWebpackPlugin(), // js 压缩插件 
      new OptimizeCssAssetsWebpackPlugin() // css 压缩插件
    ]
  },

安装 导入 const TerserWebpackPlugin = require('terser-webpack-plugin')

**==========================================================================================================**

# webpack 输出文件名 hash

用户浏览器一般开启静态资源缓存，这个会提升效率，但是也有问题，比如资源有新版本，那就不会及时更新过来

解决方案：生产模式下，我们需要给输出的文件名添加 hash

文件更新，那名字也会更新，自然资源也就更新了

配置文件

  output: {
    filename: '[name]-[contenthash:8].bundle.js'
  },

    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].bundle.css'
    })

格式 filename : '[name]-[<hashtype>:<length>].bundle.<ext>'

hash 有三种：
- 普通 hash  filename: '[name]-[hash].bundle.css'  项目级别

不管哪个文件改动，dist 下的文件名都会改变

- chunkhash    filename: '[name]-[chunkhash].bundle.css'   chunk 级别

文件改变，只会修改对应的 chunk 相关的文件名

- contenthash    filename: '[name]-[contenthash].bundle.css'   文件级别 

文件改变，文件相关和文件自己改变名字，其他都不变 

#### 最优还是 contenthash

contenthash:8  8 是指定长度