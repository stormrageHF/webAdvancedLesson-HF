const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

// 练习1
{
  let maybe = Maybe.of([5, 6, 1])
  let ex1 = () => {
    return maybe.map(fp.map(v => fp.add(v, v)))._value
  }
  console.log('练习1', ex1()); // 练习1 [ 10, 12, 2 ]
}

// 练习2
{
  let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
  let ex2 = () => {
    return xs.map(fp.first)._value
  }
  console.log('练习2', ex2()); // do
}

// 练习3
{
  let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
  })
  let user = { id: 2, name: 'Albert' }
  let ex3 = () => {
    return safeProp('name', user).map(fp.first)._value
  }
  console.log('练习3', ex3()); // 练习3 A

}


// 练习4
{
  // let ex4 = function (n) {
  //   if(n){
  //     return parseInt(n)
  //   }
  // }

  let ex4 = function (n) {
    return Maybe.of(n).map(parseInt)._value
  }
  console.log('练习4', ex4(10.22)); // 练习4 10
  console.log('练习4', ex4(null)); // 练习4 null
}
