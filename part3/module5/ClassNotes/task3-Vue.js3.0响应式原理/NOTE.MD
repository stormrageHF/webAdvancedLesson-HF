# 响应式系统原理-介绍

## 响应式回顾
- Proxy 对象实现属性监听
- 多层属性嵌套，在访问属性的过程中处理下一级属性
- 默认监听动态添加的属性
- 默认监听属性的删除操作
- 默认监听数组索引和length属性
- 可以作为单独的模块使用

## 核心方法
- reactive/ref/toRefs/computed
- effect
- track
- trigger

# Proxy对象的回顾

参考 01-proxy.html

- 问题1： set 和 deleteProperty 中需要返回布尔类型的值，在严格模式下，如果返回 false 的话会出现 Type Error 的异常
- 问题2：Proxy 和 Reflect 中使用的 receiver，Proxy 中 receiver：Proxy 或者继承 Proxy 的对象，Reflect 中 receiver：如果 target 对象中设置了 getter，getter 中的 this 指向 receiver

# reactive

- 接受一个参数，判断这个参数是否是对象
- 创建拦截器对象handler，设置 get/set/deleteProperty
- 返回 Proxy 对象

# 收集依赖

函数 effect，参数是一个callback，callback 中的变量也会变成响应式；
```js
    const product = reactive({
      name: 'iPhone',
      price: 5000,
      count: 3
    })
    let total = 0 
    effect(() => {
      total = product.price * product.count
    })
    console.log(total) // 15000

    product.price = 4000
    console.log(total) // 12000

    product.count = 1
    console.log(total) // 4000
```

targetMap (new WeakMap())
key 是目标对象
value 是 depsMap

depsMap (new Map())
key 是目标对象的属性名称
value 是 dep

dep (new Set())
value 是 effect 函数的 callback 参数


# 实现 effect，track

```js
let activeEffect = null
export function effect (callback) {
  activeEffect = callback
  callback() // 访问响应式对象的属性，去收集依赖
  activeEffect = null
}

let targetMap = new WeakMap()
export function track (target, key) {
  if(!activeEffect) return
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if(!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}
```

函数 reactive 的 get 函数中收集依赖的时候，调用 track

# 触发更新 trigger

```js
export function triger (target, key) {
  const depsMap = targetMap.get(target)
  if(!depsMap) return
  const dep = depsMap.get(key)
  if(dep){
    dep.forEach(effect => effect())
  }
}
```

在函数 reactive 的函数中，触发更新的地方调用 trigger

# Ref

### reactive vs ref
- ref 可以把基本数据类型数据转化成响应式对象
- ref 返回的对象，重新赋值成对象也是响应式的
- reactive 返回的对象，重新赋值丢失响应式
- reactive 返回的对象不可以解构

```js
export function ref (raw) {
  // 判断 raw 是否是 ref 创建的对象，如果是直接返回
  if(isObject(raw) && raw.__v_isRef) return
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value(){
      track(r, 'value')
      return value
    },
    set value(newValue) {
      if(newValue !== value) {
        raw = newValue
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }
  return r
}
```

# toRefs

把一个 reactive 函数处理过的对象 proxy 的每一个属性转化成 ref 式的对象，这样就可以对 reactive 化的对象进行解构

```js
export function toRefs(proxy){
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}
  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }
  return ret
}
function toProxyRef (proxy, key){
  const r = {
    __v_isRef: true,
    get value(){
      return proxy[key]
    },
    set value(newValue){
      proxy[key] = newValue
    }
  }
  return r
}
```

# computed

- 需要一个有返回值的函数作为参数，这个函数的返回值就是计算属性的值，监听函数内部使用的响应式数据的变化，最后返回这个函数的结果；

```js
export function computed(getter){
  const result = ref()

  effect(()=> (result.value = getter()))
  
  return result
}
```
就是对底层函数 effect 做了包装，返回值是 ref 式的对象