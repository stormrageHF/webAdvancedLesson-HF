// 迭代器模式

const todos = {
  list: ['1', '2', '3'],
  work: ['foo', 'bar', 'hhh'],
  arr: ['test', 'finish', 'result'],

  each: function (callback) {
    const all = [].concat(this.list, this.work, this.arr)
    for (const item of all) {
      callback(item)
    }
  },


  // 1.迭代器函数
  [Symbol.iterator]: function () {
    // 2. 返回一个对象
    let idx = 0
    const all = [...this.list, ...this.work, ...this.arr]
    return {
      // 3. 对象里有个next方法
      next() {
        // 4. 方法返回一个结果对象 属性 value done
        return {
          value: all[idx++],
          done: idx > all.length
        }
      }
    }
  }


}


todos.each(item => {
  console.log(item);
})

console.log('---------------------------------------------');

for (const iterator of todos) {
  console.log(iterator);
}



