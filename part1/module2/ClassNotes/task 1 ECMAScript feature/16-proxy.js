// proxy
// 代理监听一个对象的属性的set和get

const person = {
  name: 'zce',
  age: 20
}
// 参数 第一个是监听的对象，第二个是自定义对象，自定义对象中，实现get和set方法

const personProxy = new Proxy(person, {
  get(target, prop) {
    // 两个参数传进来 target获取的目标对象 prop目标对象的具体属性
    console.log(target, prop)
    // 返回值可以修改，也可以返回原值
    // return 100
    return prop in target ? target[prop] : 'default'
  },
  set(target, prop, value) {
    // 三个参数传进来 target prop value
    console.log(target, prop, value);
    if(prop === 'age') {
      if(!Number.isInteger(value)){
        throw new TypeError(`${value} is not int`)
      }
    }
    target[prop] = value
  }
})


console.log(personProxy.name);
//  { name: 'zce', age: 20 } name 
// 100 zce

// 获取一个不存在的属性
console.log(personProxy.gender); // default

personProxy.name = 'andy'
// personProxy.age = '12323'
personProxy.age = 12
