<template>
  <div>

    <div class="container pt-4">
      <h2>Board and Card Games</h2>
      <hr>
    </div>
    <div class="container d-flex flex-wrap justify-content-center p-2">

      <div class="card m-2" style="width: 15rem;" v-for="product in board_games" :key="product._id">
        <img class="card-img-top square-image" :src="product.image_path">
        <div class="card-body">
          <h5 class="card-title"><router-link :to="'/shop/product/' + product._id" class="stretched-link text-dark text-decoration-none">{{ product.name }}</router-link></h5>
          <h6 class="price-text">${{ (Math.round(product.price * 100 + Number.EPSILON ) / 100).toFixed(2) }}</h6>
          <p class="card-text">{{ product.brief }}</p>
        </div>
      </div>

    </div>


    <div class="container">
      <h2>Merch</h2>
      <hr>
    </div>

    <div class="container d-flex flex-wrap justify-content-center p-2">

      <div class="card m-2" style="width: 15rem;" v-for="product in merch" :key="product._id">
        <img class="card-img-top square-image" :src="product.image_path">
        <div class="card-body">
          <h5 class="card-title"><router-link :to="'/shop/product/' + product._id" class="stretched-link text-dark text-decoration-none">{{ product.name }}</router-link></h5>
          <h6 class="price-text">${{ (Math.round(product.price * 100 + Number.EPSILON ) / 100).toFixed(2) }}</h6>
          <p class="card-text">{{ product.brief }}</p>
        </div>
      </div>

    </div>


    <div class="container pt-4">
      <h4>Looking for something specific?</h4>
      <div class="form-floating">
        <input type="text" v-model="filterText" class="form-control" id="filterProducts" placeholder="Search">
        <label for="filterProducts">Filter Product Title</label>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Shop",
  data() {
    return {
      products: [],
      filterText: '',
    }
  },
  created() {
    this.getProducts();
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.name.toLowerCase().search(this.filterText.toLowerCase()) >= 0);
    },
    board_games() {
      return this.filteredProducts.filter(product => product.type === "Card" || product.type === "Board");
    },
    merch() {
      return this.filteredProducts.filter(product => product.type === "Merch");
    },
  },
  methods: {
    async getProducts() {
      try {
        let response = await axios.get("/api/shop/products");
        this.products = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
