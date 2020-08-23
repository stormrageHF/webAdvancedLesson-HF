
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


async function main() {
  try {
    const users = await ajax('api/users.json') // 
    console.log(users);

    const posts = await ajax('api/posts.json') //  
    console.log(posts);

    const urls = await ajax('api/urls.json') //  
    console.log(urls);
  } catch (error) {
    console.log(error);
  }
}


const p = main()
p.then(res => {
  console.log('all complete');
})

