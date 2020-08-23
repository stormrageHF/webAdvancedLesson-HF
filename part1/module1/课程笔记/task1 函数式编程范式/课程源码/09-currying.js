//柯里化得演示

{
  function checkAge(age) {
    let min = 18;
    return age > 18
  }
}
// 这个函数有硬编码，可以柯里化,也可以转成普通纯函数


// 纯函数
{
  function checkAge(age, min) {
    return age > min
  }
  console.log(checkAge(20, 30)); // false
}


// 函数柯里化,其实就是闭包
{
  function checkAge(min) {
    return function (age) {
      return age > min
    }
  }

  const checkAge18 = checkAge(18)
  console.log(checkAge18(20)); // true
  console.log(checkAge18(20)); // true
  console.log(checkAge18(10)); // false
}

// es6
{
  // 箭头函数中 return 得函数用括号包一下
  let checkAge = min => (age => age > min)
}
