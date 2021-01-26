# 课程目标

CDD Component-Driven-Development 
- 自下而上
- 从组件级别开始，到页面级别结束

好处：
- 组件在最大程度被重用
- 并行开发
- 可视化测试

# 处理组件的边界情况
示例工程 01-VUE-DEMO
1. $root 获取 Vue 根实例，实例上的属性都是响应式的
2. $parent 获取父组件实例, 属性也是响应式
3. $children 获取子组件数组
4. $refs 获取指定的子组件
5. provide/inject 可以向子组件注入变量/方法，但是不能修改变量，否则报错

#  attrs-listeners
参考实例工程 06-attr&listener
- $attrs 把父组件中非prop属性绑定到内部组件
- $listeners 把父组件中的DOM对象的原生事件绑定到内部组件
1. 从父组件传给自定义子组件的属性，如果没有 prop 接收，会自动设置到子组件内部的最外层标签上，如果是 class 和 style 的话，会合并最外层标签的 class 和 style 
2. 如果子组件中不想继承父组件传入的非 prop 属性，可以使用 inheritAttrs 禁用继承, 然后通过 v-bind="$attrs" 把外部传入的非 prop 属性设置给希望的标签上, 但是这不会改变 class 和 style
3. 注册原生dom事件，子组件通过 $emit 触发，并传值，但是得一个一个加
4. $listeners 可以把所有原生事件传递，不用一个一个加

# 快速原型开发
- vuecli 提供一个插件，可以进行原型快速开发
- 需要先额外安装一个全局的扩展
  - npm install -g @vue/cli-service-global
- 使用 vue serve 快速查看组件的运行效果

## vue serve
- vue serve 如果不指定参数默认会在当前目录找以下的入口文件
  - main.js, index.js, App.vue, app.vue
- 可以指定要加载的组件
  - vue serve ./src/login.vue

效果：参考工程 02-custom-component 中，安装插件后，新建一个vue 组件，直接运行命令 vue serve 便可以直接预览组件

#  快速原型开发-ElementUI
我们不只可以开发自定义组件外，还可以在第三方组件的基础上进行二次开发；
比如我们可以在 ElementUI 基础上开发自己的组件

## 安装 ElementUI
- 初始化 package.json
  - npm init -y
- 安装 ElementUI
  - vue add element
- 加载 ElementUI，使用 Vue.use() 安装插件

# 组件开发-步骤条组件
- 第三方组件
  - ElementUI 等
- 基础组件
  - 表单，文本框等
- 业务组件
  - 特定用户场景下的组件
参考 Steps.vue 源码

# 组件开发-表单组件-上
先实现 form，formitem
1. 创建 form 目录，创建 Button.vue Form.vue FormItem.vue Input.vue 四个文件
2. 实现 Form.vue 的基本结构，根元素改为 form，加入插槽 slot,增加props，包括model和rules，type都是 Object
3. 实现 FormItem.vue 的基本结构，div 中包括 label 和 div，第二个div中包括 slot 和验证错误提示信息 p；props 有label字符串，验证属性 prop 字符串；还有 data 包含 errMessage；ui 上lable 绑定 label，p绑定 errMessage；
4. vue serve src/Form-Test.vue 查看 form 和 formitem 元素

# 组件开发-表单组件-下
实现 input 和 button
1. input 有两个 prps ，value 和 type,和 ui 绑定；
2. 绑定input 事件，函数是 handleInput，通过 emit 把文本框的值传递出去；
3. 绑定 $attrs，inheritAttrs 为 false
4. button 里有 slot，点击事件传递事件出去并阻止默认事件

# 组件开发-表单组件-表单验证-上
1. formitem 通过依赖注入的方式获取 form 表单对象
2. 安装 async-validator
3. 创建方法 validator 根据 prop 获取对应的值和规则
4. 引入 async-validator，创建验证方法并在errors回调中处理错误信息

# 组件开发-表单组件-表单验证-下
- input 组件中触发自定义事件 validate
- formitem 渲染完毕注册自定义事件 validate
1. input 在 input 方法中顶一个找寻父组件方法，找到父组件后 $emit 触发 validate 方法
2. formitem 在 mounted 中 $on 注册 validate 事件，回调中调用 validator 方法
3. 点击登录触发验证，form 中实现 validate 方法，参数是回调函数，方法中获取 $children，遍历 child 判断有 prop 的 child 需要调用 validator 方法，返回promise数组，最终promise.all 执行数组，根据返回结果判断then成功 cb(true), catch 失败 cb(false)

# Monorepo
用来管理组件库
- Multirepo 每个包对应一个项目
- Monorepo 一个项目仓库管理多个模块/包
推荐第二个
根目录下有个packages目录，这个目录下有很多包，每个包的结构都是统一的，这样做方便管理这些包
统一结构
 packages 
 ├── package name
     ├── __test__/
     ├── dist/
     ├── src/
     ├── index.js 
     ├── LICENSE
     ├── package.json
     └── README.MD
按照这个结构，修改 02-custom-component 项目结构

# Storybook 上
- 可视化组件展示平台
- 在隔离的开发环境中，以交互式的方式展示组件
- 独立开发组件
- 支持的框架非常多

## Storybook 安装
官方文档有
- 自动安装
  - npx -p @storybook/cli sb init --type vue
  - yarn add vue
  - yarn add vue-loader vue-template-compiler --dev
- 手动安装
按照自动安装的方法在 03-LGELEMENT 中安装


# Storybook 下
参考 03-LGELEMENT 下的 stories 目录下的写法

# yarn workspaces
yarn 的 workspaces 工作区，可以方便我们管理项目依赖，因为packeages 下的不同的包多有自己的项目依赖，而这些项目依赖有一部分是重复的，有的不是重复的，有的还会有版本冲突，通过工作区可以很好的管理这部分内容，它会将重复的包提升至根目录的 node_modules，

## 开启工作区
- 项目根目录的 package.json

"private": true,  // 发布到github的时候，禁止把当前根目录的内容进行提交
  "workspaces": [
    "packages/*"
  ],

## yarn workspaces 使用
- 给工作区根目录安装开发依赖
  - yarn add jest -D -W
- 给指定工作区安装依赖
  - yarn workspace lg-button add lodash@4
- 给所有工作区安装依赖
  - yarn install

# Lerna 上
- Lerna 是一个优化使用 git 和 npm 管理多包仓库的工作流工具
- 用于管理具有多个包的 JavaScript 项目
- 它可以一健把代码提交到 git 和 npm 仓库

## Lerna 的使用
- 全局安装
  - yarn  global add lerna
- 初始化
  - lerna init
- 发布
  - lerna publish
  - 在 scripts 中添加一个命令，"lerna": "lerna publish"

npm whoami 查看自己是否登录 npm
npm config get registry 查看 npm 镜像源

# Vue组件的单元测试
- 提供描述组件行为的文档
- 节省手动测试的时间
- 减少研发新特性时产生的 bug
- 改进设计
- 促进重构

## 安装依赖
- Vue Test Utils
- Jest
- vue-jest
- babel-jest
- 安装
```bash
yarn add jest @vue/test-utils vue-jest babel-jest -D -W
```

## 配置测试脚本
- package.json {
  "scirpts": {
    "test": "jest",
    ...
  }
}

## Jest 配置文件
- jest.config.js 

```js
module.exports = {
  "testMatch": ["**/__tests__/**/*.[jt]s?(x)"],
  "moduleFileExtensions": [
    "js",
    "json",
    // 告诉 Jest 处理 `*.vue` 文件
    "vue"
  ],
  "transform": {
    // 用 `vue-jest` 处理 `*.vue` 文件
    ".*\\.(vue)$": "vue-jest",
    // 用 `babel-jest` 处理 js
    ".*\\.(js)$": "babel-jest"
  }
}
```

## Babel 配置文件
- babel.config.js

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env'
    ]
  ]
}
```

- Babel 桥接

```bash
yarn add babel-core@bridge -D -W
```

# Vue组件的单元测试 2
上一课搭建测试环境，这课编写测试文件

## Jest 常用 API

- 全局函数
  - describe(name, fn)  把相关测试组合在一起
  - test(name, fn)  测试方法
  - expect(value)  断言
- 匹配器
  - toBe(value)   判断值是否相等
  - toEqual(obj)   判断对象是否相等
  - toContain(value)   判断数组或者字符串中是否包含
  - ......
- 快照
  - toMatchSnapshot()

重新生成快照
```bash
yarn jest -u
```


## Vue Test Utils 常用的 API

- mount() 
  - 创建一个包含被挂载和渲染的 Vue 组件的 Wrapper
- Wrapper
  - vm        wrapper 包裹的组件实例
  - props()   返回 Vue 实例选项中的 props 对象
  - html()    组件生成的 HTML 标签
  - find()    通过选择器返回匹配到的组件中的 DOM 元素
  - trgger()  触发 DOM 原生事件，自定义事件 wrapper.vm.$emit()
  - ......

# Rollup打包上

- Rollup 是一个模块打包器
- Rollup 支持 Tree-shaking
- 打包的结果比 Webpack 要小
- 开发框架/组件库的时候使用 Rollup 更合适

## 安装依赖

- Rollup
- rollup-plugin-terser   // 压缩
- rollup-plugin-vue@5.1.9   // 把单文件组件编译成js代码，这里一定要指定版本，不同的版本处理vue的版本也是不一样的
- vue-template-compiler  // 这个服务于上面那个组件，帮助 vue 转 js 

## 安装 rollup 以及所需要的插件
```bash
yarn add rollup rollup-plugin-terser rollup-plugin-vue@5.1.9 vue-template-compiler -D -W
```

## rollup 配置文件
在 button 目录中创建 rollup.config.js
```js
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'

module.exports = [
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'es'
      }
    ],
    plugins: [
      vue({
        // Dynamically inject css as a <style> tag
        css: true, 
        // Explicitly convert template to render function
        compileTemplate: true
      }),
      terser()
    ]
  }
]
```

## 配置 build 脚本并运行

找到 button 包中的 package.json 的 scripts 配置
```js
"build": "rollup -c"  // -c 的意思是找到rollup.config.js文件
```

运行打包，可以通过 workspace 运行指定包名下的命令
```bash
yarn workspace lg-button run build
```

# Rollup打包下
打包所有组件

## 安装依赖

还需要安装三个插件
- @rollup/plugin-json  让 rollup 把 json 文件当作模块加载，配置文件中会用到
- rollup-plugin-postcss
- @rollup/plugin-node-resolve 打包的过程中把依赖的第三方包也打包进去

```bash
yarn add @rollup/plugin-json rollup-plugin-postcss @rollup/plugin-node-resolve -D -W
```

## 配置文件

项目茛目创建 rollup.config.js

```js
import fs from 'fs'
import path from 'path'
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const isDev = process.env.NODE_ENV !== 'production'

// 公共插件配置
const plugins = [
  vue({
    // Dynamically inject css as a <style> tag
    css: true,
    // Explicitly convert template to render function
    compileTemplate: true
  }),
  json(),
  nodeResolve(),
  postcss({
    // 把 css 插入到 style 中
    // inject: true,
    // 把 css 放到和js同一目录
    extract: true
  })
]

// 如果不是开发环境，开启压缩
isDev || plugins.push(terser())

// packages 文件夹路径
const root = path.resolve(__dirname, 'packages')

module.exports = fs.readdirSync(root)
  // 过滤，只保留文件夹
  .filter(item => fs.statSync(path.resolve(root, item)).isDirectory())
  // 为每一个文件夹创建对应的配置
  .map(item => {
    const pkg = require(path.resolve(root, item, 'package.json'))
    return {
      input: path.resolve(root, item, 'index.js'),
      output: [
        {
          exports: 'auto',
          file: path.resolve(root, item, pkg.main),
          format: 'cjs'
        },
        {
          exports: 'auto',
          file: path.join(root, item, pkg.module),
          format: 'es'
        },
      ],
      plugins: plugins
    }
  })
```

## 在每一个包中设置 package.json 中的 main 和 module 字段

```js
"main": "dist/cjs/index.js",
"module": "dist/es/index.js"
```

## 根目录的 package.json 中配置 scripts

```js
"build": "rollup -c"
```

#  设置环境变量
删除 stories 和 storystatics 目录
设置环境变量，开发环境不压缩代码，生产环境压缩代码
安装第三方包 cross-env 
```bash
yarn add cross-env -D -W
```
修改package.json 
```js
"build:prod": "cross-env NODE_ENV=production rollup -c",
"build:dev": "cross-env NODE_ENV=develop rollup -c"
```
终端测试打包命令

# 清理
1. 清理所有包中的 node_modules

```js
"clean": "lerna clean" 
```

2. 清理所有包中的 dist

安装第三方库 rimraf，删除指定文件
```bash
yarn add rimraf -D -W
```

在 packages 下的所有组件包中的 package.json 配置命令
```js
"del": "rimraf dist"  
```

终端输入命令触发所有包中的 del 命令
```bash
yarn workspaces run del
```

# 基于模板生成组件基本结构

## 目前完成的工作
- 使用 storybook 预览组件
- 使用 yarn workspaces 管理组件的依赖
- 使用 lerna 发布项目，可以把每个包发布到npm

## 这一课研究组件基本结构生成模板

- 安装 plop
```bash
yarn add plop -D -W
```

- 查看模板文件 plop-template/component

- 查看plop配置文件 plopfile.js

- 添加命令 plop ，这个命令会执行 plop ，根据模板生成目录结构
```js
"plop": "plop"
```

终端命令测试创建一个 link 组件

# 基于模板生成组件基本结构2
实现上节课创建 link 组件，一个超链接组件
主要功能：
- 可以接受外部连接 href
- 可以被禁用
- 默认去掉下划线

#  发布

- 打包
```bash
yarn build:prod
```

- 发布到 npm
```bash
yarn lerna
```



