## 说说 application/json 和 application/x-www-form-urlencoded 二者之间的区别。

前者以 json 格式来提交数据
后者以表单格式提交数据，数据序列化


## 说一说在前端这块，角色管理你是如何设计的。

1. 角色列表展示以及搜索
2. 角色添加/修改/删除
3. 给角色分配菜单访问权限/修改菜单访问权限
4. 给角色分配数据资源操作权限/修改数据资源操作权限
5. 在用户列表给用户分配角色，从而达到控制用户的操作访问权限


## @vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？

1. 抽离cli service层，使构建更新更加简单
2. 插件化，如果你要做深度的vue-cli定制化，不建议直接写在vue.config.js中，而是封装在插件中，独立的维护这个插件，然后项目再依赖这个插件。这样就可以简化升级的成本和复杂度。
3. GUI界面
4. 快速原型开发，直接将一个vue文件跑起来，快速原型开发或验证某些想法
5. 现代模式，给先进的浏览器配合先进的代码(ES6之后),同时兼容旧版本的浏览器，先进的代码不管从文件体积还是脚本解析效率都有较高的提升。



## 详细讲一讲生产环境下前端项目的自动化部署的流程。

Github Actions 自动构建前端项目并部署到服务器

1. 在你需要部署到 Github Page 的项目下，建立一个 yml 文件，放在 .github/workflow 目录下。你可以命名为 ci.yml，它类似于 Jenkins 的 Jenkinsfile 文件，里面包含的是要自动执行的脚本代码。
2. 上面有一个 ACCESS_TOKEN 变量需要自己配置。
- 打开 Github 网站，点击你右上角的头像，选择 settings
- 点击左下角的 developer settings。
- 在左侧边栏中，单击 Personal access tokens（个人访问令牌）
- 单击 Generate new token（生成新令牌）
- 输入名称并勾选 repo
- 拉到最下面，点击 Generate token，并将生成的 token 保存起来
- 打开你的 Github 项目，点击 settings
- 点击 secrets->new secret
- 创建一个密钥，名称随便填（中间用下划线隔开），内容填入刚才创建的 token

将上文代码中的 ACCESS_TOKEN: ${{ secrets.VUE_ADMIN_TEMPLATE }} 替换成刚才创建的 secret 名字，替换后代码如下 ACCESS_TOKEN: ${{ secrets.TEST_A_B }}。保存后，提交到 Github
以后你的项目只要执行 git push，Github Actions 就会自动构建项目并发布到你的 Github Page 上。

Github Actions 的执行详情点击仓库中的 Actions 选项查看


## 你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。

1. 跨域问题

webpack启动配置proxy只能解决开发模式下的跨域，对于测试正式环境还是有问题

方案1：
- 本地启动一个web服务；
- 安装middleware插件，在本地web服务中配置代理

方案2：
远程服务器修改 header 里的 Access-Control-Allow-Origin 参数来控制

2. 用 ts 开发，项目引入某静态 js 库时，比如 aliyun-oss，创建实例的时候报错不识别 window.AliyunUpload

方案：
在文件 shims-vue.d.ts 中扩展window对象
```ts
interface Window {
  AliyunUpload: any
}
```

## 针对新技术，你是如何过渡到项目中？

1. 判断新技术是否有过度的价值，比如是否能对当前项目进行优化，提高工作效率
2. 判断新技术是否已经稳定，若不稳定暂时不考虑过渡
3. 若真要决定过渡，那就需要给旧版本做个备份
