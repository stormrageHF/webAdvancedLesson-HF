// 请说出下列代码最终的输出结果，解释为什么

var a = 10
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a);
    });
  }
}
obj.fn() // 20

/*
普通函数和箭头函数的区别,箭头函数不会改变this指向
箭头函数体中的 this 对象，是fn()函数传进去的，而fn里的this指向了obj
*/