<template>
  <div>
    <nav class="container rounded" aria-label="breadcrumb">
      <ol class="breadcrumb p-3 h4">
        <li class="breadcrumb-item"><router-link to="/shop">Shop</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
      </ol>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-md">
          <img class="img-fluid contained-image rounded shadow" :src="product.image_path">
        </div>
        <div class="col-md p-3 rounded text-end">
          <h1>{{ product.name }}</h1>
          <h2 class="price-text">${{ (Math.round(product.price * 100 + Number.EPSILON ) / 100).toFixed(2) }}</h2>
          <hr>
          <p class="text-start">{{ product.brief }}</p>
          <p class="text-start">{{ product.description }}</p>

          <div class="row">
            <div class="col-3">

              <div class="mb-0 form-floating">
                <input type="number" class="form-control" id="qtySelect" value="1" min="1" max="1000" v-model="quantity">
                <label for="qtySelect" class="form-label mb-0">Quantity</label>
              </div>

            </div>
            <div class="d-grid gap-2 col-9">
              <button class="btn btn-primary" type="button" v-on:click="addToCart(quantity, product)">Add To Cart</button>
            </div>
          </div>
          <div class="mt-3 ms-auto">
            <router-link to="/cart" class="btn btn-secondary">View Cart</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Product',
  data() {
    return {
      quantity: 1,
      product: {
        name: "Loading Product",
        brief: "Fetching product data from server"
      },
    }
  },
  created() {
    this.getProduct();
  },
  watch: {
    quantity: function () {
      if (this.quantity > 1000) {
        this.quantity = 1000;
      }
      if (this.quantity < 1) {
        this.quantity = 1;
      }
    }
  },
  methods: {
    async getProduct() {
      try {
        let response = await axios.get("/api/shop/products/" + this.$route.params.id);
        this.product = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    addToCart(qty, product) {
      for (let i = 0; i < qty; i++) {
        this.$root.$data.cart.push(product);
      }
    }
  }
}
</script>
