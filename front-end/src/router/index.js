import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Play from "../views/Play.vue";
import Game from "../views/Game.vue";
import Shop from "../views/Shop.vue";
import Product from "../views/Product.vue";
import Cart from "../views/Cart.vue";
import News from "../views/News.vue";
import Article from "../views/Article.vue";
import NewsManager from "../views/NewsManager.vue";
import ShopManager from "../views/ShopManager.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/play",
    name: "Play",
    component: Play,
  },
  {
    path: "/play/:id",
    name: "game",
    component: Game,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/shop/product/:id",
    name: "product",
    component: Product,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/news",
    name: "News",
    component: News,
  },
  {
    path: "/news/article/:id",
    name: "article",
    component: Article,
  },
  {
    path: "/news/manage",
    name: "News Manager",
    component: NewsManager,
  },
  {
    path: "/shop/manage",
    name: "Shop Manager",
    component: ShopManager,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
