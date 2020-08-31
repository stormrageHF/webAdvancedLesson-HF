//reference

let obj = {name:'hanfei'}
// 一个对象被 obj 引用

let ali = obj
// 这个对象被一个新的指针引用

obj = null
// 引用计数减一  由于这个对象还被其他指针引用，所以不会释放


