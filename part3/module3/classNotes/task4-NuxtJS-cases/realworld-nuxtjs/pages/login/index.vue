<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? "Sign in" : "Sign up" }}
          </h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="!isLogin" to="/login" key="login01"
              >Have an account?</nuxt-link
            >
            <nuxt-link v-else to="/register" key="register01"
              >Need an account?</nuxt-link
            >
          </p>

          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="(message,index) in messages" :key="index">
                {{field}} {{message}}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/index";
// 客户端才引入
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  name: "LoginPage",
  computed: {
    isLogin() {
      return this.$route.name === "login" ? true : false;
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {}
    };
  },
  methods: {
    // 登录请求
    async onSubmit() {
      try {
        const { data } = this.isLogin 
        ? await login({
          user: this.user,
        })
        : await register({
          user: this.user
        })
        // 保存登录状态
        // console.log(data);
        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
        // push 到首页
        this.$router.push("/");
      } catch (error) {
        // console.dir(error)
        this.errors = error.response.data.errors
      }
    },
  },
};
</script>

<style>
</style>