// 模板字符串

// 支持换行

{
  const str = `test test test 
             test test test`
  console.log(str);
}

{
  // 嵌入js 变量，方法都可以
  console.log(`hello ${Math.max(1, 2)}, \`string\` `);
}

