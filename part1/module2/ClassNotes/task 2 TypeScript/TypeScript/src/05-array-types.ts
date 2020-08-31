// 数组类型


const arr1: Array<string> = ['1', '2', '3']

const arr2: number[] = [1, 2, 3]

// 函数参数指定number数组类型
function sum(...args: number[]) {
  return args.reduce((acc, cur) => {
    return acc + cur
  }, 0)
}

const r = sum(1, 2, 3)
console.log(r); // 6


export { }

