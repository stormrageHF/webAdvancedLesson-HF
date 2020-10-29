# 案例介绍
realworld
一个开源学习项目，目的是帮助开发者快速学习技术

GitHub https://github.com/gothinkster/realworld
在线示例  http://demo.realworld.io/#/

## 案例资源
- 页面模板 https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md

- 接口文档 https://github.com/gothinkster/realworld/tree/master/api

## 学习收获
- 掌握使用 Nuxtjs 开发同构渲染应用
- 增强 Vuejs 实践能力
- 掌握同构渲染应用中常见的功能处理
  - 用户状态管理
  - 页面访问权限处理
  - seo 优化
- 掌握同构渲染应用的发布与部署


# 创建项目
- mkdir realworld-nuxtjs
- npm init -y
- npm i nuxt
- 配置启动脚本
- 创建 pages 目录，配置初始页面



# 初始化项目
## 导入样式资源
本地创建 app.html 文件
将页面模板中的 css 文件导入 header 部分
```
<!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="//demo.productionready.io/main.css">
```
有些是国外的连接，访问速度太慢，可以在本地化
在 https://www.jsdelivr.com/ 上可以搜索到相关的资源，比如找到第一个资源 iconicons.min.css 2.0.1
第二个不用处理, 国内支持
第三个资源可以将内容拷贝到本地一个自定义的 css 中 static/main.css
最后处理的结果:
```
    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link href="https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="main.css">
```

## 布局组件
1. 首先处理一个页面公共部分
pages/layout/index.vue 将模板的导航和 footer 拷贝进文件,中间部分 nuxt-child 显示我们的内容
```
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <a class="nav-link active" href="">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-compose"></i>&nbsp;New Post
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>

    <nuxt-child />
    
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
```
2. nuxt 默认的首页是 pages/index.vue 文件，我们可以不按照 nuxt 的官方做法，可以自己重新指向我们自己的首页比如 pages/layout/index.vue，这需要重写路由表，用方法 extendRoutes 重写，需要配置文件 nuxt.config.js
```
module.exports = {
  router: {
    extendRoutes(routes, resolve){
      // 清空原路由表
      routes.splice(0)
      // 自己指定路由
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/')
        }
      ])
    }
  }
}
```
3. 需要在公共页面中添加 home 首页模块，所以需要默认子路由指向 home.vue; pages/home/index.vue 将模板中 home 的代码添加进来;配置默认子路由
```
{
  path: '/',
  component: resolve(__dirname, 'pages/layout/'),
  children: [
    // 默认子路由
    {
      path: '',
      name: "home",
      component: resolve(__dirname, 'pages/home/')
    }
 ]
}
```


## 导入登录注册页面
将 realworld 中的 登录注册模板添加到项目中，并添加相应的路由配置，而且需要 isLogin 来区分显示登录和注册

## 导入剩余页面
按照模板添加 profile，settings，editor，article 以及配置对应的路由

## 处理顶部导航连接
将导航中的 a 的内容替换为 nuxt-link 和对应的内容

## 处理导航连接高亮
```
export default {
  router: {
    linkActiveClass: 'active' // 配置成自己用的 classname
  }
}
```
可以用 exact 精确匹配, 解决 home 总是高亮的现象

## 封装请求模块

1. 安装 axios
2. utils/request.js
3. 创建实例，设置 baseurl
```
import axios from 'axios'

const request = axios.create({
  baseURL: "https://conduit.productionready.io"
})

// 请求拦截器

// 相应拦截器

export default request 
```


# 登录注册
## 基本登录功能
```
<form @submit.prevent="onSubmit">
...
v-model="user.email"
...
v-model="user.password"
...
 data (){
    return {
      user: {
        email: '',
        password: ""
      }
    }
  },
 methods: {
    // 登录请求
    async onSubmit(){
      const { data } = await request({
        method: 'POST',
        url: "/api/users/login",
        data: {
          user:this.user
        }
      })
      // 
      console.log(data);
    }
  }

```
## 封装请求方法
创建 api/index.js
```
import { request } from '@/plugins/request'

// 登录
const login = data => {
  return request({
    method: 'POST',
    url: "/api/users/login",
    data
  })
}
// 注册
const register = data => {
  return request({
    method: 'POST',
    url: "/api/users",
    data
  })
}

export {
  login,
  register
}
...
import { login } from '@/api/index'
...
    async onSubmit(){
      const { data } = await login({
        user: this.user
      })
      // 保存登录状态
      console.log(data);
      // push 到首页
      this.$router.push('/')
    }
```
## 表单验证
必填项，邮箱验证等等


## 错误处理

捕获错误信息，存到 errors 对象，ui绑定 errors 内容
```
async onSubmit() {
      try {
        const { data } = await login({
          user: this.user,
        });
        // 保存登录状态
        console.log(data);
        // push 到首页
        this.$router.push("/");
      } catch (error) {
        // console.dir(error)
        this.errors = error.response.data.errors
      }
    },
...
          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="(message,index) in messages" :key="index">
                {{field}} {{message}}
              </li>
            </template>
          </ul>
```


## 用户注册
添加 register 接口，与 login 处理类似
ui上需要绑定 username，同时限制 password 最小长度
```
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
...
    // 登录请求
    async onSubmit() {
      try {
        const { data } = this.isLogin 
        ? await login({
          user: this.user,
        })
        : await register({
          user: this.user
        })
        // 保存登录状态
        console.log(data);
        // push 到首页
        this.$router.push("/");
      } catch (error) {
        // console.dir(error)
        this.errors = error.response.data.errors
      }
    },
```


## 解析存储登录状态实现流程
官网跨域身份验证（JWT）jsonwebtoken，解决服务器获取 token 登录状态问题
看示例


## 将登录状态存储到容器中
创建 store，存储登录接口获取到的 user 数据
创建 store/index.js
```
//在服务端渲染期间运行的都是同一个实例
// 为防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
const state = ()=>{
  return {
    // 当前用户登录状态
    user: null
  }
}

const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

const actions = {

}

export {
  state,
  mutations,
  actions
}
...
        // 保存登录状态
        // console.log(data);
        this.$store.commit('setUser', data.user)
```
刷新网页，容器数据消失，需要做一个持久化处理


## 登陆状态持久化
查看官网JWT
1. 安装 js-cookie
```
// 客户端才引入
const Cookie = process.client ? require('js-cookie') : undefined
...
        // 保存登录状态
        // console.log(data);
        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
```
可在本地浏览器查看
2. actions 中添加方法 nuxtServerInit
yarn add cookieparser
```
const cookieparser = process.server ? require('cookieparser') : undefined
 ... 
  // 服务端渲染的时候调用，获取 cookie 中的用户信息，将信息存入容器
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
```
这样登录状态久保存了，并且在首次渲染的时候，还会记录到本地容器中



## 处理导航栏连接展示状态
导入容器数据 user
导航栏根据状态显示
```
import { mapState } from 'vuex'

export default {
  name: "LayoutPage",
  computed: {
    ...mapState(['user'])
  }
};
...
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link ng-binding" to="/profile/123">
                <img
                  class="user-pic"
                  :src="user.image"
                />
                {{ user.username }}
              </nuxt-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
          </template>
```


## 处理页面访问权限
需要中间件，自定义一个函数在一个页面或一组页面渲染之前调用
middleware 目录下，这里可以做拦截的处理代码
比如：
登陆后才可以访问编辑，设置等页面；
登录后不可以访问登录页面；

### 在路由渲染之前会执行中间件处理
```
// middleware/authenticated.js
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.user) {
    return redirect('/login')
  }
}
```
将 authenticated 添加到需要判断的页面，编辑，设置等
```
  middleware: 'authenticated',
```
#### 重启服务 yarn dev 

接下来处理登录后，不能访问登录页
```
// middleware/notAuthenticated.js
export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (store.state.user) {
    return redirect('/')
  }
}
...
// 添加 notAuthenticated 到组件
middleware: 'notAuthenticated',
```


# 首页
## 业务介绍
## 展示公共文章列表
```
// api/article.js

import { request } from '@/plugins/request'

// 获取文章列表
const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export {
  getArticles
}
...
// home/index.vue

import { getArticles } from '@/api/article'

export default {
  name: "HomePage",
  async asyncData (){
    const { data } = await getArticles()
    console.log(data);
    return {
      articles: data.articles,
      articlesCount: data.articlesCount
    }
  }
}
...
// ui绑定数据
        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{ 
              name: 'profile',
              params: {
                username: article.author.username
              }
             }">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }  
              }" class="author">
                {{ article.author.username }}
              </nuxt-link>
              <span class="date">{{ article.createdAt }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{
              active: article.favorited  
            }">
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link :to="{
            name: 'article',
            params: {
              slug: article.slug
            }
          }" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
```

## 列表分页-分页参数使用
设置好 page 和 limit
```
    const page = 1
    const limit = 3
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit
    })
```


## 列表分页-页码处理
计算属性中获取页总数
http://localhost:3000/?page=50
query 获取 page
```
  async asyncData ({ query }){
    const page = query.page
    const limit = 10
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit
    })
    // console.log(data);
    return {
      articles: data.articles,
      articlesCount: data.articlesCount,
      limit,
      page
    }
  },
  computed:{
    totalPage (){
      // 向上取整
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
...
// 添加分页ui
        <nav>
          <ul class="pagination">
            <li class="page-item" v-for="item in totalPage" :key="item" :class="{ 
              active: item === page
            }">
            <nuxt-link class="page-link" :to="{
              name: 'home',
              query: {
                page: item
              }
            }">
              {{ item }}
            </nuxt-link>
            </li>
          </ul>
        </nav>
...
// 监听query 中的 page 参数, 否则点击分页组件不刷新
watchQuery: ['page']

```

## 展示文章标签列表
封装接口，获取数据，修改ui
```
// api.tag.js
import { request } from '@/plugins/request'

// 获取标签列表
const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}

export {
  getTags
}

...
// home/index.vue
  async asyncData ({ query }){
    const page = query.page
    const limit = 10
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit
    })
    // 获取标签
    const { data: tagData } = await getTags()
    return {
      articles: data.articles,
      articlesCount: data.articlesCount,
      limit,
      page,
      tags: tagData.tags
    }
  },
...
     <!-- 标签 -->
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <a href="" class="tag-pill tag-default" v-for="item in tags" :key="item">
              {{ item }}
            </a>
          </div>
        </div>
      </div>
```

## 优化并异步任务
获取列表的接口并行执行
```
  async asyncData({ query }) {
    const page = query.page;
    const limit = 15;
    // promise all 并行处理两个接口
    const [articlesRes, tagsRes] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articlesRes.data;
    const { tags } = tagsRes.data
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
    };
  },
```

## 处理标签链表连接和数据
修改点击标签跳转连接
```
           <div class="tag-list">
              <nuxt-link
                :to="{
                  name:'home',
                  query: {
                    tag: item
                  }
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >
                {{ item }}
              </nuxt-link>
```
获取列表接口添加 tag参数
```
      getArticles({
        limit,
        offset: (page - 1) * limit,
        tag: query.tag
      }),
```
监听 query 变化，刷新组件
```
  watchQuery: ["page","tag"],

```
分页点击跳转连接要增加 tag 参数
```
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag
                    },
                  }"
                >
                  {{ item }}
                </nuxt-link>
```
## 处理导航栏-业务介绍
## 处理导航栏-展示状态处理
your Feed 登录才显示
```
// 引入 tag, 添加到全局
const tag = query.tag;

// 引入 usr 判断是否登录
    ...mapState(['user']),
...
             <li class="nav-item" v-if="user">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
              <li class="nav-item" v-if="tag">
                <a class="nav-link active" href="">#{{ tag }}</a>
              </li>
```

## 处理导航栏-标签高亮和连接
```
// 加 tab 到 query
              <li class="nav-item" v-if="user">
                <nuxt-link class="nav-link" 
                :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }" 
                exact
                :class="{
                  active: tab === 'your_feed'
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" 
                :to="{
                  name: 'home',
                  query: {
                    tab: 'global_feed'
                  }
                }" 
                exact
                :class="{
                  active: tab === 'global_feed'
                }">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link" 
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag_feed'
                  }
                }" 
                :class="{
                  active: tab === 'tag_feed'
                }">#{{ tag }}</nuxt-link>
              </li>
...
// 分页也要加 tab
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: tag,
                      tab: tab,
                    },
                  }"
                >
                  {{ item }}
                </nuxt-link>
// 标签也要加 tab
             <nuxt-link
                :to="{
                  name:'home',
                  query: {
                    tag: item,
                    tab: item + '_feed'
                  }
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >
                {{ item }}
              </nuxt-link>
...
// asyncData 中也要加
return {
        tab: query.tab || 'global_feed',

}
// 监听也要加
  watchQuery: ["page","tag","tab"],
```
## 展示用户关注的文章列表
```
// 添加新 api
// 获取关注的文章列表
const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}
export {
  getArticles,
  getFeedArticles
}
...
// index.vue 中接口变化
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page) || 1;
    const limit = 15;
    const tag = query.tag;
    const tab = query.tab || 'global_feed';
    const loadArticles = store.state.user && tab === 'your_feed' ? 
    getFeedArticles : getArticles
    // promise all 并行处理两个接口
    const [articlesRes, tagsRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: tag
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articlesRes.data;
    const { tags } = tagsRes.data
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab,
    };
  },
```

## 统一设置用户 token
1. 在axios interceptor中定义 header 的 auth
2. auth 需要 store 中的 user，nuxt 中需要使用 plugins的方式获取 context 来获取 user
```
// plugins/request.js 定义插件
import axios from 'axios'

export const request = axios.create({
  baseURL: "https://conduit.productionready.io"
})

export default ({ store })=>{
  // 请求拦截器
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if(user && user.token){
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error){
    return Promise.reject(error)
  })
  // 响应拦截器
}
...
// nuxt.config.js 注册插件
  plugins: [
    '~/plugins/request.js'
  ]
...
// 整个项目将引入 request 的地方替换为
import { request } from '@/plugins/request'

```

## 文章发布时间格式化处理
还是用插件的形式定义成全局的过滤方法
使用第三方库 dayjs
```
// plugins/dayjs.js 
import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss')=>{
  return dayjs(value).format(format)
})
...
// 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
...
// ui 里面调用
<span class="date">{{ article.createdAt | date('MMMM DD, YYYY') }}</span>
```

## 文章点赞
1. 封装点赞和取消点赞接口
```
// 点赞
const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}
// 取消赞
const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}
```
2. ui 上添加点击事件，根据参数中的状态来处理
3. 发送请求期间，需要禁止按钮响应事件
```
// 添加事件和禁用状态
   @click="onFavorite(article)"
   :disabled="article.favoriteDisabled"
// 数据新增禁用属性
  articles.forEach(article => article.favoriteDisabled = false)
// 点赞方法
  methods: {
    onFavorite (article){
      // 禁用按钮点击
      article.favoriteDisabled = true
      if(article.favorited){
        // 取消点赞
        deleteFavorite(article.slug)
        article.favorited = false
        --article.favoritesCount
      }else{
        // 点赞
        addFavorite(article.slug)
        article.favorited = true
        ++article.favoritesCount
      }
      article.favoriteDisabled = false
    }
  }
```

# 文章详情
## 展示基本信息
封装获取文章详情的接口
```
// 获取文章详情
const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}
...
// article/index.vue
import { getArticle } from '@/api/article'

export default {
  name: "ArticlePage",
  async asyncData ({ params }){
    const { data } = await getArticle(params.slug)
    return {
      article: data.article
    }
  }
};
// ui
        <h1>{{ article.title }}</h1>
...
        <div class="col-md-12">
          {{ article.body }}
        </div>
```

## 把 markdown 转为 html
使用第三方库 markdown-it 处理
安装 markdown-it
```
import markdownIt from 'markdown-it'
...
  async asyncData ({ params }){
    console.log(params);
    const { data } = await getArticle(params.slug)
    const md = new markdownIt()
    const { article } = data
    article.body = md.render(article.body)
    return {
      article
    }
  }
...
  <div class="col-md-12" v-html="article.body"></div>
```
## 展示文章作者相关信息
封装组件 article-meta
```
<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        class="author"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date("MMMM DD, YYYY") }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :class="{
      active: article.author.following
    }">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ article.author.username }} <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{
      active: article.favorited
    }">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>
```
导入组件，并传值进去
```
import ArticleMeta from './components/ArticleMeta'
...
  components:{
    ArticleMeta
  }
...
 <ArticleMeta :article="article"></ArticleMeta>
```

## 设置页面 meta 优化 seo
article/index.vue 中添加 head 接口
```
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
```
## 通过客户端渲染展示评论列表
1. 创建一个评论组件,引入
```
import ArticleComments from "./components/ArticleComments"
...
 <ArticleComments :article="article" />
...
  components: {
    ArticleComments
  },
...
```
2. 封装获取评论列表接口
```
// 获取文章评论
const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
```
3. 在组件中调用接口获取数据并修改ui
```
<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params:{
            username: comment.author.username
          }
        }">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from "@/api/article"

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      comments: []
    }
  },
  async mounted(){
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  }
};
</script>

<style>
</style>
```

# 发布部署
## 打包
```
packagejson

  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  },
```
yarn build 打包命令 .nuxt 目录下都是打包内容 尤其是dist 目录
yarn start 运行打包后的项目


## 最简单的部署方式
- 配置 host + post
- 压缩发布包
- 把发布包传到服务器
- 解压 
- 安装依赖
- 启动服务

配置文件 host 和 port 
  server:{
    host: '0.0.0.0',
    port: 3000
  }

拷贝 .nuxt, static, nuxt.config.js, package.json, packeage-lock.json 到服务器（可压缩）
连接服务器,命令行 ssh administrator@ip ,输入密码连接,连接成功
创建目录 mkdir realworld-nuxtjs, 创建成功进入目录 cd realworld-nuxtjs
打印路径 pwd/chdir, 复制路径，退出 exit，回到本机
命令 scp .\realworld-nuxtjs.rar administrator@101.200.177.46:D:\ViewerPublish\realworld-nuxtjs 把压缩文件上传到目录(有的需要输入密码)
重新连接服务器，进入目录解压缩文件 ,ls -a 查看隐藏目录
安装依赖 npm i
运行 npm run start 启动服务，用 公网 ip+port 访问

## 使用 PM2 启动 Node 服务
为了不要一直占用命令行，从后台启动这个服务；
npm install --global pm2
pm2 start npm -- run start
关闭服务 pm2 stop id/name

pm2 list 查看服务列表
pm2 start
pm2 stop
pm2 reload 重载
pm2 restart 重启
pm2 delete

## 自动化部署介绍
传统部署
本地构建 ---- 发布

现代化部署（CI/CD）

源代码 -- git push --> git仓库 -- git clone --> CI/CD ----> 发布 web 服务器
                             <-- 发布release --        

## 准备自动部署内容
使用 git hub actions 实现自动部署
环境准备 
- linux 服务器
- 代码提交到 github 远程仓库



## 自动部署完成

git add.
git commit -m "log"
git tag v0.1.0  // 主要是这个创建新版本
git tag 
git push origin v0.1.0 // push 新版本的时候起作用

在github 看 actions，查看publish and deploy
最后访问 web 测试


