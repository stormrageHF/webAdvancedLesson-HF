/**
 * @flow
 */

// 只能存放整型的数组  出现其他类型都会提示错误
const arr1: Array<number> = [1, 2, 3, '4']

const arr2: number[] = [1, 2, true, 3, 4]

// 元组
const arr3: [string, number] = ['foo', 100]


