**============================================2020/09/20===========================================**

# Vue 响应式原理

## 准备工作：

- 数据驱动
- 响应式核心原理
- 发布订阅模式和观察者模式

### 数据驱动：

- 数据响应式，双向绑定，数据驱动
- 数据响应式：
  - 数据模型仅仅是普通的 js 对象，而当我们修改数据时，视图会进行更新，避免繁琐的 dom 操作，提高开发效率
- 双向绑定
  - 数据改变，视图改变；视图改变，数据也随之改变
  - 我们可以使用 v-model 在表单元素上创建双向数据绑定
- 数据驱动是vue最独特的特性之一
  - 开发过程种仅需要关注数据本身，不需要关心数据是如何渲染到视图


# 数据响应式的核心原理

## Vue 2.x 

- Object.defineProperty
- 浏览器兼容 IE8 以上（不兼容 IE8）

## Vue 3.0

- Proxy
- ES6 新增， IE 不支持，性能由浏览器优化


# 发布订阅模式和观察者模式

## 发布订阅模式

- 发布订阅模式
  
  - 订阅者
  - 发布者
  - 信号中心

我们假定，存在一个信号中心，某个任务执行完成，向信号中心发布（publish）一个信号，其他任务可以向信号中心订阅（subscribe）这个信号，从而知道什么时候自己可以开始执行。这叫做发布订阅模式（publish-subscribe pattern）

模拟 Vue 自定义事件的实现

- 首先回顾 Vue 自定义事件的用法：

1. 创建一个 vue 对象
let vm = new Vue()

2. 通过 $on 注册自定义事件
vm.$on('cusEvent', ()=>{
  console.log('cusEvent')
})

3. 通过 $emit 触发事件
vm.$emit('cusEvent')

订阅者是注册事件的人 $on

发布者是触发事件的人 $emit

#### 实现一个事件中心类

1. 核心属性 subs 是一个对象，
key 是事件类型，
value 是 key 类型事件处理函数的集合，数组

2. 注册事件方法 $on

第一个参数是事件类型，第二个参数是事件的处理函数

3. 触发事件方法

参数：事件类型

遍历 subs ，调用符合参数的事件处理函数

    // 事件触发器
    class EventEmitter {
      constructor () {
        // { 'click': [fn1, fn2], 'change': [fn] }
        this.subs = Object.create(null)
      }

      // 注册事件
      $on (eventType, handler) {
        this.subs[eventType] = this.subs[eventType] || []
        this.subs[eventType].push(handler)
      }

      // 触发事件
      $emit (eventType) {
        if (this.subs[eventType]) {
          this.subs[eventType].forEach(handler => {
            handler()
          })
        }
      }
    }


## 观察者模式

- 观察者（订阅者） Watcher
  - update(): 当事件发生时，具体要做的事情

- 目标（发布者） Dep
  - subs 数组：存储所有的观察者
  - addSub()：添加观察者
  - notify(): 当事件发生，调用所有观察者的 update 方法

- 没有事件中心

    // 发布者-目标
    class Dep {
      constructor () {
        // 记录所有的订阅者
        this.subs = []
      }
      // 添加订阅者
      addSub (sub) {
        if (sub && sub.update) {
          this.subs.push(sub)
        }
      }
      // 发布通知
      notify () {
        this.subs.forEach(sub => {
          sub.update()
        })
      }
    }
    // 订阅者-观察者
    class Watcher {
      update () {
        console.log('update')
      }
    }

### 总结

- 观察者模式是由具体的目标调度，比如当事件触发，Dep 就回去调用观察者的方法，所以观察者模式的订阅者和发布者之间存在依赖关系
- 发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在


**============================================2020/09/22===========================================**

# Vue 的基本结构

打印 Vue 实例观察

Vue -----------> Observer -----------> | 
 |                                     |
 |                                     | Dep
 |                                     |
Compiler ------> Watcher <------------ | 


- Vue
  把 data 中的成员注入到 vue 实例，并且把 data 中的成员转化成 getter/setter

- Observer 
  能够对数据对象的所有属性进行监听，若有变动可以拿到最新的值通知 Dep 更新

- Compiler
  解析每个元素中的指令/插值表达式，并替换成相应数据

- Dep
  添加观察者 Watcher，当数据变化通知所有 Watcher

- Watcher
  数据变化更新视图


  
# Vue

功能：
- 负责接收初始化的参数（选项）
- 负责把data中的属性注入到 Vue 实例，转换程 getter/setter
- 负责调用 observer 监听 data 中所有属性的变化
- 负责调用 compiler 解析指令/差值表达式

结构：

类图：
- 类名
  Vue

- 成员
  + $options
  + $el
  + $data

- 私有成员
  - _proxyData()

代码：


# Observer

负责数据劫持

功能：
- 负责把data选项中的属性转换的响应式数据
- data 中某个属性也是对象，把这个对象里的属性也转换程响应式
- 数据变化通知

类图
名称 Observer

walk(data) 方法 遍历 data
defineReactive（data, key, value）定义响应式，第三个参数比较特殊

原因：

**测试：在 html 中 console.log(vm.msg) ，访问实例的 msg ，触发 getter 方法， return data[key], 触发 data 中的 getter 方法，return val**

  defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // return obj[key] // 报错 栈溢出
        return val // **这里会形成闭包 Closure 说明外部有调用 get**
      },
      set(newValue) {
       //
      }
    })
  }

**代码中 get 方法 return 不能是 obj[key] ，因为 return obj[key] 本身会调用 get 方法，所以会形成死递归，导致栈溢出**

还有两个问题要解决：
1. data 中的多级对象的属性还没有设置成响应式
2. data 中某个属性被 set 一个新对象，那这个新对象的属性没有设置成响应式

解决方法：
  defineReactive(obj, key, val) {
    const that = this
    // **1.若 val 是一个对象，则遍历它的属性添加响应式**
    that.walk(val) 
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        return val
      },
      set(newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        // **2.若赋值过来的 val 是一个对象，则遍历它的属性添加响应式**
        that.walk(val) 
      }
    })
  }

这样可以使所有的对象，包括多级对象，新set的对象的属性都是响应式的


# Compiler

功能：
- 负责编译模板，解析指令/差值表达式
- 负责页面首次渲染
- 当数据变化后重新渲染视图

结构：
- 类名 Compiler
- 属性
el 需要编译解析的模板
vm vue实例
- 方法

compile(el)
遍历模板dom中的所有结点 ，结点分成元素结点（指令）和文本结点（差值表达式），分别处理

compileElement(node)
编译解析元素结点

compileText(node)
编译解析文本结点

isDirective(attrName)
判断是不是 v- 指令开头

isTextNode(node)
判断是不是文本结点

isElementNode(node)
判断是不是元素结点

代码：

class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模板，处理元素结点和文本结点
  compile(el) {
    Array.from(el.childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      // **判断 node 结点是否有子节点，如果有子节点，需要递归**
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素结点，处理指令
  compileElement(node) {
    // console.log(node.attributes);
    // 编译所有属性结点
    // 判断属性是否是指令
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是 v- 指令
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }

  // **这个设计模式方便处理其他指令，不需要 if 语句**
  update(node, key, attrName) {
    // 获取函数变量
    let updateFn = this[attrName + 'Updater']
    // 判断函数存在以后，再执行
    updateFn && updateFn(node, this.vm[key])
  }

  // 处理 v-text
  textUpdater(node, value) {
    node.textContent = value
  }

  // 处理 v-model
  modelUpdater(node, value) {
    node.value = value
  }

  // 编译文本结点，处理差值表达式
  compileText(node) {
    // console.log(node);
    // console.dir(node);
    // {{ msg }}
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      // node.textContent = this.vm[key]  // **这个是不对的应该部分替换**
      node.textContent = value.replace(reg, this.vm[key])
    }
  }

  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 判断结点是否是元素结点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 判断节点是否是文本结点
  isTextNode(node) {
    return node.nodeType === 3
  }
}


# Dep (Dependency)

功能：
收集依赖，添加观察者
通知所有的观察者

结构：
- 类名： Dep
- 属性：
subs 数组，存储所有的观察者
- 方法：
addSub(sub) 添加观察者
notify() 通知观察者更新

代码：
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

使用：
  defineReactive(obj, key, val) {
    const that = this
    **// 负责收集依赖并发送通知**
    **let dep = new Dep()**
    that.walk(val) // val 是对象
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        **// 收集依赖**
        **Dep.target && dep.addSub(Dep.target)**
        return val
      },
      set(newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        that.walk(val) // 赋值一个新对象
        **// 发送通知**
        **dep.notify()**
      }
    })
  }

在给data 属性定义响应式的方法中，创建 dep 实例，get 方法收集依赖， set 方法通知更新


# Watcher

功能：
- 数据变化触发依赖，dep 通知 watcher 更新视图
- 自身实例化的时候，往 dep 对象中添加自己

结构：
- 类名：Watcher
- 属性：
vm vue 实例
key data 中的属性名称
cb 回调函数
oldValue 数据变化之前的值
- 方法：
update() 比较新旧值，调用 cb 更新视图

代码：
class Watcher {
  constructor(vm,key,cb){
    this.vm = vm
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb
    // 把 watcher 对象记录到 Dep 静态属性
    Dep.target = this
    // 触发 get 方法在 get 方法中调用 addSub 添加观察者，并记录当前值
    **this.oldValue = vm[key]**
    // 设置空，防止重复
    Dep.target = null
  }
  update(){
    let newValue = this.vm[this.key]
    if(this.oldValue === newValue) {
      return 
    }
    this.cb(newValue)
  }
}

使用：
这里的回调函数 cb 更新视图的操作就是操作dom，所以应该在 compiler 中创建 watcher 对象
要在处理差值表达式和处理指令的方法中创建 watcher 

  // 编译文本结点，处理差值表达式
  compileText(node) {
    // console.log(node);
    // console.dir(node);
    // {{ msg }}
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      // node.textContent = this.vm[key]  // 这个是不对的应该部分替换
      node.textContent = value.replace(reg, this.vm[key])
      **// 创建 watcher** 
      new Watcher(this.vm, key, newValue => {
        node.textContent = value.replace(reg, newValue)
      })
    }
  }

html 中引入资源顺序
  <script src="./js//Dep.js"></script>
  <script src="./js//Watcher.js"></script>
  <script src="./js/Compiler.js"></script>
  <script src="./js/Observer.js"></script>
  <script src="./js/vue.js"></script>


 // 这个设计模式方便处理其他指令，不需要 if 语句
  update(node, key, attrName) {
    // 获取函数
    let updateFn = this[attrName + 'Updater']
    // 判断函数存在以后，再执行
    **updateFn && updateFn.call(this, node, this.vm[key], key)**
    // 这里的 call 是强制传 this 进去，因为上面调用的时候没有指定 this
  }

  // 处理 v-text
  textUpdater(node, value, key) {
    node.textContent = value
    **// 创建watcher**
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue
    })
  }

  // 处理 v-model
  modelUpdater(node, value, key) {
    node.value = value
    **// 创建watcher**
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
  }


# 双向绑定

  // 处理 v-model
  modelUpdater(node, value, key) {
    node.value = value
    // 创建watcher
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
    **// 双向绑定**
    node.addEventListener('input', ()=>{
      this.vm[key] = node.value
    })
  }


# 总结

问题：
1. 给属性重新赋值对象，是否是响应式的？ 
是的
2. 给 vue 实例新增一个成员，是否是响应式的？ 
不是，因为设置响应式是在 new Vue 的时候；
对于已经创建的 vue 实例，vue 不允许添加根级别的响应属性；
官方文档 Vue.set（）可以给嵌套对象添加响应式属性

# 流程 
看看 ppt 吧








