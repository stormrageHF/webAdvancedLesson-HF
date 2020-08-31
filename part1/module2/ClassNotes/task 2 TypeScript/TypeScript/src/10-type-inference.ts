// 隐式类型推断

export {}

let foo = 100 // 默认是 number

// foo = '123' // 报错 


let bar // 不赋值 默认就是 any 类型

bar = 123

bar = '123'

bar = true
