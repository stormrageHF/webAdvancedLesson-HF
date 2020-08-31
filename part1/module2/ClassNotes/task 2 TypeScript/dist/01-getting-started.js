function sum(a, b) {
  return a + b;
}

sum(100, 100); // sum('12',5)
// sum('100', '100')

/*

因为js没有类型注解语法，所以发布版本中是不应该有类型注解的
去除类型注解的方案：
1. flow-remove-types
2. babel
可以在 package.json 里查看命令

*/