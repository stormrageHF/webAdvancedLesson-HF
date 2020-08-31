"use strict";
var a = 'foo';
var b = true;
var c = 100;
// const d:string = null // 严格模式下不能这么写 需要把配置文件里的 strict 改成 false
var e = undefined; // 非严格模式可以是 null 
var f = null; // 非严格模式可以是 undefined 
var g = undefined; // 非严格模式可以是 null
var h = Symbol(); // 报错 原因是配置文件里的默认标准库是es5 而不是 ES2015 
/*
内置对象标准库引用问题有两种解决方案：
1. 修改配置文件里的 target
2. 修改配置文件里的 lib 将需要用到的标准库都添加进去 比如 es2015 bom 等
*/
//  中文错误提示 tsc --locale -zh-CN
//# sourceMappingURL=02-primitive-types.js.map