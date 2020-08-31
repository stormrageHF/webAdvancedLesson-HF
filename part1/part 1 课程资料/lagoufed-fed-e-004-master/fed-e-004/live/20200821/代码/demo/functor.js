class Functor {
  static of (value) {
    return new Functor(value)
  }
  
  constructor (value) {
    this._value = value
  }

  map (f) {
    return new Functor(f(this._value))
  }

  value (f) {
    return f(this._value)
  }
}