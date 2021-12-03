<template>
  <div>
    <nav class="container rounded" aria-label="breadcrumb">
      <ol class="breadcrumb p-3 h4">
        <li class="breadcrumb-item"><router-link to="/shop">Shop</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Administration</li>
      </ol>
    </nav>

    <div class="container">
      <div class="row">

        <div class="col-md-3" id="product-selector">
          <button class="btn btn-primary mb-3" @click="createProduct">Create a new product</button>
          <h2>Edit a Product</h2>

          <div class="list-group" v-for="product in filteredProducts" :key="product._id">

            <button type="button" class="list-group-item list-group-item-action active" v-if="current_product && product._id === current_product._id" aria-current="true">
              <div class="d-flex w-100 justify-content-between">
                {{ product.name }}
                <span class="badge bg-secondary align-self-center">{{ product.type }}</span>
              </div>
            </button>

            <button type="button" class="list-group-item list-group-item-action" v-else @click="selectProduct(product)">
              <div class="d-flex w-100 justify-content-between">
                {{ product.name }}
                <span class="badge bg-secondary align-self-center">{{ product.type }}</span>
              </div>
            </button>

          </div>

          <div class="my-3">
            <label for="product-search" class="form-label">Search for a Product</label>
            <input v-model="searchName" type="text" class="form-control" id="product-search">
          </div>
        </div>

        <div class="container col" id="product-editor" v-if="current_product">
          <div class="mb-3">
            <label for="product-name" class="form-label">Product Name</label>
            <input v-model="current_product.name" type="text" class="form-control" id="product-name">
          </div>

          <div class="mb-3">
            <label for="product-brief" class="form-label">Product Brief</label>
            <input v-model="current_product.brief" type="text" class="form-control" id="product-brief">
          </div>

          <div class="mb-3">
            <label for="product-description" class="form-label">Product Description</label>
            <textarea v-model="current_product.description" class="form-control" id="product-description" rows="5"></textarea>
          </div>

          <div class="mb-3">
            <label for="product-type" class="form-label">Product Type</label>
            <select v-model="current_product.type" class="form-select" aria-label="Select product type" id="product-type">
              <option selected>Select Product Type</option>
              <option value="Card">Card Game</option>
              <option value="Board">Board Game</option>
              <option value="Merch">Merch</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="product-price" class="form-label">Price</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input v-model="current_product.price" type="number" class="form-control" id="product-price" min="0" max="100000">
            </div>
          </div>

          <div class="mb-3">
            <div class="mb-3">
              <label class="form-label" for="product-image">Add Image Link (Preferred)</label>
              <input v-model="current_product.image_path" type="text" class="form-control" id="product-image"/>
              <label class="form-label" for="product-image">Upload Image</label>
              <input type="file" class="form-control" id="product-image" @change="fileChanged"/>
            </div>
            <div class="top-graphic mb-5" v-if="current_product.image_path">
              <p>Product Image</p>
              <img class="square-image" :src="current_product.image_path"/>
            </div>
          </div>

          <div v-if="current_product.local_only">
            <button class="btn btn-primary mx-3" @click="saveProduct(current_product)">Post</button>
            <button class="btn btn-primary" @click="deleteProduct(current_product)">Delete</button>
          </div>
          <div v-else>
            <button class="btn btn-primary mx-3" @click="saveProduct(current_product)">Save</button>
            <button class="btn btn-primary" @click="deleteProduct(current_product)">Delete</button>
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
      current_product: null,
      file: null,
      products: [],
      searchName: "",
    };
  },
  created() {
    this.getProducts();
  },
  computed: {
    filteredProducts() {
      let products = this.products.filter(item => item.name.toLowerCase().includes(this.searchName.toLowerCase()));
      // I DON'T EVEN THINK THIS WORKS
      products = products.sort((a, b) => a._id > b._id);
      return products;
    },
  },
  methods: {
    createProduct() {
      let new_product = {
        name: "New Product",
        brief: "",
        description: "",
        type: "",
        price: "10.00",
        image_path: "",
        local_only: true,
      }
      this.products.unshift(new_product)
      this.selectProduct(new_product)
    },
    selectProduct(item) {
      this.searchName = "";
      this.current_product = item;
    },
    async fileChanged(event) {
      this.file = event.target.files[0]
      const formData = new FormData();
      formData.append('photo', this.file, this.file.name)
      let photo_req = await axios.post('/api/photos', formData);
      this.current_product.image_path = photo_req.data.path;
    },
    async getProducts() {
      try {
        this.current_product = null;
        let response = await axios.get("/api/shop/products");
        this.products = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async saveProduct(item) {
      // If item is not in database, post it
      if (item.local_only) {
        try {
          await axios.post('/api/shop/products', {
            name: this.current_product.name,
            brief: this.current_product.brief,
            description: this.current_product.description,
            type: this.current_product.type,
            price: this.current_product.price,
            image_path: this.current_product.image_path,
          });
          this.getProducts();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await axios.put("/api/shop/products/" + item._id, {
            name: this.current_product.name,
            brief: this.current_product.brief,
            description: this.current_product.description,
            type: this.current_product.type,
            price: this.current_product.price,
            image_path: this.current_product.image_path,
          });
          this.current_product = null;
          this.getProducts();
          return true;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteProduct(item) {
      if (item.local_only) {
        this.products.shift(0, 1);
        this.getProducts();
      } else {
        try {
          await axios.delete("/api/shop/products/" + item._id);
          this.current_product = null;
          this.getProducts();
          return true;
        } catch (error) {
          console.log(error);
        }
      }
    },
  }
}
</script>
