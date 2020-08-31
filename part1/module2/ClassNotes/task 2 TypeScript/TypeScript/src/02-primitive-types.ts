
const a: string = 'foo'

const b: boolean = true

const c: number = 100

// const d:string = null // 严格模式下不能这么写 需要把配置文件里的 strict 改成 false

const e: undefined = undefined // 非严格模式可以是 null 

const f: null = null // 非严格模式可以是 undefined 

const g: void = undefined // 非严格模式可以是 null

const h:Symbol = Symbol() // 报错 原因是配置文件里的默认标准库是es5 而不是 ES2015 

/*
内置对象标准库引用问题有两种解决方案：
1. 修改配置文件里的 target 
2. 修改配置文件里的 lib 将需要用到的标准库都添加进去 比如 es2015 bom 等
*/

//  中文错误提示 tsc --locale -zh-CN