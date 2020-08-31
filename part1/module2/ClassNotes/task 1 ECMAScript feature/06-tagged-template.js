// 带标签的模板字符串 主要用于一些转义的处理 比如翻译

const name = 'Tom'
const gender = true

//  定义一个函数
function foo (strings, name, gender) {
  console.log(strings); // [ '', ' is a ', '' ]
  console.log(name); // Tom
  console.log(gender) // true

  gender = gender ? 'man':'woman'
  return name + strings[1] + gender
}
 // 函数 + 模板字符串 
const r = foo`${name} is a ${gender}`
console.log(r); // Tom is a man