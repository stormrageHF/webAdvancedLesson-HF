import axios from "axios"


export const login = data => {
  console.log(data);
  const url = "https://conduit.productionready.io/api/users/login"
  return axios.post(url, {
    "user": {
      "email": data.username,
      "password": data.password
    }
  }, {
    // "headers": {
    //   "Authorization": localStorage.sign_token
    // }
  })
}

export const signUp = data => {
  console.log(data);
  const url = "https://conduit.productionready.io/api/users"
  return axios.post(url, {
    "user": {
      "username": data.username,
      "email": data.email,
      "password": data.password
    }
  })
}

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log('拦截');
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    alert(JSON.stringify(error.response.data.errors))
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
  return Promise.reject(error);
});