{

  function Person(name) {
    this.name = name
  }

  Person.prototype.say = function () {
    console.log(`hello ${this.name}`);
  }

  const p = new Person('hanfei')
  p.say()
  console.log(p);


}

{
  class Person {
    constructor(name) {
      this.name = name
    }
    say(){
      console.log(`hello ${this.name}`);
    }
  }
  const p = new Person('xushuang')
  p.say()
  console.log(p);
}