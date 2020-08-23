// 并行方法 all race 静态方法
// 并行执行的意思是多个任务同时开始执行，多个 promise 同时开始执行

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

let url = 'api/users.json'

{
  // all ( array ) 参数是数组
  let p = Promise.all([
    ajax(url),
    ajax(url),
    // ajax('test') // 触发失败
  ])

  p.then(function (values) { // 注意： 全部成功才会进来，否则进入 catch
    console.log(values); // 返回一个结果数组，
  }).catch(function (error) {
    console.log(error); // 多个请求只要有一个失败了，就响应了
  })
}


// 演示一个最常见的组合使用 promise 调用接口的情况
{
  ajax('api/urls.json') // 1.请求一个 api 列表
    .then(function (value) {
      console.log(value); // {posts: "api/posts.json", users: "api/users.json"}
      let apiArr = Object.values(value) //  取出 values 数组 
      let ajaxArr = apiArr.map(item => ajax(item)) // 2. map 处理每一个元素，ajax 调用； map 返回一个包含多个 promise 的数组 (多个 promise 对象)
      return Promise.all(ajaxArr) // return 一个新的 promise,下一个 then 会等待我执行完毕 
    })
    .then(function (values) {
      console.log(values); // 得到两个接口返回值组成的数组, 
      // 注意：上一个 then 里必须 return 一个新的 promise，否则这里不会获取到它的结果，只会输出 undefined, 因为上一个 then 默认 return undefined
    })
}


// race （array）
{
  // 谁先结束，先响应谁，不论成功失败
  const req = ajax('api/posts.json')
  const t = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('-- timeout --')
    }, 500)
  })

  Promise.race([
    req,
    t
  ]).then(function (value) {
    console.log(value); // req 先成功执行就进来这里 ,可以用 chrome 工具 延迟执行
  }).catch(function (err) {
    console.log(err); // t 先执行完毕就进来这里
  })
}