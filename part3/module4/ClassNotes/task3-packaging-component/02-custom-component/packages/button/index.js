import LgButton from './src/button.vue'

// 这个方法可以使使用的人用 Vue.use 注册插件
LgButton.install = Vue => {
  Vue.component(LgButton.name, LgButton)
}

export default LgButton
