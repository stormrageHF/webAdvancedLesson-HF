// 抽象类

// 抽象类为了约束子类必须有什么属性，且自己不能new，只能继承
export { }

// 抽象类
abstract class Animal {
  eat(food: string): void {
    console.log(food);

  }

  // 抽象方法
  abstract run(distance: string): void // 没有方法体
}


// new Animal() // 报错

class Cat extends Animal {
  run(distance: string): void {
    console.log(distance);
  }
}

const c = new Cat()
c.run('100km')
c.eat('food')




