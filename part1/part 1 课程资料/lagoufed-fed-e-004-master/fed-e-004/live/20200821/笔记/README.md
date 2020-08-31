

慢

忘  -- 羽雀

还有一个面试题不用call或者apply实现bind

# 函数式编程

- 函数式编程是一种编程范式，和面向对象编程是并列关系（编程范式：思想 + 实现的方式）

  - 面向对象编程：对现实世界中的事物的抽象，抽象出对象以及对象和对象之间的关系
  - 函数式编程：把现实世界的事物和事物之间的**联系**抽象到程序世界（对运算过程进行抽象）

  

  重点掌握：

  - 函数式编程的核心思想

  - 纯函数

    [https://zh.wikipedia.org/wiki/%E7%BA%AF%E5%87%BD%E6%95%B0](https://zh.wikipedia.org/wiki/纯函数)

    在程序设计中，若一个函数符合以下要求，则它可能被认为是**纯函数**：

    * 此函数在相同的输入值时，需产生相同的输出。函数的输出和输入值以外的其他隐藏信息或[状态](https://zh.wikipedia.org/w/index.php?title=程式狀態&action=edit&redlink=1)无关，也和由I/O设备产生的外部输出无关。
    * 该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等。(如果参数是引用传递，对参数的更改会影响函数以外的数据，因此不是纯函数)

  - 柯里化

  - 函数组合  lodash/fp   compose(fn, n1)  ---> flowRight

  ```js
  const fp = require('lodash/fp')
  
  const add = (a, b) => {
    return a + b
  }
  
  const f = fp.compose(fp.curry(add)(5), add)
  console.log(f(1, 2))
  ```

  - 函子暂时可以作为了解  Array.of()    arr.map()

- 柯里化概念意义和用法

  - 柯里化：把多个参数的函数转换可以具有任意个参数的函数，可以给函数组合提供细粒度的函数

  - 应用：

    - Vue.js 源码中使用柯里化的位置

      - src/platform/web/patch.js

      ```js
      function createPatch (obj) {
        let ...
        return function patch (vdom1, vdom2) {
          ..
        }
      }
      
      const patch = createPatch(...)
  ```
    
  
    
- 固定不常变化的参数
    
  
    
    ```js
    // 方法1
    function isType (type) {
      return function (obj) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`
      }
    }
    
    const isObject = isType('Object')
    const isArray = isType('Array')
    
    
    // 方法2
    function isType (type, obj) {
      return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
    
    let isTypeCurried = curry(isType)
    
    const isObject = isTypeCurried('Object')
    // isObject(obj)
    
    // 柯里化通用函数
    function curry (func) {
      return function curriedFn (...args) {
        // 判断实参和形参的个数
        if (args.length < func.length) {
          // 实参个数小于形参个数，继续柯里化
          return function () {
            return curriedFn(...args.concat(Array.from(arguments)))
          }
        }
        // 形参个数等于实参个数执行 func
    		return func(...args)
      }
    }
```
    

    
- 延迟执行(模拟 bind 方法)
    
  
    
    ```js
    function fn (a, b, c) {
    }
    const f = fn.bind(context, 1, 2)
    f(3)
    
    const f = fn.bind(context, 1)
    f(2, 3)
    
    // rest 参数
    Function.prototype.mybind = function (context, ...args) {
      return (...rest) => this.call(context, ...args, ...rest)
    }
    
    function t (a, b, c) {
      return a + b + c
    }
    
    t.mybind()
    
    const sumFn = t.mybind(this, 1, 2)
    const sum = sumFn(3)
    console.log(sum)
    ```



- 函子在开发中的实际使用场景
  - 作用是控制副作用 (IO)、异常处理 (Either)、异步任务 (Task)

```js
class Functor {
  static of (value) {
    return new Functor(value)
  }
  
  constructor (value) {
    this._value = value
  }

  map (f) {
    return new Functor(f(this._value))
  }

  value (f) {
    return f(this._value)
  }
}

const toRMB = money => new Functor(money)
  .map(v => v.replace('$', ''))
  .map(parseFloat)
  .map(v => v * 7)
  .map(v => v.toFixed(2))
  .value(v => '¥' + v)

console.log(toRMB('$299.9'))
```

- folktale
  - https://folktale.origamitower.com/

```js
const MayBe = require('folktale/maybe')

const toRMB = m => MayBe.fromNullable(m)
  .map(v => v.replace('$', ''))
  .map(parseFloat)
  .map(v => v * 7)
  .map(v => v.toFixed(2))
  .map(v => '¥' + v)
	// .unsafeGet()
  .getOrElse('noting')

console.log(toRMB(null))
```



# 函数的执行上下文和闭包

## 函数的执行上下文

- 执行上下文（Execution Context）

  - 全局执行上下文
  - 函数级执行上下文
  - eval 执行上下文

- 函数执行的阶段可以分文两个：函数建立阶段、函数执行阶段

  - 函数建立阶段：当调用函数时，还没有执行函数内部的代码

    - 创建执行上下文对象

      ```js
      fn.ExecutionContext = {
        variableObject:  // 函数中的 arguments、参数、局部成员
        scopeChains:  // 当前函数所在的父级作用域中的活动对象
        this: {}			// 当前函数内部的 this 指向
      }
      ```

  - 函数执行阶段

    ```js
    // 把变量对象转换为活动对象
    fn.ExecutionContext = {
      activationObject:  // 函数中的 arguments、参数、局部成员
      scopeChains:  // 当前函数所在的父级作用域中的活动对象
      this: {}			// 当前函数内部的 this 指向
    }
    ```

- [[Scopes]] 作用域链，函数在创建时就会生成该属性，js 引擎才可以访问。这个属性中存储的是所有父级中的变量对象

```js
function fn (a, b) {
  function inner () {
    console.log(a, b)
  }
  console.dir(inner)
  // return inner
}
console.dir(fn)
const f = fn(1, 2)
```



## [闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

- 发生闭包的两个必要条件

  1. 外部对一个函数 makeFn 内部有引用
  2. 在另一个作用域能够访问到 makeFn 作用域内部的局部成员

  > 使用闭包可以突破变量作用域的限制，原来只能从一个作用域访问外部作用域的成员
  >
  > 有了闭包之后，可以在外部作用域访问一个内部作用域的成员
  >
  > 可以缓存参数
  >
  > 根据不同参数生成不同功能的函数
  >
  > 

```js
function makeFn () {
  let name = 'MDN'
  return function inner () {
    console.log(name)
  }
}

let fn = makeFn()
fn()

fn = null
```

- 缓存参数

```js
function createPatch (obj) {
  return function patch (vdom1, vdom2) {
    ..
  }
}

const patch = createPatch(...)
              
                          
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

# 反馈问题

## 其他

- 如何记住这些知识点！平时几乎不用的，看视频的时候懂，可是不用的话时间一长就忘了，用什么方法可以长久的记忆这些知识！
- 希望能结合具体开发场景进行讲解

## Lodash

- lodash很多方法，es6语法中都能找到，那还有用lodash的必要吗
  - babel 
  - https://lodash.com/
- lodash 的自定义构建
  - https://lodash.com/custom-builds

## 函数式编程

- 组合函数如何处理异步函数

  - https://folktale.origamitower.com/api/v2.3.0/en/folktale.concurrency.task.html#combining-tasks-concurrently

  - ### Sequencing tasks

- 关于函数组合，课程中的提供的模拟实现，以及一些柯里化后的函数组合，最终都是接收单参数的形式，这里有点疑惑的是，函数组合只能是单参数形式么？lodash的flow/flowRight组合后是支持多参数形式的

- 函数式编程部分的课程中，涉及了大量函子的介绍，但是在实际日常的开发中，似乎很少用到函子来实现功能，给人感觉似乎是有用的，但是又不太会去使用，是否有更多更接近实际项目开发场景的函子应用场景？

- 函数内部如果是随机生成一个数字，这种算纯函数么

## 函子

- **有个困惑，我们用声明对象的方式去做一些事情，是不是就是面向对象编程？比如函子，但是函子中又夹杂着函数组合，函数组合这个算是函数式编程范畴。感觉自己只要见到声明类的方式，就会将其定义为面向对象编程。所以想问具体应该怎么区分一种框架是用什么范式开发的呢？**
- 函子在具体开发中有什么意义，可以具体举例解释下吗
- 函子这块还是希望能说说具体的场景，方便更好理解
- 函数式编程结合实战就更好了
- 对函子不太理解，特别是IO函子等。
- 关于函子的取值方面：从课程中了解到函子中的值是不被外界直接操作的，
  	那么除了Monad函子中的join方法可以直接获取到函子内部存储的值，
    	实际编程中会遇到其他类型的函子（如Maybe,Either）需要取值的情况呢？
    	如果遇到这种情况一般是如何去取值的？
- 对task函子，io函子，monad函子理解不好
- 希望扩展函子的实际应用，或者什么样的场景该使用函子来解决
- 对于函数是编程在实际业务中是如何应用的？有具体的业务场景使用函数式编程的例子吗？

## Promise和异步

- 对手写promise等过程异步等不懂。
- Promise实现里，能否把then 方法里的settimeout替换成 queueMicrotask，毕竟后者才是调用微任务队列
- 异步编程模块，感觉promise、generator、async/await介绍的相对简单，并不是太详细，一些常规的日常使用一般都会有所了解，其实更关注一些特殊采坑的情况，比方说随堂测试部分那题then中传入非回调函数的时候，then会被忽略，promise中return不同类型时候有什么差别，await之后的表达式返回不同类型有什么差别，generator中return、yield、throw，内部抛出异常与外部调用throw一些差别之类的，希望有些细化的内容
- 手写promise还没来得及看。。。
- 希望扩展一下宏任务微任务还有跟       同步异步的关系

```
同步：同步方法必须等待调用完成后才能拿到方法的返回结果，继续执行后续代码
异步：异步方法当调用完毕后，调用者可以继续执行后续的代码，而不需要等待结果，异步的结果会在回调中处理

宏任务和微任务都是实现异步的一种方式
```

```js
// 同步
function add (a, b) {
  return a + b
}
const r = add(5, 6)
console.log(r)

// 异步 (ajax)
setTimeout(function () {
  console.log(6)
}, 0)
console.log(5)


ajax('get', url, function (res) {
  console.log(res)
})
console.log('其他操作')
```



- 微任务中嵌套微任务，那么事件循环的执行方式
- 关于事件循环，消息队列，宏任务微任务的定义还是有些含糊
- 异步编程的第9题，老师一定要讲一下啊，没理解好

```js
Promise.resolve(1)
	// .then(x => x)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

> `onFulfilled` 可选
>
> 当 Promise 变成接受状态（fulfilled）时调用的[`函数`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Function)。该函数有一个参数，即接受的最终结果（the fulfillment  value）。如果该参数不是函数，则会在内部被替换为 `(x) => x`，即原样返回 promise 最终结果的函数

