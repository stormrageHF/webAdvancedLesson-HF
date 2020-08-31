// 多个源对象复制到一个目标对象中，返回变化后的目标对象

const source1 = {
  a: 1,
  b:2
}

const source2 = {
  b: 4,
  c: 5
}

const target = {
  a: 0,
  c: 6
}

const r = Object.assign(target, source1, source2)
console.log(r); // { a: 1, c: 5, b: 4 }  
// 从结果可以看出复制的顺序，source1 复制到 target ，再 source2 复制到 target，对于相同名字的属性，最终会用最后的源对象的

// 使用场景 我们要拿到一个数据对象，但是我不想修改源数据
const data = {
  name: 'tom',
  sayHi () {
    console.log('hi')
  }
}
const obj = Object.assign({},data)
obj.name = 'andy'
console.log(data.name); // tom
console.log(obj.name); // andy

// 重定义方法
obj.sayHi = () => {
  console.log('hello');
}
data.sayHi() // hi 不变 
obj.sayHi() // hello 

/*
方法不变的原因是这样的：
data 对象中的 sayHi 指向一个名叫 sayHi 的函数，拷贝的时候呢，只是把地址拷贝过去了
obj 中的 sayHi 重定义其实就是，给sayHi这个指针换了新的匿名函数的地址
所以不会影响data中的sayHi
*/ 

console.log(data);
console.log(obj);