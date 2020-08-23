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

// 演示一个用 generator 同步执行 ajax 的案例
function* main() {
  try {
    const users = yield ajax('api/users.json') // 参数传给了 r
    console.log(users);

    const posts = yield ajax('api/posts.json') // 参数传给了 r2
    console.log(posts);

    const urls = yield ajax('api/urls.json') // 参数传给 r3
    console.log(urls);
  } catch (error) {
    console.log(error); // g.throw 串来的错误
  }
}


// const g = main()
// const r = g.next()

{

  // // r.value.then((res) => {

// //   const r2 = g.next(res) // 参数传给了 users
// //   if (r2.done) return

// //   r2.value.then(res => {

// //     const r3 = g.next(res) // 参数给了 posts
// //     if (r3.done) return

// //     r3.value.then(res => {

// //       const r4 = g.next(res) // 参数给了 urls

// //     })
// //   })

// // })

}

// // 优化 递归
// function Recursion(r) {
//   if (r.done) {
//     return
//   }
//   r.value.then(res => {
//     const r = g.next(res)
//     Recursion(r)
//   }, error => {
//     g.throw(error)
//   })
// }

// Recursion(r)


// 再优化 做成公共函数 co

function co(generator){
  const g = generator

  function Recursion(r) {
    if (r.done) {
      return
    }
    r.value.then(res => {
      const r = g.next(res)
      Recursion(r)
    }, error => {
      g.throw(error)
    })
  }

  Recursion(g.next())
}

co(main())


