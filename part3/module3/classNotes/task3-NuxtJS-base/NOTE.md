# Nuxt.js 是什么？

- 一个基于 Vue.js 生态的第三方开源服务端渲染框架
- 它可以帮我们轻松的使用 Vue.js 技术栈构建同构应用
- 官网 https://zh.nuxtjs.org/
- github 仓库 https://github.com/nuxt/nuxt.js


# Nuxt.js 的使用方式
- 初始项目
- 已有的 Nodejs 服务端项目
  - 直接把 Nuxt 当作一个中间件集成到 Node Web Server
- 现有的 Vuejs 项目
  - 非常熟悉 Nuxtjs
  - 至少百分之 10 的代码改动


## 初始化 Nuxt 应用的方式
方式一 使用 create-nuxt-app
方式二  手动创建



# 案例代码分支讲解
git branch
1. git init --> Initializd empty Git repository
2. create file '.gitignore' 不让 node_modules 和 .nuxt (nuxt 自动生成目录) 目录文件被上传
3. git status --> display untracked files present
4. git add . 将当前所有目录添加到暂停区
5. git commit -m "initialized nuxtjs-demo project"  提交到 master 分支
6. git branch 02-router 创建 02-router 分支
7. git branch  查看分支
8. git checkout 02-router 跳转到 02-router 分支


# 基本路由
.nuxt 目录是 nuxt 编译的时候自动生成的，router.js 中会显示出配置的路由信息


# 路由导航
- a 标签会刷新整个页面，不要使用
- nuxt-link 组件
- 编程式导航

git checkout master 回到 master
git checkout -b 03-router-guidance


# 动态路由
和 vue router 动态路由一样
用下划线创建区分
比如：
user 目录下创建 _id.vue 文件，实际上的地址是 user/:id 显示的就是 _id.vue


# 嵌套路由
目录 user 和 父路由 user.vue, 父路由中添加 <nuxt-child />, 这里一定要同名
目录 user 下的 vue 文件都是子路由


# 自定义路由
create config file --- nuxt.config.js
add some code :
```
module.exports = {
  router: {
    // base 就是将基本地址增加一段 http://localhost:3000/abc/
    base: '/abc',
    // 自定义路由函数 extendRoutes 
    // routes 数组
    // resolve 拼接绝对路径
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/hello',
        name: 'hello',
        component: resolve(__dirname, 'pages/about.vue')
      })
    }
  }
}
```


# 视图-模板
The Views section describes all you need to configure data and views for a specific route in your Nuxt.js Application 

You can customize the HTML app template used by Nuxt.js to includes scripts or conditional calsses

To change the template, create an app.html file, in the src folder of your project (which is the project's root directory by default)

在本地根目录中创建 app.html 文件，这个是 nuxt 默认的模板，可以修改
修改完，重新运行 yarn dev


# 视图 - 布局

nuxt 有默认的布局组件，可以修改
本地创建 layouts/default.vue
 <nuxt /> 为 nuxt 渲染的组件内容
相当于将 nuxt 组件放到我们想要放的置

也可以指定一个自定义的组件
在 pages/index.vue 中配置
export default {
  name: "HomePage",
  layout: 'foo' // 指定一个自定义默认组件
}


# asyncData 异步数据
在服务端渲染动态页面
- 基本用法
  - 它会将 asyncData 返回的数据融合组件 data 方法返回数据一并给组件
  - 调用时机：服务端渲染期间和客户端路由更新之前
- 注意事项
  - 只能在页面组件中渲染 pages/index.vue 主要是 pages 里
  - 没有 this，因为它是在组件初始化之前被调用


# 异步数据 - 上下文对象

因为 asyncData 中不能使用 this，所以这个方法自己带个参数 context ，这个参数中有很多内容，比如可以获取 params







