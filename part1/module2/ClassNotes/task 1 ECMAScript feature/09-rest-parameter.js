// 剩余参数

function foo (){
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
  
}

foo(1,2,3,4)


function bar (...args) {
  console.log(args); // [ 1, 2, 3, 4 ]
  console.log(...args); // 1 2 3 4
}

bar(1,2,3,4)


// 剩余参数必须是滞后

function cco (first, ...args) {
  //
}