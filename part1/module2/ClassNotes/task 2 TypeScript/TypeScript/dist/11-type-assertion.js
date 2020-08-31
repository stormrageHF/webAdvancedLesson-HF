"use strict";
// 类型断言
exports.__esModule = true;
var enums = [123, 456, 787];
var res = enums.find(function (i) { return i > 1000; });
console.log(res);
// 方式 1
var num1 = res; // 类型断言，声明一定是number类型
// 方式 2
var num2 = res; // JSX 下不能使用
//# sourceMappingURL=11-type-assertion.js.map