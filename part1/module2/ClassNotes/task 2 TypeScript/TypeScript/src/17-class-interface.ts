// 

// 定义两个接口，要遵循接口的定义规则，接口里定义了什么，你就必须的有什么

// 接口就是用来约束类必须得有什么成员属性

interface Eat {
  eat(food: string): void // 不用实现
}

interface Run {
  run(distance: string): void
}

class Person implements Eat, Run { // 一个类执行接口 必须有接口里的属性
  eat(food: string): void {
    console.log(food);
  }
  run(distance: string): void {
    console.log(distance);
  }
}

const p = new Person()


class Car implements Run {
  run(distance: string): void {
    console.log(distance);
  }
}








export { }