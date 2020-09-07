脚手架的本质作用

创建项目的基础结构，提供项目规范和约定
相同的组织结构
相同的开发范式
相同的模块依赖
相同的工具配置
相同的基础代码

**--------------------------------------------------------------**

Yeoman 基础使用

在全局范围安装yo
npm install yo --global 或者 yarn global add yo

查看版本（如果命令不识别需要配置环境变量，找到yarn的.bin目录和npm目录，主要找到各种cmd执行文件的地址）
yo --version

全局安装对应的generator
npm install generator-node --global 或者 yarn global add generator-node

通过yo运行generator
cd 项目dir
mkdir 项目名字
yo node

拓展：
查看yarn全局目录命令
yarn global dir
yanr global bin

**--------------------------------------------------------------**

sub generator
我们给一个已经存在的项目，生成某个特定的文件
我要给这个项目生成cli文件
yo node:cli 让这个项目变成要给模块

回到全局
yarn link

安装相关依赖
yarn

运行命令 my-module 是我自定义的项目
my-module --help

**--------------------------------------------------------------**
yeoman 使用步骤

1.明确你的需求
2.找到合适的Generator
3.全局范围安装找到的Generator
4.通过Yo运行对应的Generator
5.通过命令行交互填写选项
6.生成你所需要的项目结构

在官网找到要安装的 generator-xxx
回到工程目录xxx中运行全局安装命令
yarn global add generator-xxx

安装完以后，运行generator
yo xxx

完成配置，开始安装依赖
安装完成后，xxx工程就已经有对应的结构

**--------------------------------------------------------------**

自定义 generator

搭建自己的脚手架

1. 创建  Generator 模板
本质就是一个npm模板

generator 基本结构：
|- generators/ .............................. 生成器目录
|  |_ app/ .................................. 默认生成器目录
|     |_ index.js ........................... 默认生成器实现
|_ package.json ............................. 模块包配置文件


带子生成器的目录 sub generator, + 是多出来的
 |- generators/ .............................. 生成器目录
 |  |_ app/ .................................. 默认生成器目录
 |  |   |_ index.js ........................... 默认生成器实现
+|  |_ component/ ............................. 其他生成器目录
+|     |_ index.js ............................ 其他生成器实现
 |_ package.json ............................. 模块包配置文件


 名称必须是标准的 generator-<name>

示例：
1.新建一个目录叫generator-sample
2.在目录下初始化，创建 package.json
命令 yarn init
3.安装一个生成器的基类文件
命令 yarn add yeoman-generator
4.用vscode 打开这个目录
命令 code .
5.按照上面的基本结构创建对应目录
6.后续步骤查看例子即可完成一个简单的生成器
7.把这个模块连接到全局范围
命令 yarn link 
8.自定义的生成器完成了，可以做个测试
9.测试：在其他地方自定义一个项目目录，在目录下执行
命令 yo sampleb


2. 根据模板创建文件

1.在app目录下创建要给目录templates
2.进入目录创建文件 foo.txt
3.使用 EJS 模板语法
4.在index.js中填写模板导入，输出的代码
5.在 my-proj 中运行 yo sample 就可以看到模板生成

模板创建文件大大提高了效率


3. 接收用户输入数据
命令交互形式
实现prompting方法


4. 发布 Generator
在**当前项目**中命令行
echo node_modules > .gitignore

创建仓库
git init

查看仓库状态
git status

添加文件
git add .

提交
git commit -m "feat: initial commit"

将提交日志同步到远端
repository 可以叫例子 generator-hf-vue
在github 新建仓库 new respository

复制ssh
回到命令行 添加远端仓库别名
git remote add origin <ssh>

push操作
git push -u origin master

在完成github存储后，可以在本项目中发布
yarn publish
若遇到发布淘宝只读镜像可以修改为
yarn publish --regisry=https://registry.yarnpkg.com

登录npm官网仓库列表中看看是否存在
npmjs.com/package/<name>


**--------------------------------------------------------------**

Plop 一个小而美的脚手架工具

可以给项目中组件摸板定义摸板用脚手架生成模块

1. 将 plop 模块作为项目开发依赖安装
2. 在项目根目录下创建要给plopfile.js文件
3. 在plopfile.js文件中定义脚手架任务
4. 编写用于生成特定类型文件的模板
5. 通过Plop提供的CLI运行脚手架任务


**--------------------------------------------------------------**

脚手架工作原理

启动以后，命令行交互询问配置问题，比如项目名称等
回答的配置结果结合项目摸板
最后生成一个项目文件

自定义 sample scaffolding

步骤：
初始化一个项目文件sample-scaffolding
命令行 yarn init
在package.json文件中添加一个bin字段，value 是 cli.js
新建cli.js文件，这个文件必须有个特定头

#!/usr/bin/env node

Node CLI 应用入口文件必须要有这样的文件头；
如果是Linux或者macOS系统下还需要修改此文件的读写权限为755
具体就是通过 chmod 755 cli.js 实现修改

先随便编写点什么 比如 cosole.log()

命令行 yarn link 连接到全局
命令行 sample-scaffolding 查看是否执行

安装inquirer 
编写命令行询问代码

新建摸板目录 templates/index.html 摸板

inquirer.then()回调中，根据用户的回答结果生成文件

读取摸板目录templates 里的files，
通过ejs模板引擎渲染file
写入目标目录 

测试：
新建一个项目文件my-demo，命令行 sample-scaffolding


