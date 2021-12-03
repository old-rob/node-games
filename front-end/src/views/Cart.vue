<template>
  <div>
    <div class="products">
      <div v-if="cartIsEmpty">
        <div class="container mt-3">
          <h2>Your cart is empty</h2>
          <p>Looking for something to put in it? Try <router-link to="/shop">Shop</router-link></p>
        </div>
      </div>
      <div v-else>
        <div class="container" v-for="product in uniqueItems" :key="product._id">

          <div class="card mt-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-sm-4">
                <img :src="product.image_path" class="img-fluid square-image rounded-start" :alt="product.description">
              </div>
              <div class="col-sm-8">
                <div class="card-body">
                  <h5 class="card-title"><router-link :to="'/shop/product/' + product._id" class="text-dark text-decoration-none">{{ product.name }}</router-link></h5>
                  <p class="card-text">Buying {{ numberInCart(product._id) }} at ${{ product.price }} each for a subtotal of ${{ totalCost(product) }}</p>
                  <div class="btn-group" role="group">
                    <button class="btn btn-secondary btn-sm" type="button" v-on:click="addToCart(product)"> + </button>
                    <button class="btn btn-secondary btn-sm" type="button" v-on:click="removeFromCart(product)"> - </button>
                  </div>
                  <button class="btn btn-secondary btn-sm m-2" type="button" v-on:click="removeAll(product)">Remove all</button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="container mt-3">
          <h2>Cart total: ${{ cartTotalCost }}</h2>
          <div class="d-grid gap-2">
            <button class="btn btn-primary btn-lg m-2" type="button">Checkout</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  computed: {
    uniqueItems() {
      let cart = this.$root.$data.cart;
      let unique = cart.filter((v, i, a) => a.indexOf(v) === i);
      unique.sort((a, b) => a.name > b.name && 1 || -1)
      return unique;
    },
    cartIsEmpty() {
      let cart = this.$root.$data.cart;
      if (cart.length === 0) {
        return true;
      }
      return false;
    },
    cartTotalCost() {
      let total = 0;
      for (let item of this.uniqueItems) {
        let cost = this.totalCost(item)
        total += cost
      }
      total = (Math.round(total * 100 + Number.EPSILON ) / 100).toFixed(2);
      return total
    }
  },
  methods: {
    addToCart(product) {
      this.$root.$data.cart.push(product)
    },
    removeFromCart(product) {
      let cart = this.$root.$data.cart;
      cart.splice(cart.indexOf(product), 1)
    },
    removeAll(product) {
      let cart = this.$root.$data.cart;
      while(cart.indexOf(product) >= 0) {
        this.removeFromCart(product);
      }
    },
    numberInCart(id) {
      let cart = this.$root.$data.cart;
      return cart.filter(x => x.id === id).length;
    },
    totalCost(product) {
      let n = this.numberInCart(product.id)
      let cost = product.price
      let totalCost = n * cost;
      totalCost = (Math.round(totalCost * 100 + Number.EPSILON ) / 100).toFixed(2);
      return totalCost;
    }
  }
};
</script>
