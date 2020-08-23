// promise 封装 ajax

function ajax(url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.responseType = 'json'
    // 这里不能用 箭头函数 否则 this 指向 window
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

// 在浏览器里测试，因为用到了浏览器的API

let url = "api/users.json"; // success
url = "foo.json" // 404  Error: Not Found
ajax(url).then(function (res) {
  console.log(res);
}, function (err) {
  console.log(err);
})

export default ajax
