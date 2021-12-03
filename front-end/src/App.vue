<template>
  <div id="app">
    <div id="nav">

      <div class="center-crop bg-dark">
          <div class="card-img-overlay bg-dark opacity-50"></div>
          <img src="https://images.unsplash.com/photo-1592659762303-90081d34b277?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1073&q=80">
          <ul class="nav nav-pills bg-transparent card-img-overlay">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/play">Play</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/shop">Shop</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news">News</router-link>
            </li>
            <li class="nav-item align-self-end ms-auto d-inline-flex">
              <router-link class="nav-link" to="/">Sign in</router-link>
              <router-link class="nav-link" to="/cart">Cart ({{ cart_len }})</router-link>
            </li>
          </ul>

          <h1 class="hero-text">Oldroyd Games</h1>
      </div>

    </div>

    <router-view />

    <footer>
      <div class="text-center p-3">
        Copyright © 2021 Robert Oldroyd.
        <a class="text-dark" href="https://github.com/old-rob/node-games">This Site on GitHub</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  computed: {
    cart_len() {
      return this.$root.$data.cart.length;
    }
  },
}
</script>

<style>
.center-crop {
  height: 300px;
  background-size: cover;
  position: relative;
  white-space: nowrap;
}
.center-crop img {
  object-fit: cover;
  width: 100%;
  height: inherit;
}
.square-image {
  object-fit: cover;
  height: 13rem;
  width: 100%;
}
.contained-image {
  object-fit: cover;
  width: 100%;
  height: inherit;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-size: 7vw;
  font-weight: bold;
}

.price-text {
  color: rgba(204, 0, 0, 0.65);
}


.nav-link {
  color: white;
  font-weight: bold;
}
.nav-link:hover {
  color: green;
  font-weight: bold;
}

</style>
