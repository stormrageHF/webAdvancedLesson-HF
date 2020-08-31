// 对象解构

const obj = {
  name: 'Tom',
  age: 24
}

{
  // 基本
  const { name } = obj
  console.log(name); // Tom
}

{
  // 默认值
  const { name = 'hh' } = {}
  console.log(name); // hh
}

{
  // 重名
  const name = 'hanfei'
  // const { name } = obj // 报错
  const { name: custom } = obj
  console.log(custom); // Tom
  // 默认值
  const { name: custom2 = 'Jay' } = {}
  console.log(custom2); // Jay
}

{
  // 使用场景 简化对象里的方法
  const { log } = console
  log('test') // test
  // 等价于
  console.log('test') // test
}


