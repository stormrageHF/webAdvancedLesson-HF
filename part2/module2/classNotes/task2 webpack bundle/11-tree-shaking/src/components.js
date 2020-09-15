export const Button = () => {
  console.log('butttttttton'); 
  return document.createElement('button')

  console.log('dead-code') // 未引用代码
}

// 未引用部分
export const Link = () => {
  console.log('test test test !!');
  return document.createElement('a')
}

// 未引用部分
export const Heading = level => {
  return document.createElement('h' + level)
}
