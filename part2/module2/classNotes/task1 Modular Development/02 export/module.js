export const foo = 'foo module' 

const name = 'tom'
const age = 14

function bar () {}

class Person {}

export {
  name,
  bar as default,
  age as myAge // 重命名
}

export default Person

