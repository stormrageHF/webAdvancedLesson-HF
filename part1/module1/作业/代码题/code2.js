const fp = require('lodash/fp')
const { flowRight } = require('lodash')
// 数据
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false },
]


{
  // 练习1
  let isLastInStock = function (cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock', last_car)
  }

  const r = isLastInStock(cars)
  console.log(r); // false

  // 重写
  let getLastInStock = flowRight(fp.prop('in_stock'), fp.last)
  console.log('练习1', getLastInStock(cars)); // 练习1 false
}



{
  // 练习2
  const getFistName = flowRight(fp.prop('name'), fp.first)
  console.log('练习2', getFistName(cars)); // 练习2 Ferrari FF
}



{
  // 练习3
  let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
  } // 无需改动

  let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
      return car.dollar_value
    }, cars)
    return _average(dollar_values)
  }
  console.log(averageDollarValue(cars)); // 790700

  // 重写
  let averageDollarValue2 = flowRight(_average, fp.map(car => car.dollar_value))
  console.log('练习3', averageDollarValue2(cars)); // 练习3 790700
}



{
  // 练习4
  // space 替换 _ , \W(大写)用来匹配非单词字符，它等价于"[^a-zA-Z0-9_]"
  let _underscore = fp.replace(/\W+/g, '_')

  // 获取name数组
  let getNames = function (cars) {
    return fp.map(car => fp.prop('name', car), cars)
  }

  // 给name数组做处理
  const sanitizeNames = function (arr) {
    return fp.map(name => flowRight(fp.toLower, _underscore)(name), arr)
  }
  // 结果
  const r = flowRight(sanitizeNames, getNames)
  console.log('练习4', r(cars)); // 
}





