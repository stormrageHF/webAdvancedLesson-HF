"use strict";
//  函数类型
exports.__esModule = true;
/*
a 正常参数
b 可选参数 ？
c 默认参数
*/
function foo(a, b, c) {
    if (c === void 0) { c = 10; }
    console.log(b);
    return 'foo';
}
foo(100, undefined, 11); // undefined
// :(a: number, b: number) => string 可以自动识别
var bar = function (a, b) {
    return 'bar';
};
// 手动指定
var coo = function (a, b) {
    return 'coo';
};
//# sourceMappingURL=08-function-types.js.map