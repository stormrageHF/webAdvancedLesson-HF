// 泛型 定义时不能明确的类型指定为一个变量，然后在调用的时候 <type>

function createArray<T>(length: number, value: T): T[] {
  return Array<T>(length).fill(value)
}

// T 就是泛型 <T>

// 调用的时候可以传入数字也可以传入string

console.log(createArray(10, 1));

console.log(createArray(5, 'a'));


