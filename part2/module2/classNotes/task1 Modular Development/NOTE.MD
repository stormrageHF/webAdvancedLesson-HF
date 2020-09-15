# 模块化演变过程

早期没有工具和模块规范的时候我们的模块化落地方式

## 1. 文件划分方式：

一个script标签就是一个模块，不同的模块建立对应的script或js文件，一个js文件就是一个模块，使用的时候，将js文件引入html中，变量就是全局访问，不存在私有空间；

缺点：
污染全局作用域，外部可以随意访问并修改模块中的变量和方法；
全局变量容易引起命名冲突；
无法管理模块间依赖关系；

完全依靠约定


## 2. 命名空间方式

我们约定每个模块只暴露一个全局对象，所有的模块成员都挂载到这个全局对象下；

好处：
减少了命名冲突

缺点：
还是没有解决访问权限的问题，还可以随意访问和修改；
模块的依赖关系也没有得到解决；


## 3. IIFE

立即执行函数形成一个封闭的私有空间，将模块成员都放进一个函数作用域中，需要暴露给外部的成员就挂找到全局对象window上；

好处：
有私有空间，设置了访问权限；
立即函数的参数可以传模块，这就可以让不同的模块之间建立联系；

**-------------------------------------------------------------------------------------------------------------------------------**

# 模块化规范的出现

模块化标准 + 模块加载器 

模块化规范：

## CommonJS 规范 nodejs 提供

- 一个文件就是一个模块
- 模块都有自己的单独作用域
- 通过 module.exports 导出
- 通过 require 导入

CommonJS 同步模式加载模块
所以不适合浏览器端，要全是同步任务那不得卡死啊；

所以单独为浏览器定义了规范AMD（Asynchronous Module Definition）

## AMD

同时还定义了一个库 require.js

如下定义一个模块，第一个参数是名字，第二个参数是依赖的数组，第三个参数是一个函数，函数的参数是对应的依赖，函数提供一个封闭的作用域；
return 返回的是对外公布的对象

```
define( 模块名 , ['依赖库 a','依赖库 b'], function (a, b) {
  return {
    // methods 
  }
})
```
载入一个模块, 内部会自动创建script标签，发送脚本文件请求，加载对应内容，执行对应代码；

```
require(['./module1', function (module1) {
  module1.start()
}])
```

目前绝大多数三方库都支持AMD规范

- AMD使用起来相对复杂
- 模块太多的话， js 文件请求频繁，会影响页面效率

同期淘宝推出 sea.js + CMD 规范 Common module definition 和 AMD 类似
最后被 require.js 同化了 


**------------------------------------------------------------------------------------------------------------------------**

# 模块化标准规范

浏览器： ES Modules 
node： CommonJS 

**------------------------------------------------------------------------------------------------------------------------**

# ES Modules 特性

script 标签添加 type = module 属性，就可以以 ES Modules 的标准来执行代码了

- 会自动采用严格模式, 无法直接使用 this
- 每一个 ES Modules 都有私有作用域, 外部无法访问内部成员
- 通过 CORS 的方式请求外部 js 模块, 所以请求的资源得支持 cors
- 会自动延迟执行脚本，和 defer 属性作用一致，等待页面渲染后再执行脚本

**------------------------------------------------------------------------------------------------------------------------**

# Modules 导出 

导出


```
// module.js
export const foo = 'foo module' 

const name = 'tom'
const age = 14

function bar () {}

class Person {}

export {
  name,
  bar as default,
  age as myAge // 重命名
}

export default Person
```

导入
```
// app.js

import { foo, name } from './module'
import { myAge } from './module'
import { default as myBar } from './module'
import Person from './module'
```

**------------------------------------------------------------------------------------------------------------------------**

# Modules 导入导出的注意事项

- export { name, age } 导出的不是字面量对象，这是固定语法
- import { name, age } 导入也不是解构，也是固定语法
- 导入的是引用，也就是内存地址，也就是多了个引用
- 导入的变量是只读的

**------------------------------------------------------------------------------------------------------------------------**

# Modules 导入用法

```shell
# ./ 代表相对目录，省略 ./ 代表第三方模块
import { name } from './module.js'

# 执行一个模块
import {} from './module.js'
import './module.js'

# 导入所有成员
import * as mod from './module.js'
console.log(mod)

# 动态加载一个模块,import 函数，返回一个 promise
import('./module.js').then(module = > {
  // module
})

```

**------------------------------------------------------------------------------------------------------------------------**

# Modules 导出导入成员

多个分散得组件统一导入到一个对外得接口js文件中，然后由这个文件统一导出

**------------------------------------------------------------------------------------------------------------------------**

# ES Modules 浏览器环境 polyfill 

浏览器 polyfill 兼容方案

## 问题：不是所有得浏览器都很好得支持 ES Modules，目前这一课提出得方案是在开发阶段测试用得，生产环境不能这样用，因为会动态解析脚本，降低页面加载效率

## 兼容方案：

比如 ie 不支持 es module，
那可以引入模块 browser-es-module-loader 得两个脚本文件

### 具体做法：

打开浏览器，输入 unpkg.com/browser-es-module-loader/ 自动路由到源文件地址 https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js
删除 dist/ 目录后面得内容，回车进入 dist 目录 https://unpkg.com/browse/browser-es-module-loader@0.4.1/dist/
此时看到连个脚本，依次点击进去，view raw , 将地址添加到 html 中 script

再运行，ie 报错没有 promise，此时还要添加一个 promise-polyfill
同理还是在浏览器中输入 unpkg.com/promise-polyfill 回车 https://unpkg.com/promise-polyfill@8.1.3/dist/polyfill.min.js
添加到script得最上面

此时，ie 运行正常；
但是，chrome 却运行了两次，因为 chrome 本身支持 es module
所以我们需要添加 nomodule 属性，来声明 script 是在不支持 es module 得浏览器中加载

这样加载库得方式不要用在生产环境

**------------------------------------------------------------------------------------------------------------------------**

# ES Module in Node.js 支持情况

node 8.5 以后开始实验支持了

要在 node 中使用 esm：
1. 定义文件时，后缀是 mjs
2. 启动命令 node --experimental-modules index.mjs
3. 可以用 import 得方式导入原生模块，第三方模块，但是内置模块可以导入内部成员，而第三方得可不一定支持导入内部成员

内置模块兼容了 ESM 得提取成员方式
三方模块只支持导出默认成员

**------------------------------------------------------------------------------------------------------------------------**

# esm 和 commonjs 交互

- esm 可以导入 commonjs 模块
- commonjs 不能导入 esm 模块
- commonjs 只能导出一个默认成员
- import 不是解构导出对象

**------------------------------------------------------------------------------------------------------------------------**

# esm 与 common 模块得差异

```
// 加载模块函数
console.log(require)

// 导出对象别名
console.log(exports)

// 模块对象
console.log(module)

// 当前文件目录
console.log(__dirname)

// 当前文件绝对路径
console.log(__filename)
```

在 esm 中都不支持

获取绝对路径和目录
```
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)
```

**------------------------------------------------------------------------------------------------------------------------**

# 新版本进一步支持

切换版本 nvm use 12.10.0

配置 package 中 type: "module"

扩展名不用改成 mjs，所有 js 文件都变成 esm 模式

那 commonjs 规范怎么办？ 修改扩展名 cjs

**------------------------------------------------------------------------------------------------------------------------**

# babel 兼容方案

对于早期得nodejs版本可以用 babel 来实现兼容

比如 node 版本 是 8.0.0

## 安装 
```
yarn add @babel/node @babel/core @babel/preset-env --dev

```

## 运行 
```
yarn babel-node index.js --presets=@babel/preset-env
```
真正转换起作用得是 preset-env 里得插件，preset-env 是一个插件集合

## 优化 

创建 .babelrc 文件 添加内容

```
{
  "presets": ["@babel/preset-env"]
}
```
运行 yarn babel-node index.js

转换 esm 得插件叫

{
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
