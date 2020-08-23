class Left {
  static of(value) {
    return new Left(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return this
  }
}

class Right {
  static of(value) {
    return new Right(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return Right.of(fn(this._value))
  }
}

function parseJson(str) {
  try {
    return Right.of(JSON.parse(str)) // str => object
  } catch (e) {
    return Left.of({ error: e.message })
  }
}

let str = "{ name: zs }"  // Left { _value: { error: 'Unexpected token n in JSON at position 2' } } 不合法得json串
// str = "123123zxcc"
str = '{"name":"zs"}'
let r = parseJson(str)
  .map(x => x.name.toUpperCase())

console.log(r); // Right { _value: 'ZS' }

console.log(JSON.stringify({ name: 'zs' }));