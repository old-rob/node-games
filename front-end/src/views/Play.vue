<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="container pt-4">
          <h2>Games</h2>
          <hr>
        </div>
        <div class="container d-flex flex-wrap justify-content-center p-2">

          <div class="card m-2" style="width: 15rem;" v-for="game in games" :key="game.id">
            <img class="card-img-top square-image" :src="game.thumbnail">
            <div class="card-body">
              <h5 class="card-title"><router-link :to="'/play/' + game.id" class="stretched-link link-dark text-decoration-none">{{ game.name }}</router-link></h5>
              <p class="card-text">{{ game.description }}</p>
              <div>
                <p><span class="badge bg-secondary m-1" v-for="genre in game.genres" :key="genre">{{ genre }}</span></p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="container pt-4">
      <h4>Find the perfect game!</h4>
      <div>
        <div class="form-floating col">
          <input type="text" v-model="nameFilterText" class="form-control" id="nameFilter" placeholder="Search">
          <label for="nameFilter">Filter by Title</label>
        </div>
        <div class="form-floating col">
          <input type="text" v-model="genreFilterText" class="form-control" id="genreFilter" placeholder="Search">
          <label for="genreFilter">Filter by Genre</label>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "Play",
  data() {
    return {
      nameFilterText: '',
      genreFilterText: '',
    }
  },
  computed: {
    games() {
      let games = this.$root.$data.games;
      games = games.filter(game => game.name.toLowerCase().search(this.nameFilterText.toLowerCase()) >= 0);
      games = games.filter(game => {
        let genres = "";
        for (let cat of game.genres) {
          genres += cat;
        }
        return genres.toLowerCase().search(this.genreFilterText.toLowerCase()) >= 0
      });
      return games;
    },
  }
};
</script>
