// 基本使用

{
  // 定义一个生成器函数 * 
  function* main() {
    console.log('starts');
    yield 'stop1' // 3. 一个 next 开始执行，遇到 yield 的时候暂停执行 , yield 可以把一个值传出去给next的返回值

    console.log('go on');
    yield 'stop2' // 5. 又停下来了

    console.log('going');
    const r = yield 'stop3'
    console.log(r); // 我给你一个 r
    
    try {
      const s = yield 'stop4' // 要捕获传进来的 error 必须在 try 里
      console.log(s);
    } catch (error) {
      console.log(error);
    }


  }

  const generator = main() // 1. 这里并没有执行函数，而是返回一个生成器对象
  const v1 = generator.next() // 2. 开始执行函数  starts
  console.log(v1); // { value: 'stop1', done: false }

  const v2 = generator.next() // 4. 又开始执行 go on
  console.log(v2); // { value: 'stop2', done: false }

  const v3 = generator.next() // going
  console.log(v3); // { value: 'stop3', done: false }

  const v4 = generator.next('我给你一个 r') // 把值传给上一个 yield 的返回值
  console.log(v4); // { value: stop4, done: false }

  // throw
  const v5 = generator.throw(new Error('我给你一个 error'))
  console.log(v5); // { value: undefined, done: true }

}