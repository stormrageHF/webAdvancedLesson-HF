const arr = [1, 2, 3, 4, 5]

// 最快
arr.forEach(item => {
  console.log(item);
})

// 第二快
for (let i = arr.length; i; i--) {
  console.log(arr[i]);
}

// 最慢
for (let i in arr) {
  console.log(arr[i]);
}