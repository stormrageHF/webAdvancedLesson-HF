# 规范化介绍

ESLint Stylelint

# ESLint 介绍

- 最为主流的 js 工具检测 js 代码质量
- ESLint 很容易统一开发者的编码风格

# ESLint 安装

- 初始化项目
- 安装 ESLint 模块为开发依赖
- 通过 CLI 命令验证安装结果

安装以后查看版本

npx eslint --version
yarn eslint --version

# ESLint 快速上手

## 检查某js 文件语法

命令: npx eslint .\xxx.js

## 初始化 eslint 配置文件

命令： npx eslint --init

完成配置以后得到 .eslintrc.js 文件

这时候再运行检查命令  npx eslint .\xxx.js

## 修复命令：

npx eslint .\xxx.js --fix

**=======================================================================================================================**

# ESLint 配置文件解析

配置文件继承自这里
node_modules\eslint-config-standard\eslintrc.json 
所有有些信息要修改这个文件

```
module.exports = {
  env: { // 根据环境判断全局变量是否可用 
    browser: true,
    es2021: true
  },
  extends: [  // 共享配置
    'standard'
  ],
  parserOptions: {  // 控制 es 的语法版本
    ecmaVersion: 12
  },
  rules: {  // 定义规则查看官网 值： off  warn  error
    "no-alert": "warn"  // 不允许用 alert，否则报警告
  },
  globals: {  // 配置全局成员
    "jQuery": 'readonly'
  }
}
```

**=======================================================================================================================**

# ESLint 配置注释

const str = "${name} is a coder" // eslint-disable-line

有了后面这条注释，eslint 就会忽略这行代码

后面可以增加更精确的注释, 也就是规则名称

const str = "${name} is a coder" // eslint-disable-line no-template-curly-in-string

**=======================================================================================================================**

# ESLint 结合自动化工具

- 集成之后，eslint 一定会工作
- 与项目统一，管理更加方便

这个看视频吧

# ESLint 结合 webpack

- 安装对应模块
- 安装 eslint 模块
- 安装 eslint-loader 模块
- 初始化 .eslintrc.js 配置文件

webpack 配置文件

{
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'eslint-loader',
  enforce: 'pre'
}

# webpack 后序配置

.eslintrc.js

还是看视频吧

**=======================================================================================================================**

# 现代化项目集成 ESLint

vue/cli 使用即可

**=======================================================================================================================**

# 检查 typescript

npx eslint --init

 Does your project use TypeScript? yes

**=======================================================================================================================**

# stylelint 认识

- 提供默认得代码检查规则
- 提供 cli 工具，快速调用
- 通过插件支持 Sass Less PostCSS
- 支持 Gulp 或 Webpack 集成 

安装

npm install -D stylelint

配置文件 .stylelintrc.js

安装 stylelint-config-standard

module.exports = {
  extends: "stylelint-config-standard"
}

校验命令

npx stylelint index.css

校验 sass

安装 stylelint-config-sass-guidelines

module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines"
  ]
}

npx stylelint index.scss 


**=======================================================================================================================**

# prettier 得使用

用于格式化代码

安装 

npm install -D prettier

运行 

npx prettier style.css --write

--write 覆盖原文件

所有文件格式化
npx prettier . --write

**=======================================================================================================================**

# git hooks 工作机制

代码提交倒仓库之前未进行 lint 操作

githooks 

- git 钩子，每个钩子都对应一个任务，比如 commit push
- 通过 shell 脚本可以编写钩子任务触发时要具体执行得操作

commit 任务对应得脚本文件位置：

隐藏目录 .git/hooks/pre-commit.sample 

通过自定义脚本可以在 commit 以前做一些操作

# eslint 结合 git hooks

husky 可以实现 git hooks 得使用需求

上传代码以前自动进行 lint 

安装 husky

配置 package.json 

"scripts": {
  "test": "eslint index.js"
},
"husky": {
  "hooks": {
    "pre-commit": "npm run test"  // 在 commit 之前执行 run test
  }
}

## 扩展功能

lint-staged 配合 husky 实现 lint 后续任务

安装 lint-staged

配置 package.json

"scripts": {
  "test": "eslint index.js",
  "precommit": "lint-staged" // 添加 lint-staged
},
"husky": {
  "hooks": {
    "pre-commit": "npm run precommit" // commit 之前执行
  }
},
"lint-staged": {
  "*.js": [
    // 后续任务
    "eslint",
    "git add"
  ]
}

命令行输入 commit 操作，此时会先执行 eslint 任务，再执行 git add
