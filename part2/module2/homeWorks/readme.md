# 一、简答题

## 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

构建流程有：
1. 初始化项目，安装 webpack webpack-cli
2. 创建配置文件 webpack.config.js
3. 在配置文件中，配置入口文件，输出路径
4. 自定义工作模式 development none production
5. 针对不同类型的资源，添加对应的 loader 编译转换
6. 配置插件 plugin 增强自动化，扩展功能
7. 运行打包命令

打包过程：
1. 启动打包命令，按照 webpack.config.js 的配置信息打包
2. 从 entry 的配置中找到入口文件，再从入口文件查找相关依赖的模块资源
3. 各种模块资源文件由对应的 loader 处理，输出打包
4. plugin 在打包的过程中，在对应的阶段完成对应的插件任务，比如清除目录，拷贝静态文件，压缩输出代码



## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

loader 是模块加载器，用于将开发阶段的资源文件转成生产环境（浏览器）支持的资源文件，比如 es6+ 转成 es5，sass 转 css
plugin 是插件， 用于增强 webpack 的打包能力，尤其是自动化，提高效率，比如自动清除 dist 目录，自动拷贝静态文件，自动压缩输出代码


开发 loader
1. 自定义 loader 的 js 文件
2. 每一个loader 都要导出一个函数，module.exports 导出
3. 这个函数的参数是 source，source 就是需要被处理的资源
4. 这个函数实现的功能就是对 source 做处理
5. return 一个结果，结果必须是 js 字符串，也可以返回给下一个 loader 处理

开发 plugin
1. 通过钩子机制实现
2. 必须是一个函数或者一个包含 apply 方法的对象， apply(compiler) {}
3. compiler 就是这次构建的所有信息
4. 找到 compiler.hooks 中的某一个钩子，通过 tap 添加处理方法（回调函数）
5. 在回调函数中处理文件
6. 将处理的结果按照指定方式（source size）写回去，webpack 继续执行后续的任务



# 二、编程题

## 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

先下载任务的基础代码  百度网盘链接: https://pan.baidu.com/s/1pJl4k5KgyhD2xo8FZIms8Q 提取码: zrdd
这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
尽可能的使用上所有你了解到的功能和特性

作业要求
本次作业中的编程题要求大家完成相应代码后（二选一）
1.  简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
2.  提交一个项目说明文档，要求思路流程清晰。
最终将录制的视频或说明文档和代码统一提交至作业仓库。