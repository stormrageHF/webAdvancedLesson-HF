/**
 * @flow
 */

// obj1 有两个属性 foo 和 bar，foo的值必须是string类型，bar的值必须是string类型
const obj1: { foo: string, bar: number } = { foo: '123', bar: 100 }

// 属性可选 ?
const obj2: { foo?: string, bar: number } = { bar: 100 }

// 统一指定 可以添加任意多的属性 但是 键值的类型都必须是string
const obj3: { [string]: string } = {}
obj3.key1 = 'value1'
obj3.key2 = 'value2'
