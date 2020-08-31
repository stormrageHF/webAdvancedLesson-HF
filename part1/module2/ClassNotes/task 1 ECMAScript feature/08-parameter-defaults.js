// 参数默认值
// 带默认值的参数必须滞后
function foo (v, parameter = true) {
  console.log(parameter);
  console.log(v);
} 

// foo(1)
foo(2,4)