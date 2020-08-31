// 只读
// 只能在初始化和构造里定义，其他地方赋值都报错

export {}

class Person {
  public readonly name:string = 'tom'
  constructor(name:string){
    this.name = name
  }
  sayhi(){
    // this.name = 'sss' // 报错
  }
}

const p = new Person('andy')
console.log(p.name);
