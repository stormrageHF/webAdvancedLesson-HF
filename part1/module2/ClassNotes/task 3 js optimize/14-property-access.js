function Person () {
  this.name = 'hanfei'
  this.getName = function(){
    return this.name
  }
}

const p1 = new Person()
const name1 = p1.getName()

// 直接放属性即可 效率更高
function Person2 (){
  this.name = 'hanfei'
}

const p2 = new Person2()
const name2 = p2.name