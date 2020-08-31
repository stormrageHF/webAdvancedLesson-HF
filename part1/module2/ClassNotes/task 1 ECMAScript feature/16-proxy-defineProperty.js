// proxy  和 defineProperty 的对比
/*
proxy 更好
三个优点：
1. 能够监听更多的操作 delete has 等等
2. 能够监听数组内容的操作
3. 以非入侵的方式监听对象的操作
*/

{
  const obj = {
    name: 'andy',
    age: 15
  }
  // 监听 delete
  const objProxy = new Proxy(obj, {
    deleteProperty(target, prop) {
      console.log('delete', target, prop);
      delete target[prop]
    }
  })
  delete objProxy.age
  console.log(obj);
}

{
  const list = []
  const listProxy = new Proxy(list, {
    set(target, prop, value) {
      console.log(target, prop, value); 
      target[prop] = value
      return true // 表示写入成功 不写会报错
    }
  })
  listProxy.push(100)
  // [] 0 100 // 先把植push进
  // [ 100 ] length 1 因为修改了length属性 所以也会输出这个
  listProxy.push(200)
  console.log(list); // [ 100, 200 ]
}

