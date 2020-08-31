// 继承

class Person {
  constructor(name) {
    this.name = name
  }
  say() {
    console.log(`hello ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, number) {
    // super 指向父类 Person 
    super(name)
    this.number = number
  }
  hello() {
    // 两种调用方式都可以 方法和属性在子类上都存在了
    this.say() 
    super.say()
    console.log(`${this.name} number is ${this.number}`);
  }
}

const s = new Student('hanfei', 1234)
console.log(s); // Student { name: 'hanfei', number: 1234 }
s.hello()
/*
hello方法在原型对象上
say方法在父类的原型对象上
*/
