// 箭头函数 this 指向自己的作用域的最近外部作用域中的this, 和调用者无关，普通函数的this和调用者有关

/*
在nodejs里，箭头函数里的this指向{}；
如果你加上这句代码 module.exports.name = 'andy' ，this指向就是 { name: 'andy' }
module.exports = { name: 'andy' }  this   还是 {}

*/
// module.exports.name = 'andy' 
// module.exports = { name: 'andy' }

const obj = {
  name: 'tom',
  sayHi: function () {
    console.log(this.name);
  },
  sayHi2: () => {
    console.log(this);
    console.log(this.name);
  },
  sayHi3: function () { // 因为这里的timeout的回调函数最终会被全局对象调用
    const _this = this
    setTimeout(function () { // 所以我们会借用闭包
      console.log(_this.name);
    }, 100)
  },
  // 使用箭头函数可以避免 sayHi3 的问题
  sayHi4: function () {
    setTimeout(() => {
      console.log(this.name);
    }, 100)
  }
}


obj.sayHi() // tom
obj.sayHi2() // undefined
obj.sayHi3() // undefined tom
obj.sayHi4()   // tom


