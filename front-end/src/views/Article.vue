<template>
  <div>
    <nav class="container rounded" aria-label="breadcrumb">
      <ol class="breadcrumb p-3 h4">
        <li class="breadcrumb-item"><router-link to="/news">News</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ article.title }}</li>
      </ol>
    </nav>

    <div class="container">
      <div v-if="this.hasImage" class="top-graphic mb-3">
        <img :src="article.image_path" class="rounded">
      </div>
      <div>
        <small class="text-secondary">{{ date }}</small>
        <h2>{{ article.title }}</h2>
        <p>{{ article.body }}</p>
      </div>
    </div>

    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Article",
  data() {
    return {
      article: {},
      date: null,
      hasImage: false,
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      try {
        let response = await axios.get("/api/news/articles/" + this.$route.params.id);
        this.article = response.data;

        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date(this.article.date);
        let day = date.getDate();
        let month = months[date.getMonth()];
        let year = date.getFullYear();

        this.date = month + " " + day + ", " + year;

        if (this.article.image_path) {
          this.hasImage = true;
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.top-graphic {
  height: 300px;
  background-size: cover;
  position: relative;
  white-space: nowrap;
}
.top-graphic img {
  object-fit: cover;
  object-position: 0% 30%;
  width: 100%;
  height: inherit;
}


</style>
