// Functor 函子
{
  class Container {
    constructor(value) {
      this._value = value;
    }

    map(fn) {
      return new Container(fn(this._value))
    }
  }

  const r = new Container(5)
    .map(x => x + 1)
    .map(x => x * x)

  console.log(r); // Container { _value: 36 }

}

// 优化后得写法

{
  class Container {
    static of(v) {
      return new Container(v)
    }

    constructor(value) {
      this._value = value
    }

    map(fn) {
      return Container.of(fn(this._value))
    }
  }

  const r = Container.of(5)
    .map(x => x + 1)
    .map(x => x * x)

  console.log(r); // Container { _value: 36 }

}

// 总结：函子得目的就是 私有成员变量不用去获取，只需要永远用 map 函数来调用函数操作 变量；
// 而且还是链式得操作

{
  // 引起副作用得例子 null undefined

  class Container {
    static of(v) {
      return new Container(v)
    }

    constructor(value) {
      this._value = value
    }

    map(fn) {
      return Container.of(fn(this._value))
    }
  }

  // null undefined
  const r = Container.of(null)
    .map(x => x.toUpperCase()) // TypeError: Cannot read property 'toUpperCase' of null

  console.log(r);

}



