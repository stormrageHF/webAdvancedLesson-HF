"use strict";
exports.__esModule = true;
var status;
(function (status) {
    status[status["pending"] = 0] = "pending";
    status[status["finish"] = 1] = "finish";
    status[status["error"] = 2] = "error";
})(status || (status = {}));
var pstatus;
(function (pstatus) {
    pstatus[pstatus["pending"] = 3] = "pending";
    pstatus[pstatus["finish"] = 4] = "finish";
    pstatus[pstatus["error"] = 5] = "error"; // 5
})(pstatus || (pstatus = {}));
var mstatus;
(function (mstatus) {
    mstatus["pending"] = "111";
    mstatus["finish"] = "222";
    mstatus["error"] = "333";
})(mstatus || (mstatus = {}));
var obj = {
    status: 0 /* pending */
};
/*
编译的时候不一样，非const和const
用tsc 试试就知道了
非const 都是 双向键值对 会入侵js 意思是生成新的js代码
const 直接就是值
*/ 
//# sourceMappingURL=07-enum-types.js.map