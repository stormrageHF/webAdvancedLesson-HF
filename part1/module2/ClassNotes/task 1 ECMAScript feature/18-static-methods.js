class Person {
  constructor(name){
    this.name = name
  }
  say(){
    console.log(`hello ${this.name}`);
  }
  static create (name) {
    console.log(this); // 指向 [Function: Person]
    return new Person(name)
  }
}

const p = Person.create('hanfei')
p.say()