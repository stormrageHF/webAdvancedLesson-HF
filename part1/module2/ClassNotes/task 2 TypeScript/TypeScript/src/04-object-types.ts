// object 类型

/*
object 类型不单是 {} 还有 函数 数组
但是不可以是基础类型
*/

export { } // 确保和其他实例没有成员冲突

const foo: object = function () { } // [] // {}

// 多出来的属性会报错
const obj: { foo:number, bar:string } = { foo: 100, bar:'vvv', }
