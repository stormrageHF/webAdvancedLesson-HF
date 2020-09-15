import foo from './foo.js'
// import $ from 'jquery'
import './style.css'
import img from './timg.jpg'

foo.foo()

// hmr
if(module.hot) {
  module.hot.accept(()=>{
    console.log('hot module replacement ~');
  })
}

import('jquery').then($=>{
  $(document.body).append('<h1>hello parcel ~ </h1>')
  $(document.body).append(`<img src= "${ img }">`)
})
