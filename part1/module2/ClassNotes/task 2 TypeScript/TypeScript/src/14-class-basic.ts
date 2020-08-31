// 类
export {}

class Person {
  name: string
  age: number = 0
  constructor(name: string, age: number) {
    this.name = name
  }

  sayHi(msg: string): void {
    console.log(`${this.name} , ${this.age}, ${msg}`);
  }
}