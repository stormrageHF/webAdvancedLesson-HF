// 类型断言

// 不是类型转换 只是在编译阶段告诉编译器 这个变量一定是 某个类型

export { }

const enums = [123, 456, 787]

const res = enums.find(i => i > 1000)
console.log(res);

// 方式 1
const num1 = res as number  // 类型断言，声明一定是number类型

// 方式 2
const num2 = <number>res // JSX 下不能使用