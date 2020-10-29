<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="fllowOrSetting"
            >
              <template v-if="isCurrentUser">
                <i class="ion-gear-a"></i>
                &nbsp; Edit Profile Settings
              </template>
              <template v-else>
                <i class="ion-plus-round"></i>
                &nbsp; {{ profile.following ? 'Unfollow':'Follow' }} {{ profile.username }}
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'my-articles',
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my-articles',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'favorited-articles',
                  }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorited-articles',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <!-- <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div> -->
          <!-- 内容 -->
          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | date("MMMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in article.tagList"
                  :key="tag"
                >
                  {{ tag }}
                </li>
              </ul>
            </nuxt-link>
          </div>

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for="item in totalPage"
                :key="item"
                :class="{
                  active: item === page,
                }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'profile',
                    query: {
                      page: item,
                      tab: tab,
                    },
                  }"
                >
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, addFavorite, deleteFavorite } from "@/api/article";
import { mapState } from "vuex";
import { getProfile, FollowUser, UnfollowUser } from "@/api/profile";

export default {
  middleware: "authenticated",
  name: "ProfilePage",
  async asyncData({ params, store, query }) {
    console.log(query);
    console.log(params);
    const isCurrentUser = store.state.user.username === params.username;
    const page = Number.parseInt(query.page) || 1;
    const limit = 5;
    const tab = query.tab || "my-articles";
    const obj = {
      limit,
      offset: (page - 1) * limit,
    };
    tab === "my-articles"
      ? Object.assign(obj, {
          author: params.username,
        })
      : Object.assign(obj, {
          favorited: params.username,
        });
    // promise all 并行处理两个接口
    const [articlesRes, profileRes] = await Promise.all([
      getArticles(obj),
      getProfile(params.username),
    ]);
    const { articles, articlesCount } = articlesRes.data;
    const { profile } = profileRes.data;

    articles.forEach((article) => (article.favoriteDisabled = false));
    return {
      profile,
      articles,
      articlesCount,
      limit,
      page,
      tab,
      isCurrentUser,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  watchQuery: ["page", "tab"],
  methods: {
    onFavorite(article) {
      // 禁用按钮点击
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        deleteFavorite(article.slug);
        article.favorited = false;
        --article.favoritesCount;
      } else {
        // 点赞
        addFavorite(article.slug);
        article.favorited = true;
        ++article.favoritesCount;
      }
      article.favoriteDisabled = false;
    },
    fllowOrSetting() {
      if (this.isCurrentUser) {
        this.$router.push("/settings");
      } else {
        if(this.profile.following){
          UnfollowUser(this.profile.username)
          this.profile.following = false
        }else{
          FollowUser(this.profile.username)
          this.profile.following = true
        }
      }
    },
  },
};
</script>

<style>
</style>