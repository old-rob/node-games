<template>
  <div>

    <div class="container mt-4">
      <div class="masonry-gallery">

          <div class="masonry-item" v-for="article in articles" :key="article._id">
            <div class="card">
              <img class="card-img-top" :src="article.image_path">
              <div class="card-body">
                <h5 class="card-title text-center"><router-link :to="'/news/article/' + article._id" class="stretched-link text-dark text-decoration-none">{{ article.title }}</router-link></h5>
                <p class="card-text">{{ preview(article) }} <router-link :to="'/news/article/' + article._id">(see more)</router-link></p>
                <p class="card-text text-end"><small class="text-muted">Posted {{ daysSincePosted(article) }}</small></p>
              </div>
            </div>
          </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "News",
  data() {
    return {
      articles: {},
    }
  },
  created() {
    this.getArticles();
  },
  /*computed: {
    articles() {
      return this.$root.$data.articles
      //Later I may want to add search functions to the news page
      //return this.$root.$data.articles.filter(article => article.name.toLowerCase().search(this.filterText.toLowerCase()) >= 0);
    },
  },*/
  methods: {
    async getArticles() {
      try {
        let response = await axios.get("/api/news/articles");
        this.articles = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    preview(article) {
      let str = article.body.substr(0, 100);
      let wordIndex = str.lastIndexOf(" ");
      return str.substr(0, wordIndex) + '...'
    },
    daysSincePosted(article) {
      let date = new Date(article.date).getTime();
      let difference = Date.now() - date;
      let days_since =  Math.floor(difference / (1000 * 3600 * 24));
      if (days_since < 1) {
        return "Today"
      } else if (days_since == 1) {
        return "Yesterday"
      } else {
        return days_since + " days ago";
      }
    },
  },
};
</script>

<style scoped>
/* Masonry */
.masonry-gallery *,
.masonry-gallery *:before,
.masonry-gallery *:after {
  box-sizing: inherit;
}

.masonry-gallery {
  column-gap: 1.5em;
}

.masonry-item {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.masonry-item img {
  width: 100%;
}

/* Masonry on medium/large-sized screens */
@media only screen and (min-width: 992px) {
  .masonry-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 991px) and (min-width: 540px) {
  .masonry-gallery {
    column-count: 2;
  }
}
</style>
