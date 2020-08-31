// 

// 发号器

function* createIdMaker() {
  let id = 0
  while (true) {
    yield id++
  }
}

const g = createIdMaker()
console.log(g.next().value); // 0
console.log(g.next().value); // 1
console.log(g.next().value); // 2
console.log(g.next().value); // 3
console.log(g.next().value); // 4


// 实现要给迭代器
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
  [Symbol.iterator]: function* () {
    let idx = 0
    const all = [...this.list, ...this.work, ...this.arr]
    for (const item of all) {
      yield item
    }
  }
}

console.log('-------------------------------------');
for (const it of todos) {
  console.log(it);
}


// 为不具备 Iterator 接口的对象提供遍历方法。
console.log('-------------------------------------');

function* objectEntries(obj) {
  const propKeys = Reflect.ownKeys(obj)
  for (const propKey of propKeys) {
    yield [propKey, obj[propKey]]
  }
}

const jane = { first: 'Jane', last: 'Doe' };
for (const [key, value] of objectEntries(jane)) {
  console.log(`${key} , ${value}`);
}



console.log('-------------------------------------');
{
  const ooo = {
    name: 'hanfei',
    age: 15
  }

  // 用生成器为一个对象自定义 iterator
  Object.defineProperty(ooo, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function* () {
      // 首先需要键数组
      const that = this;
      const keys = Object.keys(that)
      for (const key of keys) {
        yield key
      }
    }
  })

  for (const it of ooo) {
    console.log(it);
  }

  const iterator = ooo[Symbol.iterator]()
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());

}




