"use strict";
// 数组类型
exports.__esModule = true;
var arr1 = ['1', '2', '3'];
var arr2 = [1, 2, 3];
// 函数参数指定number数组类型
function sum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (acc, cur) {
        return acc + cur;
    }, 0);
}
var r = sum(1, 2, 3);
console.log(r); // 6
//# sourceMappingURL=05-array-types.js.map