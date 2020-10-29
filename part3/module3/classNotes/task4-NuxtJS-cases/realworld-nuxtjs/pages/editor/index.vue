<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keyup.enter.prevent="addTag(currentTag)"
                  v-model="currentTag"
                />
                <div class="tag-list">
                  <span
                    ng-repeat="tag in $ctrl.article.tagList"
                    class="tag-default tag-pill ng-binding ng-scope"
                    v-for="tag in article.tagList"
                    :key="tag"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";

export default {
  middleware: "authenticated",
  name: "EditorPage",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      currentTag: "",
      errors: {},
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await createArticle(this.article);
        // console.log(data);
        this.$router.push({
          name: "article",
          params: {
            slug: data.article.slug,
          },
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    addTag(tag) {
      this.article.tagList.push(tag);
      this.currentTag = "";
    },
    removeTag(tag) {
      const idx = this.article.tagList.indexOf(tag);
      idx >= 0 && this.article.tagList.splice(idx, 1);
    },
  },
};
</script>

<style>
</style>