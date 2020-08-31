/**
 * 特殊类型
 * @flow
 */


 // 字面量 
 let a: 'foo' = 'foo'
 //  a = 1 这个的意思就是 值只能是 foo


 // 联合变量
 const result: 'success' | 'fail' | 'pending' = 'success'
 // 三个状态中选一个



 // 联合变量类型
 const s: string | number  = '123' // 123 s可以是string 也可以是 number
 // 联合类型定义为一个类型变量
 type StringOrNumber = string | number
 const d: StringOrNumber = 100 // 'abc'



 // maybe 类型 在已有类型上扩展 null 和 undefined
 const gender: ?number = undefined



 // 这个 ？ 等价于下面
 const gender2: number | null | void = null

