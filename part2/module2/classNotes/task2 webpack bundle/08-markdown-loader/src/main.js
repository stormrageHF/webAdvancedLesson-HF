import about from './about.md'
import test from './module.js'

console.log(about);

document.write(about)

// document.body.append(about)

// ----------------------fetch proxy api example-------------------------------

const ul = document.createElement('ul')
document.body.append(ul)

fetch('/api/users')
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const li = document.createElement('li')
      li.textContent = item.login
      ul.append(li)
      // alert(123)
    });
  })

const value = test()

if (module.hot) {
  module.hot.accept('./module.js', () => {
    console.log('module hot update !! ');
    const input = document.getElementById('input')
    const value = input.value;
    input.value = value + test()
  })
}





