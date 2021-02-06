# Composition API
参考示例 01-createApp.html 
新增api
- createApp 函数
 - 创建Vue对象
- setup 函数
 - Composition API 的入口
- reactive 函数
 - 创建响应式对象

#  生命周期钩子函数
setup 函数中可以增加钩子函数，在正常的钩子函数前加 on
官方地址 https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html

把鼠标移动功能封装到一个函数里
```js
    function mouseMovePosition(){
      const position = reactive({
          x: 0,
          y: 0
        })
        const update = e => {
          position.x = e.pageX
          position.y = e.pageY
        }
        onMounted(()=>{
          window.addEventListener('mousemove',update)
        })
        onUnmounted(()=>{
          window.removeEventListener('mousemove', update)
        })
      return position
    }
```

在 setup 中调用这个函数
```js
setup(){
  const position = mouseMovePosition()
  return {
    position
  }
}
```

# reactive-toRefs-ref
reactive 方法是创建一个响应式对象，但是不能在解构赋值中传递响应式；
如果你想解决这个问题，就是用 toRefs() 处理一下；

- toRefs() 把处理对象的所有属性都转化成响应式，在挂载给新对象

# computed
- 第一种用法
 - watch(()=>count.value+1)

- 第二种用法
```js
 const count = ref(1)
 const plusOne = computed({
   get: ()=>count.value+1,
   set: val=> {
     count.value = val - 1
   }
 })
```

# watch
侦听器

- watch 的三个参数
  - 第一个参数：要监听的数据
  - 第二个参数：监听到数据变化后执行的函数，这个函数有两个参数分别是新值和旧值
  - 第三个参数：选项对象，deep 和 immediate
- watch 的返回值
  - 取消监听的函数
  
# watchEffect
- watch 函数的简化版本，也用来监视数据的变化
- 接收一个函数作为参数，监听函数内响应式数据的变化
- 返回一个取消监听的函数

#  todolist-功能演示
1. 添加待办事项
2. 删除待办事项
3. 编辑待办事项
4. 切换待办事项
5. 存储待办事项

# 项目结构
创建一个Vue 3.0的项目 04-todolist
通过  Composition APIs 实现待办事项增舔改查

# todolist-添加待办事项
1. 需要一个数组存储管理待办事项，数组todos，绑定到ui，用ref创建
2. input 文本框绑定输入变量 input 和 enter 方法 addTodo，将 input 的值和状态添加到 todos
3. input 需要用 ref 创建成响应式的，文本框回车时自动清空
4. setup 中 return useAdd 函数的返回值

# todolist-删除待办事项
1. 删除按钮绑定remove函数，参数是 todo
2. 在 useRemove 函数中定义 removeTodo 方法，根据todo找到数组中的索引并删除
3. 在setup 中return useRemove 函数的返回值

# todolist-编辑待办事项
1. 双击文本框，使文本框可编辑
2. 按回车或者编辑文本框失去焦点，修改数据
3. esc 取消编辑
4. 清空待办事项文本框，点回车可以删除这一项
5. 显示待办编辑文本框时获取焦点

1. 创建 useEdit 方法；
在 useEdit 方法中创建一个变量 beforeEditingText 记录编辑文本内容，参数是remove函数；
创建响应式变量 editingTodo 来记录当前修改的代办事项 todo，需要这个参数来控制编辑状态和非编辑状态的切换；
定义一个函数 editTodo，记录 todo的text到 beforeEditingText，记录 todo 到 editingTodo；
定义完成编辑函数 doneEdit，判断当前是否在编辑中，更新 todo的 text 值，若为空调用 remove 函数，最后 editingTodo 的 value 赋值 null；
取消编辑函数 cancelEdit，editingTodo 的 value 赋值 null，todo的text 赋值 beforeEditingText；
useEdit 返回这些变量和函数；
2. 在 setup 中注册 useEdit 函数
3. 模板中绑定变量和事件：
input 绑定 todo 的 text；
label dbclick 绑定 editTodo；
li 绑定动态类样式 editing，通过 editingTodo 是否等于todo判断；
input 绑定 keyup enter 方法 doneEdit；
input 绑定 blur 方法 doneEdit；
input 绑定 keyup esc 方法 cancelEdit；
4. 由于li的 key 是 todo 的 text，text的修改会导致 li 重渲染，导致焦点会失去，所以将 key 改成 todo；

## 编辑文本框获取焦点
- 自定义指令
当前正在编辑的文本框自动获取焦点，我们要创建一个指令 v-editing-focus, 内容 todo 是否等于 editingTodo;
directives 注册指令，editingFocus 方法，参数 el，binding，binding.value && el.focus();
el 是绑定这个指令的元素，binding是绑定指令对象，value 为绑定指令的值;

# todolist-切换待办事项
- 点击 checkbox，改变所有待办项状态
- All/Active/Completed
- 其他
  - 显示未完成待办项个数
  - 移除所有完成的项目
  - 如果没有待办项，隐藏 main 和 footer

## 改变待办事项完成状态
创建一个函数 useFilter；
创建一个计算属性 allDone，计算属性中方法 get，判断todos中的每一项是否完成状态，是返回true，否则返回 false；set方法，todos 每一项都设置成参数 value；
useFilter 返回 allDone；
模板上 toggle-all 绑定 allDone；
单个的checkbox绑定 todo 的状态 completed；
li的动态类样式，增加一个 completed：todo.completed；

## 切换状态
还是在 useFilter 函数中写，
onMounted 中注册 hashchange 事件，onUnmounted 中取消 hashchange 事件；
定义一个 filter 对象，包含三个函数 all，active，completed，分别过滤todos里的，所有选项，未完成选项数组，已完成选项数组；
定义响应式变量 type；
事件方法 onHashChange,获取 hash 中的关键值(去掉#/)，判断是否存在于filter对象的属性中，若存在则把 hash 赋值给 type的value；不存在则将type的value赋值 all，并把网页的hash设置空字符串；
定义计算属性 filteredTodos，计算属性方法传一个箭头函数，箭头函数返回值是 filter 对象调用 type的value 的方法，参数是 todos 的value；
useFilter 返回计算属性 filteredTodos;

## 其他
- 显示未完成待办事项的个数
1. 绑定一个计算属性 remainingCount；
2. 在 useFilter 中的 filteredTodos 下面定义这个计算属性，通过 filter 中的 active 方法获取未完成的数组的length；
3. useFilter 返回 remainingCount；

- 删除已完成的事项
1. useRemove 函数中添加，removeCompleted 方法，todos 过滤掉已经完成的；
2. useRemove 返回值添加 removeCompleted；

- 没有待办事项，隐藏列表部分和底部操作菜单
1. main 和 footoer 绑定 v-show count；
2. clear-completed 按钮绑定 v-show count > remainingCount；
3. remainingCount 下增加计算属性 count，获取todos的 value 的 length；

# todolist-存储待办事项
目录 src/utils/useLocalStorage.js；
定义 parse 解析字符串和 stringify处理对象方法，并捕获异常；
对外声明一个函数 useLocalStorage 方法，方法中定义两个方法，setItem 存储本地和 getItem 读取本地方法，
App.vue 中导入 useLocalStorage 方法 storage；
定义一个函数 useStorage，专门两件事：打开页面从本地读取数据；数据变化直接存入本地；
todos 读取本地包装响应式 ref；watchEffect 监听 todos 变化，写入本地；
useStorage 函数返回 todos，传给 setup 中的 todos；

















