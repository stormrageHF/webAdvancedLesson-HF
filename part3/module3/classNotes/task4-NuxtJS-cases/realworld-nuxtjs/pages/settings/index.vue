<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="UpdateUser">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="currentUser.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="currentUser.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="currentUser.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="currentUser.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="currentUser.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentUser, UpdateUser } from "@/api/profile";
import { mapMutations } from "vuex";
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: "authenticated",
  name: "SettingsPage",
  data() {
    return {
      currentUser: {},
    };
  },
  async mounted() {
    const { data } = await getCurrentUser();
    this.currentUser = data.user;
  },
  methods: {
    ...mapMutations(["setUser"]),
    logout() {
      this.setUser(null)
      Cookie.set('user', null)
      this.$router.push('/')
    },
    async UpdateUser() {
      const { data } = UpdateUser({
        user: this.currentUser,
      });
      this.$router.push({
        name: "profile",
        params: {
          username: this.currentUser.username,
        },
      });
    },
  },
};
</script>

<style>
</style>