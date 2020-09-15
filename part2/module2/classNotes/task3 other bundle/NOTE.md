# Rollup

默认自带 tree-shaking

安装 rollup

yarn add rollup --dev

运行

yarn rollup ./src/index.js --format iife --file dist/bundle.js
 
            entry          格式           output

**=================================================================================================================================================**

# rollup 配置文件

rollup.config.js

## 配置信息：
export default  {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  }
}

## 运行命令：
默认配置文件名
yarn rollup --config 

指定配置文件名
yarn rollup --config rollup.config.js

**=================================================================================================================================================**

# 使用插件

插件是唯一的扩展途径，加载其他资源，编译新特性，导入 commonjs 模块

示例：03-plugins

rollup-plugin-json

## 安装 
yarn add --dev rollup-plugin-json

## 配置
```
import json from 'rollup-plugin-json'

export default  {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins:[
    json()
  ]
}
```

## index.js 引入
```
import { name,version } from '../package.json'

log(name)
log(version)
```

## 打包

yarn rollup --config

## bundle.js 中 

```
var name = "03-plugins";
var version = "1.0.0";

log(name);
log(version);
```

**=================================================================================================================================================**

# rollup 加载 NPM 模块

rollup-plugin-node-resolve

模仿上一个章节

安装，使用这个插件

再安装一个 lodash-es

在 index.js 中使用 lodash 中的方法

打包 

bundle 中 lodash 也被打包进去了

#### 这里使用 lodash esm 版本，因为 rollup 默认只能处理 esm 

**=================================================================================================================================================**

# 加载 CommonJS 模块

安装 配置 rollup-plugin-commonjs

自定义 cjs-module.js 

使用 comonjs 模块

module.exports = {
  foo: 'bar'
}

index.js 中引入

import cjs from './cjs-module.js'

log(cjs)

打包 bundle.js 中

  var cjsModule = {
    foo: 'bar'
  };

  log(cjsModule);

**=================================================================================================================================================**

# rollup 代码拆分

也就是分包

index.js 中注销静态导入的代码，使用动态导入语法

import('./logger').then(({log})=>{
  log('code splitting ~')
})

配置文件修改

export default  {
  input: 'src/index.js',
  output: {
   format: 'amd', // format 这里不能用 iife
   dir: 'dist'  // 指定目录，因为导出文件不是一个
  }
}

打包 dist 目录下有两个文件
一个模块文件 一个使用文件

**=================================================================================================================================================**

# 多入口打包

项目中 07-multi-entry

album 和 index 都用了 fetch 和 logger 模块

配置多入口打包

export default {
  // input:['src/index.js','src/album.js'],  // 这样可以
  input:{
    foo: 'src/index.js',   // 这样也可以，重命名
    bar: 'src/album.js'
  },
  output: {
    dir: 'dist',
    format: 'amd'  // 输出格式 amd
  }
}

打包 dist 下有三个文件
两个打包文件，一个公共模块文件

dist 下新建 index.html 文件，引入 foo.js
浏览器中无法直接使用 amd 格式的 js；必须借助库以 data-main 方式引入
```
<script src="https://unpkg.com/requirejs@2.3.6/require.js" data-main="foo.js"></script>
```

**=================================================================================================================================================**

# rollup 选用原则

特点：
- 输出结果更加扁平，效率高
- 自动移除未引用代码
- 打包结果依然完全可读

缺点：
- 加载非ESM的第三方模块很复杂
- 模块最终都被打包到一个函数中，无法实现 HMR
- 在浏览器环境中，代码拆分功能依赖AMD库

### 适合开发类库，开发框架的时候使用

**=================================================================================================================================================**

# Parcel 

零配置的前端应用打包器

安装 parcel-bundler

1. 使用 html 文件作为打包入口

运行 yarn parcel src/index.html

2. 支持 HMR

if(module.hot) {
  module.hot.accept(()=>{
    console.log('hot module replacement ~');
  })
}

3. 自动安装依赖，直接引入使用

import $ from 'jquery'

$(document.body).append('<h1>hello parcel ~ </h1>')

4. 自动加载其他资源

自定义 style.css
在 index.js 中 导入 import './style.css'

// 图片 
import img from './timg.jpg'
$(document.body).append(`<img src= "${ img }">`)

5. 动态导入

import('jquery').then($=>{
  $(document.body).append('<h1>hello parcel ~ </h1>')
  $(document.body).append(`<img src= "${ img }">`)
})

6. 生产模式打包

运行 yarn parcel build src/index.html

- parcel 内部打包速度比 webpack 快，是因为 parcel 内部是多进程，webpack 可以借助插件 happypack 实现