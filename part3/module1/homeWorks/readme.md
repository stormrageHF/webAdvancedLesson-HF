# 一、简答题

## 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})

答：该 name 属性不是响应式的；因为 vm 初始化的时候，只对 dog 对象做响应式处理，并没有对 dog 的属性做过响应式处理（因为这时 dog 没有属性）；所以  this.dog.name = 'Trump' 这句代码不会触发 setter 方法；
1.可以用 this.dog = {name: 'trump'} ，这样会触发 setter 方法，执行 walk 方法，为传入的对象的每一个属性做响应式处理；
2.可以用 Vue.set(target, key, value) 方法，专门为 dog 对象定义响应式属性

 
## 2、请简述 Diff 算法的执行过程

用 patch 方法比较 oldVnode 和 vnode ：
- 判断 oldVnode 和 vnode 是否相同（主要是判断 key 和 sel 是否相同）
  - 不同，vnode 转化成真实 dom 插入父节点，删除 oldVnode；
  - 相同，调用 patchVnode 方法做深度比较；

patchVnode 方法深度比较 oldVnode 和 vnode：
- vnode 有 text 属性，与 oldVnode 不同
  - oldVnode 清空 children （如果 children 存在），更新 dom 的 textContent
- vnode 有 children 
  - oldVnode 也有 children ，调用 updateChildren 方法比较子节点
  - oldVnode 没有 children，那就删除 text （如果有text），添加新的 children
- vnode 没有text 也没有 children
  - oldVnode 清除 text （如果 text 存在），清除 children （如果 children 存在）

updateChildren 方法比较子节点：
- 同级别比较
- 比较 oldStartVnode 和 newStartVnode 是否相同
  - 相同，调用 patchVnode 更新节点，两个索引++，继续比较
  - 不同，进入下一个判断
- 比较 oldEndVnode 和 newEndVnode 是否相同
  - 相同，调用 patchVnode 更新节点，两个索引--，继续比较
  - 不同，进入下一个判断
- 比较 oldStartVnode 和 newEndVnode 是否相同
  - 相同，调用 patchVnode 更新节点，oldStartVnode 对应元素移动最右边；old 索引++，new 索引--；
  - 不同，进入下一个判断
- 比较 oldEndVnode 和 newStartVnode 是否相同
  - 相同，调用 patchVnode 更新节点，oldEndVnode 对应的元素移动到最左边；old 索引--，new 索引++；
  - 不同，进入下一个判断
- 遍历新节点，用 newStartVnode 的 key 在旧节点中找是否相同
  - 没有找到，添加新节点到父节点
  - 找到，判断 sel 是否相同
    - sel 不同，节点被修改，重新创建dom插入父节点
    - sel 相同，把这个旧节点移动到最左边
- 循环结束
  - 老节点先遍历完，说明新节点剩余，将新节点插入到父节点
  - 新节点先遍历完，说明老节点剩余，将剩余节点删除


# 二、编程题

## 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
参考工程 vuerouter-demo/src/vuerouter/index.js

 
## 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
参考工程 vue-demo

 
## 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图 ./1.png：
参考工程 snabbdom-demo/src/index.js

### 因为我用的版本是 2.1.0 ， click 函数处理参数的时候和官方例子会不一样
