# 使用 Vue CLI 创建项目

1. 本地创建目录 code ，用来存放各种项目，打开命令行
```bash
vue create edu-boss-fed
```
使用创建命令，创建项目 edu-boss-fed

2. 选择手动选择特性
Babel,TypeScript,Router,Vuex,CSS Pre-processors,Linter/Formatter

3. use class-style component syntax ? y 是指是否用ts类型语言
   use babel alongside typescript ... ? y 是指babel+ts一起使用，ts只转换类型注解，babel负责转换es6
   use history mode for router ? n
   pick css pre-processor ? sass/scss(with dart-sass) / less / stylus 都可以，目前选第一个
   pick linter /formatter ? ESLint + Standard config
   pick additional lint features：lint on save / lint and fix on commit 都选
   Where do you perfer placing config for Babel，ESLint，etc ? In dedicated config files 将 babel 和 eslint 等产生的配置信息保存到各自专用的配置文件中
   save this as a preset for future projects ? 是否需要保存预设

4. 自动安装第三方包

5. cd edu-boss-fed
   npm run serve
   启动项目

# 加入GIT版本管理

1. 创建远程仓库
2. 将本地仓库推到线上

```bash
# 创建本地仓库
git init

# 将文件添加到暂存区
git add 文件

# 提交历史记录
git commit "提交日志"

# 添加远程仓库地址
git remote add origin 你的远程仓库地址

# 推送提交 地址 origin 分支 master -u 是指保存这个配置信息，以后再提交直接 git push 就自动提交到 origin master
git push -u origin master
```

3. 查看本地项目是否有 git repository ？
```bash
git status

git remove -v
```

4. 查看日志
```bash
git log
```

5. 如果单词写错了，比如 origin 写成 orign，那可以通过命令修改
```bash
git remote rename orign origin

git remote -v
```

6. 回到 github 查看更新

#  初始目录结构说明

 1 . 
 2 ├── node_modules # 第三⽅包存储⽬录 
 3 ├── public # 静态资源⽬录，任何放置在 public ⽂件夹的静态资源都会被简单的复 制，⽽不经过 webpack 
 4 │ ├── favicon.ico 
 5 │ └── index.html 
 6 ├── src 
 7 │ ├── assets # 公共资源⽬录，放图⽚等资源 8 │ ├── components # 公共组件⽬录 9 │ ├── router # 路由相关模块 10 │ ├── store # 容器相关模块 
11 │ ├── views # 路由⻚⾯组件存储⽬录 
12 │ ├── App.vue # 根组件，最终被替换渲染到 index.html ⻚⾯中 #app ⼊⼝ 节点 
13 │ ├── main.ts # 整个项⽬的启动⼊⼝模块 
14 │ ├── shims-tsx.d.ts # ⽀持以 .tsc 结尾的⽂件，在 Vue 项⽬中编写 jsx 代码 
15 │ └── shims-vue.d.ts # 让 TypeScript 识别 .vue 模块 
16 ├── .browserslistrc # 指定了项⽬的⽬标浏览器的范围。这个值会被 @babel/pre set-env 和 Autoprefixer ⽤来确定需要转译的 JavaScript 特性和需要添加的 C SS 浏览器前缀 
17 ├── .editorconfig # EditorConfig 帮助开发⼈员定义和维护跨编辑器（或IDE） 的统⼀的代码⻛格 
18 ├── .eslintrc.js # ESLint 的配置⽂件 
19 ├── .gitignore # Git 的忽略配置⽂件，告诉Git项⽬中要忽略的⽂件或⽂件夹 
20 ├── README.md # 说明⽂档 
21 ├── babel.config.js # Babel 配置⽂件 
22 ├── package-lock.json # 记录安装时的包的版本号，以保证⾃⼰或其他⼈在 npm i nstall 时⼤家的依赖能保证⼀致 
23 ├── package.json # 包说明⽂件，记录了项⽬中使⽤到的第三⽅包依赖信息等内容 
24 └── tsconfig.json # TypeScript 配置⽂件

# 调整初始目录结构

默认的目录解构不满足我的开发需求，所以我们需要做一些自定义改动
这里主要处理下面的内容：
- 删除初始化默认文件
- 新增调整我们需要的目录结构
修改 App.vue
```js
<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
</style>
```

修改 router/index.ts
```js
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [

]

const router = new VueRouter({
  routes
})

export default router
```

删除默认示例⽂件： 
- src/views/About.vue 
- src/views/Home.vue 
- src/components/HelloWorld.vue 
- src/assets/logo.png 

创建以下内容： 
- src/services ⽬录，接⼝模块 
- src/utils ⽬录，存储⼀些⼯具模块 
- src/styles ⽬录，存储⼀些样式资源

将目录结构调整提交到 github

# 使用TS开发Vue-环境说明

## 在 vue 项目中启用 ts 支持
两种方式：
1. 全新项目：使用 vue cli 脚手架工具创建 vue 项目
2. 已有项目：添加 vue 官方配置的 ts 适配插件
```bash
vue add @vue/typescript
```

## 关于编辑器
在使用ts开发vue应用程序，强烈建议使用 vscode；对于单文件组件，建议装个插件 vetur 插件；
webstorm 也给 ts 和vue 提供了开箱即用的支持；

# 使用TS开发Vue项目-相关配置说明

1. 安装ts相关的依赖库
dependencies 依赖：
vue-class-component   提供使用class语法写vue组件
vue-property-decorator   在 class 语法基础之上提供了一些辅助装饰器

devDependencies 依赖：
@typescript-eslint/eslint-plugin   使用 ESLint 校验 TypeScript 代码
@typescript-eslint/parser    使用 TypeScript 转为 AST 供 ESLint 校验使用
@vue/cli-plugin-typescript   使用 TypeScript + ts-loader + fork-ts-checker-webpack-plugin 进行更快的类型检查
@vue/eslint-config-typescript    兼容 ESLint 的 TypeScript 校验规则
typescript   TypeScript 编译器，提供类型校验和转换 JavaScript 功能

2. TypeScript 配置文件 tsconfig.json
```js
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

3. shims-vue.d.ts 文件的作用
```js
// 主要用于 ts 识别 .vue 文件模块
// ts 默认不支持导入 .vue 模块，这个文件告诉 ts 导入 .vue 文件模块都按 VueConstructor<Vue> 类型识别处理
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
} 
```

4. shims-tsx.d.ts 文件的作用
```js
// 为 jsx 组件模板补充类型声明

import vue, { VNode } from 'vue'

declare global {}
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
```

5. TypeScript 模块都是用 .ts 后缀

# 使用TS开发Vue项目-使用OptionsAPI定义Vue组件
# 定义组件的方式
## 使用 Options APIs
- 组件仍然可以使用以前的方式定义 (导出组件选项对象，或者使用Vue.extend())
- 但是当我们导出的是一个普通对象，此时TypeScript 无法推断出对应的类型
- 至于 VSCode 可以推断出类型成员的原因是因为我们使用了Vue插件
- 这个插件明确知道我们这里导出的是一个Vue对象
- 所以我们必须使用 vue.extend() 方法确保 TypeScript 能够有正常的类型推断

```js
import Vue from 'vue'
const Component = Vue.extend({
  // 类型推断已启用
})

const Component = {
  // 这里不会有类型推断
  // 因为 TypeScript 不能确认这是 Vue 组件的选项
}
```
ts 的好处：
1. 编辑器给的类型提示
2. typescript 编译期间的类型验证

# 使用TS开发Vue项目-使用ClassAPIs定义Vue组件
如果您在声明组件时更喜欢基于类的 API，则可以使用官方维护的 vue-class-component 装饰器：

```js
import Vue from 'vue'
import Component from 'vue-class-component'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  // 所有的组件选项都可以放在这里
  template: '<button @click="onClick">Click!</button>'
})
export default class MyComponent extends Vue {
  // 初始数据可以直接声明为实例的 property
  message: string = 'Hello!'

  // 组件方法也可以直接声明为实例的方法
  onClick (): void {
    window.alert(this.message)
  }
}
```
vue-class-component 官方文档 https://class-component.vuejs.org/

# 使用TS开发Vue项目-关于装饰器语法
关于装饰器语法：
```js
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the component in class-style
@Component
export default class Counter extends Vue {
  // Class properties will be component data
  count = 0

  // Methods will be component methods
  increment(){
    this.count++
  }
  decrement(){
    this.count--
  }
}
```
装饰器是ES草案中的一个新特性，不过这个草案最近有可能发生重大调整，所以不建议在生产环境中使用

类的装饰器
```js
function testable(target) {
  target.isTestable = true
}

@testable
class MyTestableClass {
  // ...
}

console.log(MyTestableClass.isTestable) // true
```

如果觉得一个参数不够用，可以在装饰器外面再封装一层函数

文档 https://es6.ruanyifeng.com/#docs/decorator
ts官网的装饰器语法 https://www.typescriptlang.org/docs/handbook/decorators.html

# 使用TS开发Vue项目-使用VuePropertyDecorator创建Vue组件
配合 vue-class-component 使用的库 https://github.com/kaorun343/vue-property-decorator 定义常用的装饰器语法可以简化 vue-class-component 的语法，但是因为装饰器还处于草案中修改阶段，不建议使用

举个例子：
```js
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
```

is equivalent to

```js
export default {
  props: {
    propA: {
      type: Number,
    },
    propB: {
      default: 'default value',
    },
    propC: {
      type: [String, Boolean],
    },
  },
}
```

# 使用TS开发Vue项目-总结创建组件的方式
## 总结
创建组件的三种方式：
1. Options APIs
```js
import Vue from 'vue'

export default Vue.extend({
  data(){
    return {
      count: 0
    }
  },
  methods: {
    increment(){
      this.count++
    }
    decrement(){
      this.count--
    }
  }
})
```

2. Class APIs
```js
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the component in class-style
@Component
export default class Counter extends Vue {
  // Class properties will be component data
  count = 0

  // Methods will be component methods
  increment(){
    this.count++
  }
  decrement(){
    this.count--
  }
}
```

3. Class APIs + decorator
```js
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
```

个人建议： No Class APIs 只用 Options APIs
class 语法只是一种写法，最终还是回转换为普通的组件数据结构；
装饰器语法还没有正式定稿发布，建议了解即可，正式发布以后再选择使用；
最好是用 export default Vue.extend({})

# 代码格式规范-介绍
- 代码格式规范介绍
- 项目中配置的具体代码格式规范是什么
- 遇到代码格式规范错误怎么办
- 如何自定义代码格式校验规范

良好的代码格式有利于：
多人协作；
更好的阅读；
更好的维护；

## 标准是什么
- [standard](https://standardjs.com/)
- [airbnb](https://github.com/airbnb/javascript)
- [google](https://google.github.io/styleguide/jsguide.html)

## 如何约束
JSLint
JSHint
ESLint(常用)

# 代码格式规范-项目中的代码规范说明

eslint 配置文件
```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  // 使用插件的编码规则
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  // 自定义编码校验规则
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

```
'plugin:vue/essential' 对应的是插件是 eslint-plugin-vue 专门用校验 vue 文件的 vue 语法；文档地址 https://eslint.vuejs.org/

@vue/standard 对应的插件是 @vue/eslint-config-standard， 而它又依赖插件 eslint-plugin-standard
@vue/typescript/recommended 对应的插件 @vue/eslint-config-typescript 文档 https://github.com/vuejs/eslint-config-typescript#readme

# 代码格式规范-自定义校验规则
eslint 官方文档 cn.eslint.org，用户指南-配置-搜索rules；
用户指南-规则：介绍了可以配置的各种规则参数；
比如：必须得又分号，没有就报错
```js
'semi': ['error','always']
```
目录 node_modules 下有个.cache文件，这里缓存了很多处理；修改规则以后，如果重启不生效，那你需要把这个缓存文件删除后再重启才会生效；

配置ts语法示例：
比如 interface 里的不加分号；
配置文档 https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
```js
rules: {
  '@typescript-eslint/member-delimiter-style': ['error', {
    "multiline": { // 多行
      "delimiter":"none",
      "requireLast": true
    }
  }]
}
```

# 导入Element组件库
1. 安装
```nash
npm i element-ui -S
```

2. 在 main.ts 中导入
```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

```

# 样式处理
```js
src/styles
├── index.scss # 全局样式（在入口模块被加载生效）
├── mixin.scss # 公共的 mixin 混入（可以把重复的样式封装为 mixin 混入到复用的地方）
├── reset.scss # 重置基础样式
└── variables.scss # 公共样式变量
```

variables.scss
```scss
$primary-color: #40586F;
$success-color: #51cf66;
$warning-color: #fcc419;
$danger-color: #ff6b6b;
$info-color: #868e96; // #22b8cf;

$body-bg: #E9EEF3; // #f5f5f9;

$sidebar-bg: #F8F9FB;
$navbar-bg: #F8F9FB;

$font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

index.scss
```scss
@import './variables.scss';

// globals
html {
  font-family: $font-family;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  // better Font Rendering
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background-color: $body-bg;
}

// custom element theme
$--color-primary: $primary-color;
$--color-success: $success-color;
$--color-warning: $warning-color;
$--color-danger: $danger-color;
$--color-info: $info-color;
// change font path, required
$--font-path: '~element-ui/lib/theme-chalk/fonts';
// import element default theme
@import '~element-ui/packages/theme-chalk/src/index';
// node_modules/element-ui/packages/theme-chalk/src/common/var.scss

// overrides

// .el-menu-item, .el-submenu__title {
//   height: 50px;
//   line-height: 50px;
// }

.el-pagination {
  color: #868e96;
}

// components

.status {
  display: inline-block;
  cursor: pointer;
  width: .875rem;
  height: .875rem;
  vertical-align: middle;
  border-radius: 50%;

  &-primary {
    background: $--color-primary;
  }

  &-success {
    background: $--color-success;
  }

  &-warning {
    background: $--color-warning;
  }

  &-danger {
    background: $--color-danger;
  }

  &-info {
    background: $--color-info;
  }
}

```

# 样式处理-共享全局样式变量
把某些公共scss变量注入到全局中
比如 variables.scss 注入全局
任何scss样式中都可以直接使用 variables.scss 中的变量

https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9

```js
module.exports = {
  ...
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/variables.scss";`
      },
    }
  }
}
```

# 接口处理-配置后端代理

## 配置接口代理

后台为我们提供了数据接⼝，分别是： 

- https://eduboss.lagou.com 
- http://edufront.lagou.com 

这两个接⼝都没有提供 CORS 跨域请求，所以需要在客户端配置服务端代理处理跨域请求。

配置客户端层面的服务端代理跨域可以参考官方文档中的说明：

- https://cli.vuejs.org/zh/config/#devserver-proxy
- https://github.com/chimurai/http-proxy-middleware

下面是具体的操作流程
配置文件 vue.config.js

```js
devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        ws: true, // websocket 这里没用到
        changeOrigin: true // 把 header 中的 host 改成 target 
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true // 把 header 中的 host 改成 target 
      },
    }
  }
```

配置完以后重启服务，浏览器输入localhost:8080/boss 查看是否访问
正常可能显示 Unauthorized


# 接口处理-封装请求模块

安装 axios
```nash
npm i axios
```

创建 src/utils/request.ts
```js
import axios from 'axios'

const request = axios.create({
  // config
})

export default request
```

# 布局-初始化路由组件
导入 element 组件库

```nash
npm i element-ui
```

main.ts 导入

## 初始化页面路由组件

我们这⾥先把这⼏个主要的⻚⾯配置出来，其它⻚⾯在随后的开发过程中配置。 
| 路径 | 说明 |
| :--: | :--: |
| /    | ⾸⻚ |
| /login | ⽤户登录 |
| /role | ⻆⾊管理 |
| /menu | 菜单管理 |
| /resource | 资源管理 |
| /course | 课程管理 |
| /user | ⽤户管理 |
| /advert | ⼴告管理 |
| /advert-space | ⼴告位管理 |

配置好路由表
```js
 {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
```
/* webpackChunkName: 'login' */ 的作用是打包的时候，包名叫login，方便调试维护

# 布局-Layout和嵌套路由
定义 layout 作为主要部分的父亲路由, layout 包含头部，侧边栏，内容主体
```js
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

```

# 布局-Container布局容器
layout/index.vue
```vue
<template>
  <el-container>
    <el-aside width="200px">
      <app-aside />
    </el-aside>
    <el-container>
      <el-header>
        <app-header />
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  // min-width: 980px;
}

.el-aside {
  background: #d3dce6;
}

.el-header {
  background: #fff;
}

.el-main {
  background: #e9eef3;
}
</style>

```

# 布局-侧边栏菜单
layout/components/app-aside.vue
```vue
<template>
  <div class="aside">
    <el-menu
      default-active="4"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-setting"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-setting"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-setting"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i>
          <span slot="title">广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-setting"></i>
          <span slot="title">广告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppAside',
  methods: {
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },

    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  }
})
</script>

<style lang="scss" scoped>
.aside {
  .el-menu {
    min-height: 100vh;
  }
}
</style>

```

#  布局-头部Header
app-header.vue
```vue
<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户ID</el-dropdown-item>
        <el-dropdown-item divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppHeader'
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>

```

#  登录-页面布局
login/index.vue
```vue
<template>
  <div class="login">
    <!--
      1. :model="ruleForm"
      2. :rules="rules"
      3. ref="ruleForm"
      4. el-form-item 绑定 prop 属性
     -->
    <el-form
      class="login-form"
      label-position="top"
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="isLoginLoading"
          @click="submit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoginLoading: false
    }
  },

  methods: {
     submit(){

    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>

```

#  登录-接口测试
可以用postman，可以创建 collections，可以添加子组，可以添加基础的url，将api中公用的域名做成baseurl；
可以参考视频，或者其他文档研究一下，不算复杂

# 登录-请求登录
逻辑：
1. 表单验证
2. 验证通过-提交表单
3. 处理请求结果
  3.1  成功-跳转
  3.2  失败-提示

如果服务器对content-type格式有要求必须是 x-www-form-urlencoded,那我们一般会安装qs来处理
```nash
npm i qs
```
request 格式参考
```js
import qs from 'qs'
...
form: {
  phone: '',
  password: ''
}
...
const { data } = await request({
  method:'POST',
  url: '/front/user/login',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(this.form) // qs 处理以后
})
```

# 登录-处理请求结果
```js
if(data.state !== 1) {
  return this.$message.error(data.message) 
}
this.$router.push({
  name: 'home'
})
this.$message.success(data.message)
```

# 登录-请求期间禁用按钮点击

- el-button  有个 loading 属性；
- 发起请求以前开始loading；
- 请求结束不论什么结果都要结束loading；

# 登录-表单验证
rules内容
```js
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
```
el-form 绑定 rules 和 el-form-item 绑定 prop

自定义校验规则：async-validator

所以最后的 submit 方法中的表单处理,表单没通过代码就不执行了
```js
import { Form } from 'element-ui'
...
async onSubmit () {
      try {
        // 1. 表单验证
        await (this.$refs.form as Form).validate()  // promise 错误结果用 try catch 捕获
        // 2. 登录请求
        ...

      } catch (err) {
        console.log('登录失败', err)
      }
    }
```
# 登录-封装请求方法
services/user.ts
```ts
/**
 * 用户相关请求模块
 */

import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },

    // 如果 data 是普通对象，则 Content-Type 是 application/json
    // 如果 data 是 qs.stringify(data) 转换之后的数据：key=value&key=value，则 Content-Type 会被设置为 application/x-www-form-urlencoded
    // 如果 data 是 FormData 对象，则 Content-Type 是 multipart/form-data
    data: qs.stringify(data) // axios 默认发送的是 application/json 格式的数据
  })
}
```
login/index.vue
```js
import { login } from "@/services/user";

    async onSubmit() {
      try {
        // 1. 表单验证
        await (this.$refs.form as Form).validate();

        // 登录按钮 loading
        this.isLoginLoading = true;

        // 2. 验证通过 -> 提交表单
        const { data } = await login(this.form);
        
        // 3. 处理请求结果
        //    失败：给出提示
      } catch (err) {
        console.log("登录失败", err);
      }

      // 结束登录按钮的 loading
      this.isLoginLoading = false;
    },
```

# 登录-关于请求体data和ContentType的问题

```ts
export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },

    // 如果 data 是普通对象，则 Content-Type 是 application/json
    // 如果 data 是 qs.stringify(data) 转换之后的数据：key=value&key=value，则 Content-Type 会被设置为 application/x-www-form-urlencoded
    // 如果 data 是 FormData 对象，则 Content-Type 是 multipart/form-data
    data: qs.stringify(data) // axios 默认发送的是 application/json 格式的数据
  })
}
```

# 身份认证-把登录状态存储到Vuex容器中
1. 登录成功，记录登录状态，状态需要能够全局访问（放到 Vuex 容器中）
2. 然后在访问需要登录的页面的时候判断有没有登录状态（路由拦截器）

store/index.ts
```ts
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态实现了数据共享，在组件里面访问方便，但是没有持久化的功能
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
    // user: null // 当前登录用户状态
  },
  mutations: {
    // 修改容器数据必须使用 mutation 函数
    setUser (state, payload) {
      state.user = JSON.parse(payload)

      // 为了防止页面刷新数据丢失，我们需要把 user 数据持久化
      // 注意：本地存储只能存字符串
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
```

# 身份认证-校验页面访问权限
router/index.ts
```ts
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true  // 父路由下的所有子路由都需要认证
    },
    children: [
     ...
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫：任何页面的访问都要经过这里
// to：要去哪里的路由信息
// from：从哪里来的路由信息
// next：通行的标志
router.beforeEach((to, from, next) => {
  // to.matched 是一个数组（匹配到是路由记录）
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      next({
        name: 'login',
        query: { // 通过 url 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next() // 允许通过
    }
  } else {
    next() // 允许通过
  }

  // // 路由守卫中一定要调用 next，否则页码无法展示
  // next()
  // if (to.path !== '/login') {
  //   // 校验登录状态
  // }

export default router

```

# 身份认证-测试获取当前登录用户信息接口
登录接口以外的其他接口都需要在header理添加 Authorization
参考视频 可以在 postman 里统一设置

# 身份认证-登录成功跳转回原来页面

记录登录以前所处的页面状态，下次再进入的时候可以直接进入到这里
一般是在路由前置导航中配置到login的redirect 中
在登录成功以后，路由push的参数要从 redirect 中读取

router/index.ts
```ts
router.beforeEach((to, from, next) => {
  // to.matched 是一个数组（匹配到是路由记录）
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      next({
        name: 'login',
        query: { // 通过 url 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next() // 允许通过
    }
  } else {
    next() // 允许通过
  }
```
login/index.vue
```js
this.$router.push(this.$route.query.redirect as string || '/')
```

# 身份认证-展示当前登录用户信息
services/user.ts
```ts
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
```
authorization 都是配置在 request 底层 header 里的
layout/components/app-header.vue
```js
async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
      console.log('loadUserInfo')
    },
```

# 身份认证-使用请求拦截器统一设置Token
utils/request.ts
```ts
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 我们就在这里通过改写 config 配置信息来实现业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  // 注意：这里一定要返回 config，否则请求就发不出去了
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
```

# 身份认证-用户退出
app-header.vue
退出组件添加方法 handleLogout
```vue
<template>
<el-dropdown-item
  divided
  @click.native="handleLogout"
  >退出</el-dropdown-item>
</template>
<script>
export default Vue.extend({
  name: 'AppHeader',
  methods: {
    handleLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认执行这里
        // 清除登录状态
        this.$store.commit('setUser', null)

        // 跳转到登录页面
        this.$router.push({
          name: 'login'
        })

        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => { // 取消执行这里
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
})
</script>
```

# 处理Token过期-概念介绍
access_token 
会过期，有时间限制  

express_in  
过期时间

refresh_token
作用：刷新获取新的 access_token

如何处理？
方式1：请求前拦截每个请求，判断 token 的有效时间是否已经过期，若已经过期，则将请求挂起，先刷新token再请求

优点：在请求前拦截，节省流量
缺点：需要后端额外提供一个token过期的时间段；用本地时间判断，若本地时间被篡改，拦截会失败；

方式2：请求后，401错误后再刷新token，再调一次接口；

优点：不需要额外的token过期字段，不需要判断时间
缺点：会多消耗一次请求

一般还是用方式2

#  处理Token过期-分析响应拦截器
request.ts
```ts
request.interceptors.response.use(function (response) { // 状态码为 2xx 都会进入这里
  // console.log('请求响应成功了 => ', response)
  // 如果是自定义错误状态码，错误处理就写到这里
  return response
}, function (error) { // 超出 2xx 状态码都都执行这里
  // 把请求失败的错误对象继续抛出，扔给上一个调用者
  return Promise.reject(error)
})
```

# 处理Token过期-axios错误处理
错误处理的三种情况
```ts
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了 2xx 范围
    ...
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }
```

# 处理Token过期-错误消息提示
```ts
import { Message } from 'element-ui'
....

  if (error.response) { // 请求发出去收到响应了，但是状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效（没有提供 token、token 是无效的、token 过期了）
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }
```

# 处理Token过期-实现基本流程逻辑
1. 用户不存在返回登录
2. 尝试刷新获取新的token
3. 成功了 - 把本次失败的请求重新发出去
4. 失败了 - 跳转登录页面重新登录获取新的 token

```ts
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

...

async function (){
  ...
  // 本地没用户信息
  if(!store.state.user){
    redirectLogin()
    return Promise.reject(error)
  }
  // 尝试刷新获取新的 token
  try{
  const { data } = await axios.create()({
    method:'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
  // 成功了 把本次失败的请求发出去
  // 把刷新拿到的新得 access_token 更新到容器和本地
  store.commit('setUser', data.content)
  // 把本次失败的请求重新发出去
  return request(error.config)
 }catch(err){
   // 把当前登录状态清理
   store.commit('serUser', null)
   // 失败了 跳转登录页面
   redirectLogin()
   return Promise.reject(error)
 }
}

```

# 处理Token过期-关于多次请求的问题
以上的处理是一次请求的401，如果同时有多个请求发起，都是 401 那怎么处理？
刷新token只能用一次，第二次再用就会401

# 处理Token过期-解决多次请求刷新Token问题
为了解决上面的问题，增加一个boolen值判断当前是否在刷新，保证刷新token只执行一次

```ts
function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      // refresh_token 只能使用1次
      refreshtoken: store.state.user.refresh_token
    })
  })
}

let isRfreshing = false // 控制刷新 token 的状态

...
 // 刷新 token
      if (!isRfreshing) {
        isRfreshing = true // 开启刷新状态
        // 尝试刷新获取新的 token
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          }
          // 刷新 token 成功了
          store.commit('setUser', res.data.content)
          return request(error.config)
        }).catch(err => {
          console.log(err)
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRfreshing = false // 重置刷新状态
        })
      }
```

# 处理Token过期-解决多次请求其它接口重试的问题

刷新token期间，发起的请求失败了以后要将他们挂起存起来
再刷新token成功以后，再让他们重新发起
最后存储容器要清空

```ts
let requests: any[] = [] // 存储刷新 token 期间过来的 401 请求
...
 // 刷新 token
      if (!isRfreshing) {
        isRfreshing = true // 开启刷新状态
        // 尝试刷新获取新的 token
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          }

          // 刷新 token 成功了
          store.commit('setUser', res.data.content)
          // 把 requests 队列中的请求重新发出去
          requests.forEach(cb => cb())
          // 重置 requests 数组
          requests = []
          return request(error.config)
        }).catch(err => {
          console.log(err)
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRfreshing = false // 重置刷新状态
        })
      }

      // 刷新状态下，把请求挂起放到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
```

# 用户和权限模块介绍
给角色分配不同的权限
给用户分配不同的角色

# 分析模块开发的流程
资源和菜单 => 角色 => 用户

# 菜单管理-添加菜单
菜单管理功能：
添加/删除/编辑/查询

## 增删改查的接口
目录地址 services/menu.ts 存放菜单相关接口
```ts
/**
 * 菜单相关请求模块
 */

import request from '@/utils/request'

export const createOrUpdateMenu = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

```

## 添加菜单组件
菜单列表页点击按钮添加菜单，跳转到添加菜单页面
需要三个改动：
1. 菜单页添跳转 create-menu
2. 路由添加 create-menu
3. create-menu 组件

views/menu/index.vue
```vue
<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })">添加菜单</el-button>
      </div>
      ...
    </el-card>
  </div>
</template>
```

router/index.ts
```ts
{
  path: '/menu/create',
  name: 'menu-create',
  component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue')
}
```

views/menu/create.vue
因为添加和编辑都用同一份组件，所以封装了一下，这里做成通用组件 CreateOrEdit
```vue
<template>
  <div class="menu-create">
    <create-or-edit />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateOrEdit
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
```

views/menu/components/CreateOrEdit.vue
```vue
<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option :value="-1" label="无上级菜单"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in parentMenuList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum" :min="1" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button
            v-if="!isEdit"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'

export default Vue.extend({
  name: 'MenuCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1, // -1 表示没有上级菜单
        name: '123',
        href: '123',
        icon: '123',
        orderNum: 0,
        description: '123',
        shown: false
      },
      parentMenuList: [] // 父级菜单列表
    }
  },

  created () {
    this.loadMenuInfo()
  },

  methods: {
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    },

    async onSubmit () {
      // 1. 表单验证
      // 2. 验证通过，提交表单
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.back()
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>

```

# 菜单管理-展示菜单列表
获取所有菜单，每一项可以编辑，删除

views/menu/index.vue
```vue
<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })">添加菜单</el-button>
      </div>
      <el-table
        :data="menus"
        style="width: 100%">
        <el-table-column
          label="编号"
          min-width="150"
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: [] // 菜单列表
    }
  },

  created () {
    this.loadAllMenus()
  },

  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },

    handleEdit (item: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },

    handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => { // 确认执行这里
          // 请求删除操作
          const { data } = await deleteMenu(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus() // 更新数据列表
          }
        })
        .catch(err => { // 取消执行这里
          console.log(err)
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang="scss" scoped></style>
```
views/menu/edit.vue
```vue
<template>
  <div class="menu-create">
    <create-or-edit :is-edit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateOrEdit
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>

```

router/index.ts
```ts
{
  path: '/menu/:id/edit',
  name: 'menu-edit',
  component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue')
},
```

# 资源管理

## 主要组件模块
resource/index.vue 这个文件主要是用来管理了
```vue
<template>
  <div class="resource">
    <resource-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/List.vue'

export default Vue.extend({
  name: 'ResourceIndex',
  components: {
    ResourceList
  }
})
</script>

<style lang="scss" scoped></style>

```

真的内容在封装的组件里
resource/components/list.vue
包括分页查询数据
```vue
<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="isLoading"
            >查询搜索</el-button>
            <el-button
              @click="onReset"
              :disabled="isLoading"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          width="180"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          width="180"
          label="描述">
        </el-table-column>
        <el-table-column
          width="180"
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--
        total 总记录数
        page-size 每页大小
        分页组件会自动根据 total 和 page-size 计算出一共分多少页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第1页数据
        size: 5, // 每页大小
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true // 加载状态
    }
  },

  created () {
    this.loadResources()
    this.loadResourceCategories()
  },

  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },

    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },

    onSubmit () {
      this.form.current = 1 // 筛选查询从第 1 页开始
      this.loadResources()
    },

    handleEdit (item: any) {
      console.log('handleEdit', item)
    },

    handleDelete (item: any) {
      console.log('handleDelete', item)
    },

    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第1页数据
      this.loadResources()
    },

    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    },

    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第1页
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped></style>
```

## 相关接口模块
services/resource.ts
```ts
/**
 * 资源相关请求模块
 */

import request from '@/utils/request'

export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getAllResources = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}
```

services/resource-category.ts
```ts
/**
 * 资源分类相关请求模块
 */

import request from '@/utils/request'

export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

```

# 角色管理-模块介绍
权限管理-角色管理
创建角色，给角色分配菜单和资源，不同的角色功能不一样
分配菜单：新的页面，勾选的方式分配这个角色可以访问的菜单种类和数目
分配资源：给当前角色分配操作功能的权限，大部分都是修改数据级别的，也是勾选的方式

# 角色管理-添加/编辑角色
添加/编辑角色表单部分重复，所以复用即可；
添加/编辑角色都是用弹出框的方式展示，但是弹出框内部的表单最好还是封装成通用组件；
这里要注意一点，弹出框只有第一次是created，后面都是显示和隐藏，而内部的通用组件可能会需要声明周期的循环，创建和销毁，所以我们这里要让通用组件v-if，随着弹出框显示和创建，隐藏而销毁；

首先还是要封装接口:获取所有角色/根据id获取角色
services/role.ts
```ts
/**
 * 角色相关请求模块
 */

import request from '@/utils/request'

export const getRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const deleteRole = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

export const createOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const getRoleById = (id: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}
```

role/index.vue
```vue
<template>
  <div class="role">
    <role-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoleList from './components/List.vue'

export default Vue.extend({
  name: 'RoleIndex',
  components: {
    RoleList
  }
})
</script>

<style lang="scss" scoped></style>
```

创建/编辑角色的通用组件 role/components/CreateOrEdit.vue
```vue
<template>
  <div>
    <el-form>
      <el-form-item label="角色名称">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input type="textarea" v-model="role.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdate, getRoleById } from '@/services/role'

export default Vue.extend({
  name: 'CreateOrEditRole',
  props: {
    roleId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      role: {
        code: '',
        name: '',
        description: ''
      }
    }
  },

  created () {
    // 如果是编辑操作，则根据角色 ID 加载展示角色信息
    if (this.isEdit) {
      this.loadRole()
    }
  },

  methods: {
    async loadRole () {
      const { data } = await getRoleById(this.roleId)
      this.role = data.data
    },

    async onSubmit () {
      await createOrUpdate(this.role)
      this.$message.success('操作成功')
      this.$emit('success')
    }
  }
})
</script>

<style lang="scss" scoped></style>

```

展示角色列表的组件 role/components/List.vue
```vue
<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <span>筛选搜索</span> -->
        <el-form ref="form" :model="form">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="loading"
            >查询搜索</el-button>
            <el-button
              :disabled="loading"
              @click="onReset"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="handleAdd">添加角色</el-button>
      <el-table
        :data="roles"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="编号"
        />
        <el-table-column
          prop="name"
          label="角色名称"
        />
        <el-table-column
          prop="description"
          label="描述"
        />
        <el-table-column
          prop="createdTime"
          label="添加时间"
        />
        <el-table-column
          label="操作"
          align="center"
          width="150px"
        >
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配菜单</el-button>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配资源</el-button>
            </div>
            <div>
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <create-or-edit
        v-if="dialogVisible"
        :role-id="roleId"
        :is-edit="isEdit"
        @success="onSuccess"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoles, deleteRole } from '@/services/role'
import { Form } from 'element-ui'
import CreateOrEdit from './CreateOrEdit.vue'

export default Vue.extend({
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      roles: [], // 角色列表
      form: {
        current: 1,
        size: 50,
        name: ''
      }, // 查询条件
      loading: false,
      dialogVisible: false, // 控制添加/编辑角色的对话框显示和隐藏
      roleId: null, // 编辑角色的 ID
      isEdit: false
    }
  },

  created () {
    this.loadRoles()
  },

  methods: {
    async loadRoles () {
      this.loading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.loading = false
    },

    onSubmit () {
      this.loadRoles()
    },

    handleEdit (role: any) {
      this.dialogVisible = true
      this.roleId = role.id
      this.isEdit = true
    },

    async handleDelete (role: any) {
      try {
        await this.$confirm(`确认删除角色：${role.name}？`, '删除提示')
        await deleteRole(role.id)
        this.$message.success('删除成功')
        this.loadRoles()
      } catch (err) {
        if (err && err.response) {
          this.$message.error('删除失败，请重试')
        } else {
          this.$message.info('取消删除')
        }
      }
    },

    onReset () {
      (this.$refs.form as Form).resetFields()
      this.loadRoles()
    },

    onSuccess () {
      this.dialogVisible = false // 关闭对话框
      this.loadRoles() // 重新加载数据列表
    },

    handleAdd () {
      this.isEdit = false
      this.dialogVisible = true
    }
  }
})
</script>

<style lang="scss" scoped></style>

```

# 角色管理-分配菜单
分配菜单和分配资源都是新得页面，所以需要添加路由，并且打开props，可以从路径中获取id
router/index.ts
```ts
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
        props: true // 将路由路径参数映射到组件的 props 数据中
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-resource.vue'),
        props: true // 将路由路径参数映射到组件的 props 数据中
      }
```

分配菜单页面得三个接口：
1. 获取所有菜单项
2. 获取已经选中得菜单
3. 保存修改得菜单
services/menu.ts
```ts
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

export const getRoleMenus = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: { // axios 会把 params 转换为 key=value&key=value 的数据格式放到 url 后面(以?分割)
      roleId
    }
  })
}
```

分配菜单页面，使用el-tree来实现
role/alloc-menu.vue
```vue
<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配菜单</span>
      </div>
      <el-tree
        ref="menu-tree"
        :data="menus"
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
      ></el-tree>
      <div style="text-align: center">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getMenuNodeList,
  allocateRoleMenus,
  getRoleMenus
} from '@/services/menu'
import { Tree } from 'element-ui'
import { getRoleById } from '@/services/role'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },

  async created () {
    await this.loadMenus()
    this.loadRoleMenus()
  },

  methods: {
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },

    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          // this.checkedKeys.push(menu.id as never)
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },

    async loadMenus () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },

    async onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      // 拿到选中节点的数据 id 列表
      // 请求提交保存
      await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      this.$message.success('操作成功')
      this.$router.back()
    },

    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped></style>

```

# 角色管理-分配资源
功能与上类似，参考源码

# 用户管理-模块介绍
1. 查询用户列表
2. 给用户分配角色
3. 禁用用户

# 用户管理-分配角色
用户管理相关接口
services/role.ts
```ts
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export const allocateUserRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

export const getUserRoles = (userId: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
```

services/user.ts
```ts
 export const getUserPages = (data: any) => {
   return request({
     method: 'POST',
     url: '/boss/user/getUserPages',
     data
   })
 }
 
 export const forbidUser = (userId: string | number) => {
   return request({
     method: 'POST',
     url: '/boss/user/forbidUser',
     params: {
       userId
     }
   })
 }
```

# 用户管理-核心组件
user/components/UserList.vue
```vue
<template>
  <el-card>
    <div slot="header">
      <el-form :model="filterParams" ref="filter-form">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="filterParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="filterParams.rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="loading"
            @click="handleReset"
          >重置</el-button>
          <el-button
            type="primary"
            @click="handleQuery"
            :disabled="loading"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="users"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        prop="id"
        label="用户ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="头像"
        width="80">
        <template slot-scope="scope">
          <img width="30px" :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        width="120">
      </el-table-column>
      <!-- <el-table-column
        prop="name"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="ENABLE"
            inactive-value="DISABLE"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleForbidUser(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleSelectRole(scope.row)"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAllocRole"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, forbidUser } from '@/services/user'
import { Form } from 'element-ui'
import {
  getAllRoles,
  allocateUserRoles,
  getUserRoles
} from '@/services/role'

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      loading: true,
      dialogVisible: false,
      roles: [],
      roleIdList: [],
      currentUser: null // 分配角色的当前用户
    }
  },

  created () {
    this.loadUsers()
  },

  methods: {
    async loadUsers () {
      this.loading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      this.users = data.data.records
      this.loading = false
    },

    async handleForbidUser (user: any) {
      const { data } = await forbidUser(user.id)
      console.log(data)
    },

    handleQuery () {
      this.filterParams.currentPage = 1
      this.loadUsers()
    },

    handleReset () {
      (this.$refs['filter-form'] as Form).resetFields()
      this.loadUsers()
    },

    async handleSelectRole (role: any) {
      this.currentUser = role
      // 加载角色列表
      const { data } = await getAllRoles()
      this.roles = data.data

      const { data: { data: userRoles } } = await getUserRoles((this.currentUser as any).id)
      this.roleIdList = userRoles.map((item: any) => item.id)

      // 展示对话框
      this.dialogVisible = true
    },

    async handleAllocRole () {
      const { data } = await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      })
      this.$message.success('操作成功')
      this.dialogVisible = false
    }
  }
})
</script>

<style lang="scss" scoped></style>
```
user/index.vue
```vue
<template>
  <div class="user">
    <user-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserList from './components/UserList.vue'

export default Vue.extend({
  name: 'UserIndex',
  components: {
    UserList
  }
})
</script>

<style lang="scss" scoped></style>
```

# 课程管理-模块介绍
查询课程/新建课程/编辑课程/删除课程
上架下架
内容管理：课时，阶段，上传视频

# 添加课程/编辑课程
- 添加课程是一个结构颇为复杂的表单组件
- 封面上传图片是要封装成一个通用上传组件使用
- 课程详情是富文本编辑器，这里也需要做一个封装

## 课程相关接口
services/course.ts
```ts
/**
 * 课程相关请求模块
 */

import request from '@/utils/request'

export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const changeState = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

export const uploadCourseImage = (data: any, onUploadProgress: (progressEvent: ProgressEvent) => void) => {
  // 该接口要求的请求数据类型是：multipart/form-data
  // 所以需要提交 FormData 数据对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // HTML5 新增的上传响应事件：progress
    onUploadProgress
  })
}

export const getCourseById = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

```

## 课程列表展示
views/course/index.vue
```vue
<template>
  <div class="course">
    <course-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseList from './components/CourseList.vue'

export default Vue.extend({
  name: 'CourseIndex',
  components: {
    CourseList
  }
})
</script>

<style lang="scss" scoped></style>

```

views/course/components/CourseList.vue
```vue
<template>
  <div class="course-list">
    <el-card>
      <div slot="header">
        <span>数据筛选</span>
      </div>
      <el-form
        ref="form"
        label-width="70px"
        label-position="left"
        :model="filterParams"
      >
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="filterParams.courseName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="filterParams.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="loading"
            @click="handleReset"
          >重置</el-button>
          <el-button
            type="primary"
            :disabled="loading"
            @click="handleFilter"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header">
        <span>查询结果：</span>
        <el-button
          style="float: right; margin-top: -5px"
          type="primary"
          @click="$router.push({
            name: 'course-create'
          })"
        >添加课程</el-button>
      </div>
      <el-table
        :data="courses"
        v-loading="loading"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="50">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="上架状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStatusLoading"
              @change="onStateChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="$router.push({
                name: 'course-edit',
                params: {
                  courseId: scope.row.id
                }
              })"
            >编辑</el-button>
            <el-button
              @click="$router.push({
                name: 'course-section',
                params: {
                  courseId: scope.row.id
                }
              })"
            >内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="loading"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      filterParams: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: ''
      },
      courses: [],
      totalCount: 0,
      loading: true
    }
  },

  created () {
    this.loadCourses()
  },

  methods: {
    async loadCourses () {
      this.loading = true
      const { data } = await getQueryCourses(this.filterParams)
      data.data.records.forEach((item: any) => {
        item.isStatusLoading = false
      })
      this.courses = data.data.records
      this.totalCount = data.data.total
      this.loading = false
    },

    handleCurrentChange (page: number) {
      this.filterParams.currentPage = page
      this.loadCourses()
    },

    handleFilter () {
      this.filterParams.currentPage = 1
      this.loadCourses()
    },

    handleReset () {
      (this.$refs.form as Form).resetFields()
      this.filterParams.currentPage = 1
      this.loadCourses()
    },

    async onStateChange (course: any) {
      course.isStatusLoading = true
      const { data } = await changeState({
        courseId: course.id,
        status: course.status
      })
      this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`)
      course.isStatusLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>

```

## 添加和编辑课程
views/course/create.vue
```vue
<template>
  <div class="course-create">
    <create-or-update />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseCreate',
  components: {
    CreateOrUpdate
  }
})
</script>

<style lang="scss" scoped>
</style>
```
views/course/edit.vue
```vue
<template>
  <div class="course-create">
    <create-or-update
      is-edit
      :course-id="courseId"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseEdit',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    CreateOrUpdate
  }
})
</script>

<style lang="scss" scoped>
</style>
```
添加和编辑用的是一个组件来完成
views/course/components/CreateOrUpdate.vue
```vue
<template>
  <el-card>
    <div slot="header">
      <el-steps :active="activeStep" simple>
        <el-step
          :title="item.title"
          :icon="item.icon"
          v-for="(item, index) in steps"
          :key="index"
          @click.native="activeStep = index"
        ></el-step>
      </el-steps>
    </div>
    <el-form label-width="80px">
      <div v-show="activeStep === 0">
        <el-form-item label="课程名称">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input v-model="course.brief"></el-input>
        </el-form-item>
        <el-form-item label="课程概述">
          <el-input
            style="margin-bottom: 10px"
            v-model="course.previewFirstField"
            type="textarea"
            placeholder="概述1"
          ></el-input>
          <el-input
            v-model="course.previewSecondField"
            type="textarea"
            placeholder="概述2"
          ></el-input>
        </el-form-item>
        <el-form-item label="讲师姓名">
          <el-input v-model="course.teacherDTO.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input v-model="course.teacherDTO.description"></el-input>
        </el-form-item>
        <el-form-item label="课程排序">
          <el-input-number
            v-model="course.sortNum"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </div>
      <div v-show="activeStep === 1">
        <el-form-item label="课程封面">
          <!--
            upload 上传文件组件，它支持自动上传，你只需要把上传需要参数配置一下就可以了
            -->
          <!--
            1. 组件需要根据绑定的数据进行图片预览
            2. 组件需要把上传成功的图片地址同步到绑定的数据中
            v-model 的本质还是父子组件通信
              1. 它会给子组件传递一个名字叫 value 的数据（Props）
              2. 默认监听 input 事件，修改绑定的数据（自定义事件）
            -->
          <course-image
            v-model="course.courseListImg"
            :limit="5"
          />
        </el-form-item>
        <el-form-item label="介绍封面">
          <course-image
            :limit="5"
            v-model="course.courseImgUrl"
          />
        </el-form-item>
      </div>
      <div v-show="activeStep === 2">
        <el-form-item label="售卖价格">
          <el-input v-model.number="course.discounts" type="number">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品原价">
          <el-input v-model.number="course.price" type="number">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model.number="course.sales" type="number">
            <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item label="活动标签">
          <el-input v-model="course.discountsTag"></el-input>
        </el-form-item>
      </div>
      <div v-show="activeStep === 3">
        <el-form-item label="限时秒杀开关">
          <el-switch
            v-model="course.activityCourse"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <template v-if="course.activityCourse">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="course.activityCourseDTO.beginTime"
              type="date"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="course.activityCourseDTO.endTime"
              type="date"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="秒杀价">
            <el-input v-model.number="course.activityCourseDTO.amount" type="number">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="秒杀库存">
            <el-input v-model.number="course.activityCourseDTO.stock" type="number">
              <template slot="append">个</template>
            </el-input>
          </el-form-item>
        </template>
      </div>
      <div v-show="activeStep === 4">
        <el-form-item label="课程详情">
          <text-editor v-model="course.courseDescriptionMarkDown" />
          <!-- <el-input v-model="course.courseDescriptionMarkDown" type="textarea"></el-input> -->
        </el-form-item>
        <el-form-item label="是否发布">
          <el-switch
            v-model="course.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSave"
          >保存</el-button>
        </el-form-item>
      </div>
      <el-form-item v-if="activeStep >= 0 && activeStep < 4">
        <el-button @click="activeStep++">下一步</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  saveOrUpdateCourse,
  getCourseById
} from '@/services/course'
import CourseImage from './CourseImage.vue'
import TextEditor from '@/components/TextEditor/index.vue'
import moment from 'moment'

export default Vue.extend({
  name: 'CreateOrUpdateCourse',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [String, Number]
    }
  },
  components: {
    CourseImage,
    TextEditor
  },
  data () {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-edit' },
        { title: '销售信息', icon: 'el-icon-edit' },
        { title: '秒杀活动', icon: 'el-icon-edit' },
        { title: '课程详情', icon: 'el-icon-edit' }
      ],
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0, // 0：未发布，1：已发布
        sales: 0,
        activityCourse: false, // 是否开启活动秒杀
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadCourse()
    }
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      const { activityCourseDTO } = data.data
      activityCourseDTO.beginTime = moment(activityCourseDTO.beginTime).format('YYYY-MM-DD')
      activityCourseDTO.endTime = moment(activityCourseDTO.endTime).format('YYYY-MM-DD')
      this.course = data.data
    },

    async handleSave () {
      const { data } = await saveOrUpdateCourse(this.course)
      if (data.code === '000000') {
        this.$message.success('保存成功')
        this.$router.push('/course')
      } else {
        this.$message.error('保存失败')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>

```
上传组件封装
views/course/components/CourseImage.vue
这里修改element组件css样式，用到了深度作用选择器
```vue
<template>
  <div class="course-image">
    <el-progress
      v-if="isUploading"
      type="circle"
      :percentage="percentage"
      :width="178"
      :status="percentage === 100 ? 'success' : undefined"
    />
    <el-upload
      v-else
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
  name: 'CourseImage',
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      isUploading: false,
      percentage: 0
    }
  },
  methods: {
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
      }
      return isJPG && isLt2M
    },

    async handleUpload (options: any) {
      try {
        this.isUploading = true
        const fd = new FormData()
        fd.append('file', options.file)
        const { data } = await uploadCourseImage(fd, e => {
          this.percentage = Math.floor(e.loaded / e.total * 100)
        })
        if (data.code === '000000') {
          this.isUploading = false
          this.percentage = 0
          this.$emit('input', data.data.name)
        } else {
          this.$message.error('上传失败')
        }
      } catch (err) {
        console.log(err)
      }
      this.isUploading = false
      this.percentage = 0
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
```
课程详情的富文本编辑器组件
推荐使用库：
- ckeditor5
- quill
- medium-editor 很少维护
- wangEditor
- ueditor 不维护了
- tinymce

components/TextEditor/index.vue
```vue
<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  // 组件已经渲染好，可以初始化操作 DOM 了
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      // 注意：事件监听必须在 create 之前
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.create()

      // 注意：设置初始化必须在 create 之后
      editor.txt.html(this.value)
    }
  }
})
</script>

<style lang="scss" scoped></style>

```

路由 router/index.ts
```ts
{
  path: '/course/create',
  name: 'course-create',
  component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue')
},
{
  path: '/course/:courseId/edit',
  name: 'course-edit',
  component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
  props: true
},
```

# 内容管理
显示课程阶段
添加课程阶段
编辑课程阶段

课程阶段：
编辑阶段
添加课时
调整状态

课时是二级菜单
课时：
编辑
上传视频
状态

各级菜单都可以拖动组合

## 课程内容相关接口
services/course-section.ts
```ts
/**
 * 课程章节相关请求模块
 */

import request from '@/utils/request'

export const getSectionAndLesson = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}

export const saveOrUpdateSection = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}

export const getSectionById = (sectionId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getBySectionId',
    params: {
      sectionId
    }
  })
}

```

services/course-lesson.ts
```ts
/**
 * 课程课时相关请求模块
 */

import request from '@/utils/request'

export const saveOrUpdateLesson = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}

```

## 内容管理组件
路由
```ts
{
  path: '/course/:courseId/section',
  name: 'course-section',
  component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
  props: true
}
```

views/course/section.vue
```vue
<template>
  <div class="course-section">
    <!-- 阶段列表 -->
    <el-card>
      <div class="card-header" slot="header">
        {{ course.courseName }}
        <el-button
          type="primary"
          @click="handleShowAddSection"
        >添加阶段</el-button>
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
        :allow-drop="handleAllowDrop"
        v-loading="isLoading"
        @node-drop="handleSort"
      >
        <div class="inner" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <!-- section -->
          <span v-if="data.sectionName" class="actions">
            <el-button @click.stop="handleEditSectionShow(data)">编辑</el-button>
            <el-button
              type="primary"
              @click.stop="handleShowAddLesson(data)"
            >添加课时</el-button>
            <el-select
              class="select-status"
              v-model="data.status"
              placeholder="请选择"
              @change="handleSectionStatusChange(data)"
            >
              <el-option label="已隐藏" :value="0" />
              <el-option label="待更新" :value="1" />
              <el-option label="已更新" :value="2" />
            </el-select>
          </span>
          <!-- lession -->
          <span v-else class="actions">
            <el-button @click="handleShowEditLesson(data, node.parent.data)">编辑</el-button>
            <el-button
              type="success"
              @click="$router.push({
                name: 'course-video',
                params: {
                  courseId
                },
                query: {
                  sectionId: node.parent.id,
                  lessonId: data.id,
                }
              })"
            >上传视频</el-button>
            <el-select
              class="select-status"
              v-model="data.status"
              placeholder="请选择"
              @change="handleLessonStatusChange(data)"
            >
              <el-option label="已隐藏" :value="0" />
              <el-option label="待更新" :value="1" />
              <el-option label="已更新" :value="2" />
            </el-select>
          </span>
        </div>
      </el-tree>
    </el-card>
    <!-- /阶段列表 -->

    <!-- 添加阶段 -->
    <el-dialog
      title="添加课程阶段"
      :visible.sync="isAddSectionShow"
    >
      <el-form ref="section-form" :model="section" label-width="70px">
        <el-form-item label="课程名称">
          <el-input
            :value="course.courseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input v-model="section.sectionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节描述" prop="description">
          <el-input v-model="section.description" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" prop="orderNum">
          <el-input-number v-model="section.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddSectionShow = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSection">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加阶段 -->

    <!-- 添加课时 -->
    <el-dialog
      title="添加课时"
      :visible.sync="isAddLessonShow"
    >
      <el-form ref="lesson-form" :model="lesson" label-width="100px">
        <el-form-item label="课程名称">
          <el-input
            :value="course.courseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input :value="lesson.sectionName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课时名称" prop="sectionName">
          <el-input v-model="lesson.theme" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="description">
          <el-input v-model.number="lesson.duration" type="number" autocomplete="off">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否开放试听" prop="description">
          <el-switch v-model="lesson.isFree"></el-switch>
        </el-form-item>
        <el-form-item label="课时排序" prop="description">
          <el-input-number v-model="lesson.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddLessonShow = false">取 消</el-button>
        <el-button type="primary" @click="handleAddLesson">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加课时 -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getSectionAndLesson,
  saveOrUpdateSection,
  getSectionById
} from '@/services/course-section'
import { getCourseById } from '@/services/course'
import { Form } from 'element-ui'
import { saveOrUpdateLesson } from '@/services/course-lesson'

export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    const defaultProps = {
      children: 'lessonDTOS',
      label (data: any) {
        return data.sectionName || data.theme
      }
    }

    const section = {
      courseId: this.courseId,
      sectionName: '',
      description: '',
      orderNum: 0,
      status: 0
    }

    const lesson = {
      courseId: this.courseId,
      sectionId: undefined,
      sectionName: '',
      theme: '',
      duration: 0,
      isFree: false,
      orderNum: 0,
      status: 0
    }

    return {
      course: {},
      sections: [],
      defaultProps,
      isAddSectionShow: false,
      section,
      isAddLessonShow: false,
      lesson,
      isLoading: false
    }
  },

  created () {
    this.loadSections()
    this.loadCourse()
  },

  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
    },

    async loadSections () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    },

    handleShowAddSection () {
      this.section = { // 防止数据还是编辑时获取的数据
        courseId: this.courseId,
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0
      }
      this.isAddSectionShow = true
    },

    async handleAddSection () {
      await saveOrUpdateSection(this.section)
      this.loadSections()
      this.isAddSectionShow = false
      ;(this.$refs['section-form'] as Form).resetFields()
      this.$message.success('操作成功')
    },

    async handleEditSectionShow (section: any) {
      const { data } = await getSectionById(section.id)
      this.section = data.data
      this.isAddSectionShow = true
    },

    async handleSectionStatusChange (section: any) {
      await saveOrUpdateSection(section)
      this.$message.success('操作成功')
    },

    async handleLessonStatusChange (lesson: any) {
      await saveOrUpdateLesson(lesson)
      this.$message.success('操作成功')
    },

    handleShowAddLesson (data: any) {
      console.log(data)
      this.lesson = {
        sectionName: data.sectionName,
        sectionId: data.id,
        courseId: this.courseId,
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0
      }
      this.isAddLessonShow = true
    },

    async handleAddLesson () {
      await saveOrUpdateLesson(this.lesson)
      this.$message.success('操作成功')
      this.loadSections()
      this.isAddLessonShow = false
    },

    handleShowEditLesson (lesson: any, section: any) {
      this.lesson = lesson
      this.lesson.sectionName = section.sectionName
      this.isAddLessonShow = true
    },

    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      // draggingNode 拖动的节点
      // dropNode 放置的目标节点
      // type：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },

    async handleSort (dragNode: any, dropNode: any) {
      this.isLoading = true
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (dragNode.data.lessonDTOS) {
            // 阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            // 课时
            return saveOrUpdateLesson({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('排序成功')
      } catch (err) {
        console.log(err)
        this.$message.error('排序失败')
      }
      this.isLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inner {
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}

::v-deep .el-tree-node__content {
  height: auto;
}

.select-status {
  max-width: 100px;
  margin-left: 8px;
}
</style>

```

# 上传视频

阿里云上传接口
services/aliyun-oss.ts
```ts
/**
 * 阿里云上传
 */

import request from '@/utils/request'

export const aliyunImagUploadAddressAdnAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

export const aliyunVideoUploadAddressAdnAuth = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}

export const transCodeVideo = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

export const getAliyunTransCodePercent = (lessonId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}
```

路由地址
```ts
{
  path: '/course/:courseId/video',
  name: 'course-video',
  component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
  props: true
}
```

views/course/video.vue
```vue
<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <div>课程：</div>
        <div>阶段：</div>
        <div>课时：</div>
      </div>
      <el-form label-width="40px">
        <el-form-item label="视频">
          <input
            ref="video-file"
            type="file"
          >
        </el-form-item>
        <el-form-item label="封面">
          <input
            ref="image-file"
            type="file"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="authUpload"
          >开始上传</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import {
  aliyunImagUploadAddressAdnAuth,
  aliyunVideoUploadAddressAdnAuth,
  transCodeVideo,
  getAliyunTransCodePercent
} from '@/services/aliyun-oss'

export default {
  data () {
    return {
      uploader: null,
      videoId: null,
      imageUrl: '',
      fileName: ''
    }
  },
  created () {
    this.initUploader()
  },
  methods: {
    authUpload () {
      const videoFile = this.$refs['video-file'].files[0]
      this.uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')
      this.uploader.addFile(this.$refs['image-file'].files[0], null, null, null, '{"Vod":{}}')
      this.fileName = videoFile.name
      this.uploader.startUpload()
    },
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
        userId: 1618139964448548,
        // 上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
        region: 'cn-shanghai',
        // 分片大小默认1M，不能小于100K
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async uploadInfo => {
          console.log('onUploadstarted', uploadInfo)
          let uploadAuthInfo = null
          if (uploadInfo.isImage) {
            const { data } = await aliyunImagUploadAddressAdnAuth()
            this.imageUrl = data.data.imageURL
            uploadAuthInfo = data.data
          } else {
            const { data } = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name
            })
            this.videoId = data.data.videoId
            uploadAuthInfo = data.data
          }
          
          // console.log('uploadAuthInfo', uploadAuthInfo)

          this.uploader.setUploadAuthAndAddress(
            uploadInfo,
            uploadAuthInfo.uploadAuth,
            uploadAuthInfo.uploadAddress,
            uploadAuthInfo.videoId || uploadAuthInfo.imageId
          )
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          console.log('onUploadFailed')
        },
        // 文件上传进度，单位：字节
        onUploadProgress: function (uploadInfo, totalSize, loadedPercent) {
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo) {
          console.log('onUploadTokenExpired')
        },
        // 全部文件上传结束
        onUploadEnd: async uploadInfo => {
          console.log(uploadInfo)
          console.log({
            lessonId: this.$route.query.lessonId,
            fileId: this.videoId,
            coverImageUrl: this.imageUrl,
            fileName: this.fileName
          })
          const { data } = await transCodeVideo({
            lessonId: this.$route.query.lessonId,
            fileId: this.videoId,
            coverImageUrl: this.imageUrl,
            fileName: this.fileName
          })
          console.log(data)

          setInterval(async () => {
             const { data } = await getAliyunTransCodePercent(this.$route.query.lessonId)
             console.log('转码进度', data)
          }, 3000)
        }
      })
    }
  }
}
</script>
```

## 当前文件禁用eslint校验
script 标签下面
/* eslint-disable */

# 发布部署
npm run build 打包

## 本地预览
本地预览需要一个本地服务
test-serve/app.js

需要安装几个库
```json
"express": "^4.17.1",
"http-proxy-middleware": "^1.0.6",
```

webpack的proxy只能针对开发模式下的跨域
对于正式版测试的跨域，需要本地起一个web服务，并做个代理
```js
const express = require('express')
const app = express()
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

// 托管了 dist 目录，当访问 / 的时候，默认会返回托管目录中的 index.html 文件
app.use(express.static(path.join(__dirname, '../dist')))

app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}))

app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}))

app.listen(3000, () => {
  console.log('running...')
})

```

配置预览命令
```json
"preview": "node test-serve/app.js"
```

# 注意事项
注意路由模式的 history，需要服务器做配置，参考官网
https 协议必须一致

### vue官网-部署-平台指南-可以试试cloudbase

