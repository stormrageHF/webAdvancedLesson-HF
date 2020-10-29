# 状态管理
- state：驱动应用的数据源
- view：以声明方式将state映射到视图
- actions：响应在view上的用户输入导致的状态变化

# 组件间的通信方式

- 父组件给子组件传值
  - 子组件通过 props 接收数据
  - 父组件中给子组件通过相应属性传值

- 子组件给父组件传值（自定义事件）
  - 子组件触发事件 $emit(eventName,value)
  - 父组件定义一个函数对象，传给子组件 eventName

- 不想干组件之间传值
  - 也可以用自定义事件，eventBus 事件中心来触发
  - eventbus.js 导出 new Vue()，外部需要使用 $emit 和 $on 来完成自定义事件
  - 两个组件引入 eventbus.js 为 bus
  - 一个组件触发事件并传值 bus.$emit('eventName', value)
  - 一个组件添加监听 bus.$on('eventName',function(){})


# 其他常见的方式（一般不建议使用）

- $root
- $parent
- $children
- $refs

## ref 两个作用
- 在普通 html 标签上使用 ref，获取 dom 对象
- 在组件标签上使用 ref，获取到的是组件实例

工程 04-ref


# 简易状态管理方案

### 问题：
- 多个视图依赖同一状态
- 来自不同视图的行为需要变更同一个状态

工程 05-easystate


# vuex 概念回顾
## 什么是 Vuex ？ 
- Vuex 是专门为 Vue.js 设计的状态管理库
- Vuex 采用集中式的方式存储需要共享的状态
- Vuex 的作用是进行状态管理，解决复杂组件通信，数据共享
- Vuex 集成到了 devtools 中，提供了 time-travel 时光旅行历史回滚功能

## Vuex 什么情况下使用
- 非必要情况不使用
- 大型的单页面应用程序
  - 多个视图依赖于同一状态
  - 来自不同视图的行为需要变更同一个状态


# Vuex 的核心概念

- Store
- State
- Getter
- Mutation
- Action
- Module


# Vuex 基本代码结构
store.js
导入 Vue 和 Vuex
Vue.use(Vuex)
声明 new Vuex.Store({
  state:{},
  mutations:{},
  actions:{},
  modules:{}
})

main.js 中
导入 store
new Vue({
  ...
  store
  ...
})


# 工程 02-vuex-demo 
demo 中有基本用法


# Vuex 严格模式
new Vuex.Store({
  strict: true,
  ...
})

开启严格模式后
直接访问或修改 state 会报错
$store.state

### 生产环境不要开启严格模式
生产环境会严格检查状态树，检查不合规的改变，会影响性能
strict: process.env.NODE_ENV !== 'production'


# 购物车案例
工程 03-vuex-cart-demo
启动服务器 node server
启动前端项目 npm run server


# 商品列表
1. 两个组件 cart 和 products，分别定义module，store/modules/cart.js 和 store/modules/products.js
初始化代码：
```
const state = {}
const getters = {}
const mutations = {}
const actions = {}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

```
2. 定义商品列表相关接口和数据
代码：
```
// 导入 axios
import axios from 'axios'

const state = {
  // 商品列表数据源
  products: []
}
const getters = {}
const mutations = {
  // 修改数据源方法
  setProducts (state, payload) {
    state.products = payload
  }
}
const actions = {
  // 网络请求获取列表数据源
  async getProducts ({ commit }) {
    const { data } = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/products'
    })
    // commit 触发 mutations 修改 products
    commit('setProducts', data)
  }
}
```
3. products.vue 组件中引入数据和方法
```
// 导入需要的 map
import { mapState, mapActions } from 'vuex'
export default = {
  ...
  computed: {
    // 导入数据 命名空间 数据
    ...mapState('products', ['products'])
  },
  methods: {
    // 导入方法 命名空间 网络请求数据方法
    ...mapActions('products', ['getProducts']),
  },
  created () {
    // 调用请求数据方法
    this.getProducts()
  }
}

```

# 添加购物车
1. 首先需要购物车数据：cartProducts
   点击购物车将数据添加到 cartProducts
   在 cart.js 中添加
```
const state = {
  cartProducts: []
}
const mutations = {
  addToCart (state, product) {
    // 1. cartProducts 中没有该商品，把该商品添加到数组，并增加 count，isChecked，totalPrice
    // 2. cartProducts 有该商品，让商品的数量加1，选中，计算小计
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      prod.count++
      prod.isChecked = true
      prod.totalPrice = prod.count * prod.price
    } else {
      state.cartProducts.push({
        ...product,
        count: 1,
        isChecked: true,
        totalPrice: product.price
      })
    }
  },
}
```
2. products.vue 组件中添加方法
```
<template v-slot="scope">
  <el-button @click="addToCart(scope.row)">加入购物车</el-button>
</template>

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ProductList',
  methods: {
    ...mapMutations('cart', ['addToCart'])
  },
}
```


# 我的购物车-列表
组件是 pop-cart.vue
显示 cartProducts 的数据

import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PopCart',
  computed: {
    ...mapState('cart', ['cartProducts']),
  }
}

# 我的购物车-统计
就是获取 cartProducts 中的商品总个数和总价
用 getter 方法，类似于计算属性
cart.js 
```
const getters = {
  totalCount (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.count, 0)
  },
  totalPrice (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.totalPrice, 0)
  }
}
```
pop-cart.vue
```
  computed: {
    ...mapGetters('cart', ['totalCount', 'totalPrice'])
  },
```


# 我的购物车-删除
定义删除方法并添加到组件
cart.js 
```
const mutations = {
  deleteFromCart (state, prodId) {
    const index = state.cartProducts.findIndex(item => item.id === prodId)
    index !== -1 && state.cartProducts.splice(index, 1)
  },
}
```
pop-cart.vue
```
<el-table-column label="操作">
  <template v-slot="scope">
    <el-button @click="deleteFromCart(scope.row.id)" size="mini">删除</el-button>
  </template>
</el-table-column>

  methods: {
    ...mapMutations('cart', ['deleteFromCart'])
  }
```
 

# 购物车组件-列表
cart.vue
```
export default {
  name: 'Cart',
  computed: {
    ...mapState('cart', ['cartProducts']),
  },
}
```

# 购物车组件-全选
cart.js 中定义全选状态更新方法，单选状态更新方法
```
const mutations = {
  updateAllProductChecked (state, checked) {
    state.cartProducts.forEach(prod => {
      prod.isChecked = checked
    })
  },
  updateProductChecked (state, {
    checked,
    prodId
  }) {
    const prod = state.cartProducts.find(prod => prod.id === prodId)
    prod && (prod.isChecked = checked)
  }
}
```
在 cart.vue 中添加两个方法
```
      <el-table-column
        width="55">
        <template v-slot:header>
          <el-checkbox v-model="checkedAll" size="mini">
          </el-checkbox>
        </template>
       
        <template v-slot="scope">
          <el-checkbox
            size="mini"
            :value="scope.row.isChecked"
            @change="updateProductChecked({
              prodId: scope.row.id,
              checked: $event
            })"
          >
          </el-checkbox>
        </template>
      </el-table-column>

export default {
  name: 'Cart',
  computed: {
    checkedAll: {
      get () {
        return this.cartProducts.every(prod => prod.isChecked)
      },
      set (value) {
        this.updateAllProductChecked(value)
      }
    }
  },
  methods: {
    ...mapMutations('cart', [
      'updateAllProductChecked',
      'updateProductChecked',
    ])
  }
}
```

# 购物车组件-数字文本框
修改数量，小计也变动
cart.js 中添加方法
```
const mutations = {
  updateProduct (state, {
    prodId,
    count
  }) {
    const prod = state.cartProducts.find(prod => prod.id === prodId)
    if (prod) {
      prod.count = count
      prod.totalPrice = count * prod.price
    }
  }
}
```

cart.vue中添加方法
```
      <el-table-column
        prop="count"
        label="数量">
        <template v-slot="scope">
          <el-input-number :value="scope.row.count" @change="updateProduct({
            prodId: scope.row.id,
            count: $event
          })" size="mini"></el-input-number>
        </template>
      </el-table-column>

  methods: {
    ...mapMutations('cart', [
      'updateProduct'
    ])
  }
```

# 购物车组件-统计
cart.js 添加选中的数量，选中的价格
```
const getters = {
  checkedCount (state) {
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += prod.count
      }
      return sum
    }, 0)
  },
  checkedPrice (state) {
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += prod.totalPrice
      }
      return sum
    }, 0)
  }
}
```
cart.vue
```
    <div>
      <p>已选 <span>{{ checkedCount }}</span> 件商品，总价：<span>{{ checkedPrice }}</span></p>
      <el-button type="danger">结算</el-button>
    </div>

    ...mapGetters('cart', ['checkedCount', 'checkedPrice']),

```
# 本地存储
刷新数据消失，所以要把数据存储到本地
1. 获取本地数据
cart.js
```
const state = {
  cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || []
}
```

2. 存储本地数据
要在 mutations 中每次修改数据后存储本地，但是没有必要每调用一次都存一次，所以需要在一个节点来调用，比如 mutations 结束的时候，这时候需要用到插件
store/index.js
```
const myPlugin = store => {
  // 每次 mutation 一个方法调用结束后触发
  store.subscribe((mutation, state) => {
    // 根据 type 找到 cart 对应的地方做处理，其他并不存储
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}

export default new Vuex.Store({
  ...
  plugins: [myPlugin]
})
```



# 模拟 vuex - 基本结构
工程 04-my-vuex
自己实现一个简单的 vuex
myvuex/index.js 初始化简单结构
```
let _Vue = null
// 类
class Store {

}
// install 方法
function install (Vue){
  _Vue = Vue
}

// 声明对象
export default {
  Store,
  install
}
```
# 模拟 vuex - install
```
function install (Vue){
  _Vue = Vue
  _Vue.mixin({
    beforeCreate(){
      if(this.$options.store){
        _Vue.prototype.$store = this.$options.store
      }
    }
  })
}
```
# 模拟 vuex - Store类

```
class Store {
  constructor(options){
    // 解构赋值
    const {
      state = {},
      getters = {},
      mutations = {},
      actions = {}
    } = options
    
    // 响应式
    this.state = _Vue.observable(state)

    // getters 中每个方法被调用时触发 get
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    // 直接赋值
    this._mutations = mutations
    this._actions = actions
  }

  // mutations commit 时获取方法，并调用
  commit(type, payload) {
    this._mutations[type](this.state, payload)
  }

  // dispatch 时获取方法并调用
  dispatch(type, payload) {
    this._actions[type](this, payload)
  }
}
```
























