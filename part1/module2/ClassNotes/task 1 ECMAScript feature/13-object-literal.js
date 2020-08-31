// 对象的字面量增强

const age = 15

const obj = {
  name: 'andy',
  // age: 15,
  age, // 同名直接放入

  // foo: function () {
  //   console.log(this);
  // },
  // 等价于
  foo(){
    console.log(this);
  },
  // 计算属性-表达式当成属性  [ 表达式 ] ,这个属性是动态生成的 
  [Math.random()]: '123123'
  
}