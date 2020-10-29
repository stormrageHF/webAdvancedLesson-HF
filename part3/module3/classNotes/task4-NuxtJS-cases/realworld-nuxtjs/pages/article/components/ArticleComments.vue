<template>
  <div>
    <form class="card comment-form" @submit.prevent="postComment">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentBody"
          required
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          >{{ comment.author.username }}</nuxt-link
        >
        <span class="date-posted">{{
          comment.createdAt | date("MMMM DD, YYYY")
        }}</span>
        <span class="mod-options">
          <i class="ion-trash-a" @click="deleteCb(comment)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments, deleteComment } from "@/api/article";
import { mapState } from "vuex";

export default {
  middleware: "authenticated",
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      commentBody: "",
    };
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments;
  },
  methods: {
    async postComment() {
      const { data } = await addComments(this.article.slug, {
        comment: {
          body: this.commentBody,
        },
      });
      this.comments.unshift(data.comment);
      this.commentBody = "";
    },
    async deleteCb(comment){
      await deleteComment(this.article.slug, comment.id)
      const idx = this.comments.indexOf(comment)
      if(idx >=0 ){
        this.comments.splice(idx,1)
      }
    }
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>