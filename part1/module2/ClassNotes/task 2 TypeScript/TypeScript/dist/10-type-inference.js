"use strict";
// 隐式类型推断
exports.__esModule = true;
var foo = 100; // 默认是 number
// foo = '123' // 报错 
var bar; // 不赋值 默认就是 any 类型
bar = 123;
bar = '123';
bar = true;
//# sourceMappingURL=10-type-inference.js.map