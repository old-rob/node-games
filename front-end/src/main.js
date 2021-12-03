import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import product_data from './product-data.js'
import game_data from './game-data.js'
import article_data from './article-data.js'

Vue.config.productionTip = false;

let data = {
  articles: article_data,
  article_comments: {},
  games: game_data,
  game_comments: {},
  game_ratings: {},
  products: product_data,
  cart: []
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
