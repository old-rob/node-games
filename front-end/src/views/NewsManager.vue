<template>
  <div>
    <nav class="container rounded" aria-label="breadcrumb">
      <ol class="breadcrumb p-3 h4">
        <li class="breadcrumb-item"><router-link to="/news">News</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Administration</li>
      </ol>
    </nav>

    <div class="container">
      <div class="row">

        <div class="col-md-3" id="article-selector">
          <button class="btn btn-primary mb-3" @click="createArticle">Write a new article</button>
          <h2>Edit an Article</h2>

          <div class="list-group" v-for="article in suggestions" :key="article._id">

            <button type="button" class="list-group-item list-group-item-action active" v-if="current_article && article._id === current_article._id" aria-current="true">
              {{ article.title }}
            </button>

            <button type="button" class="list-group-item list-group-item-action" v-else @click="selectArticle(article)">
              <div class="d-flex w-100 justify-content-between">
                <h6 class="pe-2">{{ article.title }}</h6>
                <small class="text-secondary">{{ getArticleDate(article) }}</small>
              </div>
            </button>

          </div>

          <div class="my-3">
            <label for="article-search" class="form-label">Search for an Article</label>
            <input v-model="searchTitle" type="text" class="form-control" id="article-search">
          </div>
        </div>

        <div class="container col" id="article-editor" v-if="current_article">
          <div class="mb-3">
            <label for="article-title" class="form-label">Article Title</label>
            <input v-model="current_article.title" type="text" class="form-control" id="article-title">
          </div>
          <div class="mb-3">
            <div class="mb-3">
              <label class="form-label" for="article-image">Add Image Link (Preferred)</label>
              <input v-model="current_article.image_path" type="text" class="form-control" id="article-image"/>
              <label class="form-label" for="article-image">Upload Image</label>
              <input type="file" class="form-control" id="article-image" @change="fileChanged"/>
            </div>
            <div class="top-graphic mb-5" v-if="current_article.image_path">
              <p>Article Image</p>
              <img :src="current_article.image_path"/>
            </div>
          </div>
          <div class="mb-3">
            <label for="article-body" class="form-label">Article Body</label>
            <textarea v-model="current_article.body" class="form-control" id="article-body" rows="10"></textarea>
          </div>

          <div v-if="current_article.local_only">
            <button class="btn btn-primary mx-3" @click="saveArticle(current_article)">Post</button>
            <button class="btn btn-primary" @click="deleteArticle(current_article)">Delete</button>
          </div>
          <div v-else>
            <button class="btn btn-primary mx-3" @click="saveArticle(current_article)">Save</button>
            <button class="btn btn-primary" @click="deleteArticle(current_article)">Delete</button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      current_article: null,
      file: null,
      articles: [],
      searchTitle: "",
    };
  },
  created() {
    this.getArticles();
  },
  computed: {
    suggestions() {
      let articles = this.articles.filter(item => item.title.toLowerCase().includes(this.searchTitle.toLowerCase()));
      articles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return articles;
    },
  },
  methods: {
    createArticle() {
      let new_article = {
        title: "Article Title",
        body: "Article Body",
        image_path: "",
        author: "RO",
        date: Date.now(),
        local_only: true,
      }
      this.articles.unshift(new_article)
      this.selectArticle(new_article)
    },
    selectArticle(item) {
      this.searchTitle = "";
      this.current_article = item;
    },
    getArticleDate(article) {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let date = new Date(article.date);
      let day = date.getDate();
      let month = months[date.getMonth()];
      let year = date.getFullYear();

      return month + " " + day + ", " + year;
    },
    async fileChanged(event) {
      this.file = event.target.files[0]
      const formData = new FormData();
      formData.append('photo', this.file, this.file.name)
      let photo_req = await axios.post('/api/photos', formData);
      this.current_article.image_path = photo_req.data.path;
    },
    async getArticles() {
      try {
        this.current_article = null;
        let response = await axios.get("/api/news/articles");
        this.articles = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async saveArticle(item) {
      // If item is not in database, post it
      if (item.local_only) {
        try {
          await axios.post('/api/news/articles', {
            title: this.current_article.title,
            body: this.current_article.body,
            image_path: this.current_article.image_path,
            //author: username of person posting
            date: this.current_article.date,
          });
          this.getArticles();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await axios.put("/api/news/articles/" + item._id, {
            title: this.current_article.title,
            body: this.current_article.body,
            image_path: this.current_article.image_path,
          });
          this.current_article = null;
          this.getArticles();
          return true;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteArticle(item) {
      if (item.local_only) {
        this.articles.shift(0, 1);
        this.getArticles();
      } else {
        try {
          await axios.delete("/api/news/articles/" + item._id);
          this.current_article = null;
          this.getArticles();
          return true;
        } catch (error) {
          console.log(error);
        }
      }
    },
  }
}
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
