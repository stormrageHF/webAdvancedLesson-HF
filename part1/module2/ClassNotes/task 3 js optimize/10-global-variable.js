// 全局变量性能低

// 全局变量
var i,str =''
for(i=0;i<1000;i++){
  str += i
}

// 局部变量
for(leti=0;i<1000;i++){
 let str += i
}


// 在性能测试网站jsperf测试的结果中
// 局部变量更快效率更高








