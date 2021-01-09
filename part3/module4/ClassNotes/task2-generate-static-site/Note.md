# Gridsome基础-介绍
Gridsome 一个免费，开源，基于vue.js技术栈的静态网站生成器

什么是静态网站生成器？
- 是使用一系列配置，模板以及数据，生成静态html文件及相关资源的工具
- 这个功能也叫预渲染
- 生成的网站不需要类似的php这样的服务器
- 只需要放在支持静态资源的webserver或者cdn上即可运行

静态网站的好处？
- 省钱
  - 不需要专业的服务器，只需要托管静态文件的空间即可
- 快速
  - 不经过后端服务器处理，只需要传输内容
- 安全
  - 没有后端程序执行，自然更加安全

常见的静态网站生成器：
- Jekyll（Ruby）
- Hexo（Node）
- Hugo（Golang）
- Gatsby（Node/React）
- Gridsome（Node/Vue）
- 另外，Next.js Nuxt.js 也能生成静态网站，但是它们更过被认为是SSR框架

JAMStack
- 这类静态网站生成器还有个漂亮的名字叫JAMStack
- JAMStack 的 JAM 是 JavaScript，API和Markup的首字母组合
- 本质上是一种胖前端，通过调用各种API来实现更多的功能
- 其实也是一种前后端的模式，只不过离得比较开，甚至前后端来自多个不同的厂商

使用场景：
- 不适合有大量路由页面的应用
 - 如果您的站点有成百上千条路由页面，则预渲染将会非常的缓慢
 当然，您每次更新只需要做一次，但是可能要花一些时间。大多数人不会最终获得数千条静态路由页面，而只是以防万一
- 不适合有大量动态内容的应用
 - 如果渲染路线中包含特定于用户查看其内容或其他动态源的内容，则应确保您具有可以显示的占位符组件，直到动态内容加载到客户端为止。否则可能会有点怪异

 常用于企业渲染页，文档，博客

 # Gridsome基础-创建Gridsome项目
 - 官网  https://gridsome.org/docs/#how-to-install 
   - yarn global add @gridsome/cli
 - https://github.com/lovell/sharp 需要先安装 sharp ，官网地址找到中国镜像 https://sharp.pixelplumbing.com/install#chinese-mirror
```
npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
npm install sharp 这个不执行，等gridsome安装的时候自动安装了，上面两条配置可以执行
```
 - 安装 node-gyp 解决c++编译环境问题 https://github.com/nodejs/node-gyp/
   - npm install -g node-gyp
   - 安装 python
   - windows 安装工具 npm install --global windows-build-tools
 - 创建： gridsome create my-gridsome-site

## 注意: 可能会遇到 raw.githubusercontent.com 地址访问不到的错误,解决方案:
- 网站查询域名对应的ip地址 https://site.ip138.com/raw.githubusercontent.com/
- 打开文件 C:\Windows\System32\drivers\etc\hosts ,添加 151.101.196.133   raw.githubusercontent.com 配置
- 重新安装即可 npm i

# Gridsome基础-预渲染
npm run build 生成dist 目录中的静态网站
本地测试，可以安装serve npm i -g serve，安装后，启动 serve dist

# Gridsome基础-目录结构

# Gridsome基础-项目配置
gridsome.config.js 中修改配置
siteName 网站名称
文档地址 https://gridsome.org/docs/config/

# Gridsome基础-Pages

文档地址 https://gridsome.org/docs/pages/

# Gridsome基础-添加集合
文档地址 https://gridsome.org/docs/collections/

模拟数据接口数据 https://jsonplaceholder.typicode.com/posts

正常是由客户端调接口获取数据，比如posts1；现在想在服务端获取接口加载数据，绘制页面，将带数据的页面发送到客户端，这里我们需要用到集合
1. 可以在 gridsome.server.js 文件中配置获取接口数据的代码
gridsome.server.js
```
    const collection = addCollection('Post')

    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')

    for (const item of data) {
      collection.addNode({
        id: item.id,
        title: item.title,
        content: item.body
      })
    }
  })
```

# Gridsome基础-在GraphQL中查询数据

http://localhost:8080/___explore
中可以查询数据
```
# Write your query or mutation here
# query {
#   post (id: 2) {
#     id
#     title
#     content
#   }
# }

query {
  allPost {
    edges {
      node {
        id
        title
      }
    }
  }
}
```

# Gridsome基础-在页面中查询GraphQL
上一课已经直到可以在GraphQL中查询数据，那如何在代码中查询呢？文档地址 https://gridsome.org/docs/querying-data/
上上一课配置好了获取接口数据的代码，接下来该查询数据了
2. 创建 Posts2.vue 文件，添加query 查询代码
```
<template>
  <Layout>
    <div>
      <h1>Posts2</h1>
      <ul>
        <li v-for="edge in $page.posts.edges" :key="edge.node.id">
          <g-link to="/">{{ edge.node.title }}</g-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<page-query>
query {
  posts: allPost {
    edges {
      node {
        id
        title
      }
    }
  }
}
</page-query>

<script>
export default {};
</script>

<style>
</style>
```
想要在调试工具里，查看是否是静态页面（由服务端渲染），应该打包以后（build）才可以查看
yarn build
serve dist
可以在network 里查看 posts2 是不是静态的

# Gridsome基础-使用模板渲染节点页面
已经获取到节点列表页了，那点击节点应该进入节点详情页，这里也有模板可以做，文档地址 https://gridsome.org/docs/templates/
1. 在templates下创建模板文件 Post.vue
```
<template>
  <div>
    <h1>post page</h1>
  </div>
</template>

<script>
export default {
  name: 'PostPage'
}
</script>

<style>

</style>
```
2. gridsome.config.js 文件中配置模板路径和组件,重启
```
  templates: {
    Post: [
      {
        path: '/posts/:id',
        component: './src/templates/Post.vue'
      }
    ]
  }
```
3. 在模板文件中写查询语句，获取数据
```
<template>
  <Layout>
    <div>
      <h1>{{ $page.post.title }}</h1>
      <div>
        {{ $page.post.content }}
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  post (id: $id) {
    id
    title
    content
  }
}
</page-query>

<script>
export default {
  name: "PostPage",
};
</script>

<style>
</style>
```
4. 修改 Posts2.vue 中的 path，动态指定跳转路径
```
<template>
  <Layout>
    <div>
      <h1>Posts2</h1>
      <ul>
        <li v-for="edge in $page.posts.edges" :key="edge.node.id">
          <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<page-query>
query {
  posts: allPost {
    edges {
      node {
        id
        title
        path
      }
    }
  }
}
</page-query>

<script>
export default {};
</script>

<style>
</style>
```
5. 动态修改详情页的title,修改模板文件（Post.vue）
```
export default {
  name: "PostPage",
  metaInfo(){
    return {
      title: this.$page.post.title
    }
  }
};
```
6. 构建打包 build 后，dist/posts 目录下生成对应的详情静态页

# Gridsome案例-创建项目
使用 gridsome 制作一个个人博客页面
gridsome create blog-with-gridsome
安装依赖
启动项目

# Gridsome案例-处理首页模板

在课程目录中  git clone git@github.com:stormrageHF/startbootstrap-clean-blog.git --depth=1
下载最新版
cd startbootstrap-clean-blog
code -a . 

进入项目 blog-with-gridsome 安装 bootstrap 
main.js 中加载两个css库
```
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
```
加载字体 创建 src/assets/css/index.css
```
@import url("https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800");
```
在 main.js 中导入
```
import './assets/css/index.css'
```
将未压缩的css内容拷贝到index.css中

把 navigation header content footer 拷贝到 index.vue 中

img 目录拷贝到 static 下

# Gridsome案例-处理其它页面模板
1. 大家都有统一的navigation 和 footer 所以在default.vue 中统一定义
参考 layouts/Default.vue
2. Post.vue About.vue Contact.vue index.vue 只需要保留header 和content就够了

# Gridsome案例-使用本地md文件管理文章内容
- 安装插件 npm install @gridsome/source-filesystem
文档地址 https://gridsome.org/plugins/@gridsome/source-filesystem
通过这个插件将本地的数据源读取
在gridsome.config.js 中配置插件
```
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'BlogPost',
        path: './content/blog/**/*.md',
      }
    }
```
在根目录创建content/blog/***.md  这就是数据源

- 还需要一个转化插件 @gridsome/transformer-remark 安装这个插件
Markdown transformer for Gridsome with Remark.

- 启动项目 npm run develop 
http://localhost:8080/___explore 中查询数据源信息
```
query {
  allBlogPost {
    edges {
      node {
        id
        title  
        path
        content
        
      }
    }
  }
}
```

# Gridsome案例-Strapi介绍
除了通过md管理文章内容以外,还可以使用 strapi 管理
通过 Strapi 写文章,发布保存,管理文章
由 gridsome 静态网站浏览保存的文章
官网地址 https://strapi.io/
教程地址 https://strapi.io/documentation/v3.x/getting-started/quick-start.html#_1-install-strapi-and-create-a-new-project

# Gridsome案例-Strapi基本使用
1. Install Strapi and Create a new project
```
yarn create strapi-app my-project --quickstart
```
## 注意：如果安装sqlite3 没反应的话，试试这个命令 npm install sqlite3 --node_sqlite3_binary_host_mirror=http://npm.taobao.org/mirrors，镜像源要用淘宝的
2. Create an Administrator user

# Gridsome案例-使用Strapi接口数据
内容生成器创建接口 posts，并且添加数据内容，包括 title 和 content；
接口权限的修改在设置，角色和权限中，public 接口权限最好还是不要分配修改；
测试接口 localhost:1337/posts ,可以使用 postman；
api 的调用方法在官网 https://strapi.io/documentation/developer-docs/latest/content-api/api-endpoints.html#endpoints

# Gridsome案例-访问受保护的API
就是实现一个必须认证后才能使用所有权限接口的账号
1. 设置 - 角色和权限 - Authenticated 分配所有权限
2. 用户新增user 例如 lpz lpz@163.com 123456
3. postman 用上面的账号登录接口 http://localhost:1337/auth/local 获取 token
4. header 配置token ，可以参考文档 https://strapi.io/documentation/developer-docs/latest/plugins/users-permissions.html#token-usage
5. 有token以后，就可以修改/创建/删除文章了 localhost:1337/posts 

# Gridsome案例-通过GraphQL访问Strapi
这部分了解
以上内容默认都是用rest 方式访问 api，这里也可以用 GraphQL 的方式访问，参考文档 https://strapi.io/documentation/developer-docs/latest/plugins/graphql.html
1. 安装 npm run strapi install graphql
2. 启动 npm run develop
3. 浏览器打开 http://localhost:1337/graphql
4. 参考文档

#  Gridsome案例-将Strapi数据预取到Gridsome应用中
现在已经有 strapi 准备好的数据，接下来要如何把这个数据集成到gridsome项目中，如果在项目中通过调接口获取，那就不是服务端预渲染了；所以要想使用服务端预渲染，需要一个插件@gridsome/source-strapi 官网地址 https://gridsome.org/plugins/@gridsome/source-strapi
1. 安装 npm install @gridsome/source-strapi
2. gridsome.config.js 修改配置文件
```
 {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://localhost:1337',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['posts'],
        // singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
```
3. 重新启动项目
4. 打开 http://localhost:8080/___explore 查看strapi 数据，例如
```
query {
  allStrapiPosts {
    edges {
      node {
        id
        title
        content
      }
    }
  }
}
```
5. 注意：如果strapi 数据变化了，gridsome是预渲染的，必须提前获取数据，所以必须重启项目才能拉取到最新数据

# Gridsome案例-设计文章和标签数据模型
1. 内容生成器创建 Post tag 并做好关联
2. collection types 配置两者关联
3. http://localhost:1337/graphql 查询验证
具体操作参考视频

#  Gridsome案例-展示文章列表
1. http://localhost:8080/___explore 验证查询文章列表接口
2. 在 index.vue 中添加查询接口，通过 page-query 标签
3. 在浏览器调试工具Vue中查看数据是否获取成功
4. 将成功获取的数据绑定到界面
示例代码
```
<div class="post-preview" v-for="edge in $page.posts.edges" :key="edge.node.id">
  <a href="post.html">
    <h2 class="post-title">
      {{ edge.node.title }}
    </h2>       
  </a>
  <p class="post-meta">
    Posted by
    <a href="#">Start Bootstrap</a>
      {{ edge.node.created_at }}
  </p>
  <p>
    <span v-for="tag in edge.node.tags" :key="tag.id" style="padding-right: 10px;">
      <a href="">{{ tag.title }}</a>
    </span>
  </p>
  <hr />
</div>
...
<page-query>
query {
 posts: allStrapiPosts {
  edges {
    node {
      id
      title
      created_at
      tags {
        id
        title
      }
      
    }
  }
}
}
</page-query>
```

# Gridsome案例-文章列表分页
参考官网 https://gridsome.org/docs/pagination/
分页组件 https://gridsome.org/docs/pagination/#pager-component
主要是获取 pageInfo 的数据，再通过组件展示数据，配置格式按照文档做

# Gridsome案例-展示文章详情
1. config 文件中配置 templates
```
 templates: {
    StrapiPosts: [
      {
        path: '/post/:id',
        component: './src/templates/Post.vue'
      }
    ]
  }
```
2. 文章列表页，文章标题配置路径, 点击标题直接跳转
```
<g-link :to="'/post/' + edge.node.id">
  <h2 class="post-title">
    {{ edge.node.title }}
  </h2>
</g-link>
```
3. 详情页数据获取,浏览器调试工具验证数据是否获取到
```
<page-query>
query ($id: ID){
 strapiPosts(id: $id) {
  id
  title
  content
  cover {
    url
  }
  tags {
    id
    title
  }
 }
}
</page-query>
```
4. 将数据绑定到界面,包括标题，图片，内容
参考视频或者 post.vue 内容

# Gridsome案例-处理Markdown格式的文章内容
了解
文本内容是markdonw 格式的，但是显示的时候，并不会解析这种格式；所以需要个三方库来完成这个功能，比如markdown-it
用这个库可以把markdown格式文本转成html标签, [文档](http://markdown-it.docschina.org/)
参考 post.vue

#  Gridsome案例-文章标签
做法和上面类似
1. 先配置config，contentTypes 增加 tag，tamplates 增加 tag 路径和组件
2. 测试数据接口，query 查询
3. tag 页面获取数据并绑定

# Gridsome案例-基本设置
1. strapi 创建 singletypes，general 主标题，副标题，媒体图片；配置权限；
2. config 配置 singleTypes, general
3. query 测试接口数据获取
4. 首页文件index.vue中获取数据，绑定界面
参考 index.vue

# Gridsome案例-联系我
这里就是提交表单
1. strapi 内容生成器，创建contenttype接口 contact，有name，email，phone，message
2. postman 测试接口 localhost:1337/contacts
3. 安装 axios
4. 联系我页面添加接口绑定表单

# Gridsome案例-部署Strapi
1. 准备一台nodejs环境的云服务器
2. config下 database.js 文件配置更换为 mysql 的配置信息，账号密码都配置好
3. 代码上传到gitee
4. 远程服务器下载代码到本地，启动项目安装依赖


