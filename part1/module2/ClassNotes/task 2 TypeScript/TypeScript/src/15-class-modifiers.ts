// 访问修饰符

class Person {
  private name: string // 私有属性只能在类中访问 
  age: number  //  默认是 public 只有public 才可以在外部对想访问
  protected weight: number = 70 // 保护属性可以在继承的子类中访问

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

const p = new Person('hanfei', 18)
// console.log(p.name); // 报错 私有属性 只能在类中访问
// console.log(p.weight); // 报错 保护属性 只能在类中和子类中访问

class Student extends Person {
  private constructor(name: string, age: number) { // 构造函数也可以定义成私有属性
    super(name, age)
    console.log(this.weight); // 访问保护属性
  }
  // 可以定义静态方法创建对象
  static create(name: string, age: number) {
    return new Person(name, age)
  }
}

// 外部不能new 了
// const s = new Student('xushuang', 20)

// 只能用静态方法创建对象了
const s = Student.create('andy', 15)






