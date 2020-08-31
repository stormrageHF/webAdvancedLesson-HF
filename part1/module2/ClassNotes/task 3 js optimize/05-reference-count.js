//reference count 

const user1 = { age: 11 }
let user2 = { age: 12 }
const user3 = { age: 13 }

const nameList = [user1.age, user2.age, user3.age]

// 清除
user1.age = null
user2 = null

// 查看结果
console.log(user1); // {age: null}
console.log(user2); // null
console.log(nameList); // (3) [11, 12, 13]

/*
因为数组里成员引用了 age 所以引用计数不为 0 ，不会被释放
*/

function foo () {
  // 写法1
  // num1 = 11
  // num2 = 12

  // 写法2
  const num1 = 11
  const num2 = 12
}

foo()
console.log(this.num1);
/*
写法1 foo 函数执行完毕后，内部两个变量是挂载到global上的，所以不会释放(可以再浏览器里验证)
若换成写法2则不一样,global 上不会挂载 num1和num2，所以一定会释放
因为他们是不可达不会再用到的内容
*/









