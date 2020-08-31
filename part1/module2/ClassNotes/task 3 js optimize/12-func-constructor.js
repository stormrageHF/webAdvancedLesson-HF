function fn1 (){
  this.foo = function (){
    console.log(11111);
  }
}

const fn1 = new fn1()



function fn2 (){
 
}
fn2.prototype.foo = function (){
  console.log(11111);
}

const fn2 = new fn2()















