class MayBe {
  static of(value) {
    return new MayBe(value)
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }

  isNothing() {
    return this._value === null || this._value === undefined
  }
}

const r = MayBe.of('hello')
  .map(x => x.toUpperCase())

console.log(r); // MayBe { _value: 'HELLO' }

const r1 = MayBe.of(undefined)
  .map(x => x.toUpperCase())

console.log(r1); // MayBe { _value: null }

const r2 = MayBe.of('a b c')
.map(x => x.toUpperCase())
.map(x => null)
.map(x => x.split(' '))

console.log(r2); // MayBe { _value: null }  无法判断出现 null 得时机
