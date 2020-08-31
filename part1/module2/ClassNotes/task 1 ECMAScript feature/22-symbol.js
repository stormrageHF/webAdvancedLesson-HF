// 为对象添加独一无二的属性名

const name = Symbol('name')

console.log(name);

const person = {
  [name]: 'hanfei',
  [Symbol('age')] : 15,
  say() {
    console.log(this[name]);
  }
}


person.say() // hanfei

console.log(person[name]); // hanfei 这里可以读出来是因为 上面name存储了那个 symbol的地址

console.log(person[Symbol('age')]); // undefined 这里读不出来的原因是 Symbol('age') ！== Symbol('age') 这是两个symbol对象

console.log(Symbol('age') === Symbol('age')); // false

