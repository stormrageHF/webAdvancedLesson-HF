<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link class="nav-link" 
                :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }" 
                exact
                :class="{
                  active: tab === 'your_feed'
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" 
                :to="{
                  name: 'home',
                  query: {
                    tab: 'global_feed'
                  }
                }" 
                exact
                :class="{
                  active: tab === 'global_feed'
                }">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link" 
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag_feed'
                  }
                }" 
                :class="{
                  active: tab === 'tag_feed'
                }">#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>
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
                <span class="date">{{ article.createdAt | date('MMMM DD, YYYY') }}</span>
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
                    name: 'home',
                    query: {
                      page: item,
                      tag: tag,
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
        <!-- 标签 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name:'home',
                  query: {
                    tag: item,
                    tab: item + '_feed'
                  }
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex"

export default {
  name: "HomePage",
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page) || 1;
    const limit = 15;
    const tag = query.tag;
    const tab = query.tab || 'global_feed';
    const loadArticles = store.state.user && tab === 'your_feed' ? 
    getFeedArticles : getArticles
    // promise all 并行处理两个接口
    const [articlesRes, tagsRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: tag
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articlesRes.data;
    const { tags } = tagsRes.data

    articles.forEach(article => article.favoriteDisabled = false)
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab,
    };
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  watchQuery: ["page","tag","tab"],
  methods: {
    onFavorite (article){
      // 禁用按钮点击
      article.favoriteDisabled = true
      if(article.favorited){
        // 取消点赞
        deleteFavorite(article.slug)
        article.favorited = false
        --article.favoritesCount
      }else{
        // 点赞
        addFavorite(article.slug)
        article.favorited = true
        ++article.favoritesCount
      }
      article.favoriteDisabled = false
    }
  }
};
</script>

<style>
</style>