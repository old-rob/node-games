<template>
  <div class="home">


    <div class="container pt-4">
      <h2>Welcome to Oldroyd Games!</h2>
      <hr>
    </div>


    <div class="container d-flex justify-content-center flex-wrap">

      <!-- Card 1 -->
      <div class="card mb-3 w-75">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://images.unsplash.com/photo-1526392269816-39d8ed656494?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1414&q=80" class="img-fluid rounded square-image"
              alt="Well images can't always load can they?">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title"><router-link to="/play" class="stretched-link link-dark text-decoration-none">Browser Games</router-link></h5>
              <p class="card-text">Check out our freshest web projects.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="card mb-3 w-75">
        <div class="row g-0">
          <div class="col-md-4 order-md-2">
            <img src="https://images.unsplash.com/photo-1580584126903-c17d41830450?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1039&q=80" class="img-fluid rounded square-image"
              alt="Well images can't always load can they?">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title"><router-link to="/shop" class="stretched-link link-dark text-decoration-none">Shop</router-link></h5>
              <p class="card-text">Get your hands on all the board and card games we've published, or support the creators of your favorite games with some merch.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="card mb-3 w-75">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://images.unsplash.com/photo-1617839625591-e5a789593135?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80" class="img-fluid rounded square-image"
              alt="Well images can't always load can they?">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title"><router-link to="/news" class="stretched-link link-dark text-decoration-none">News</router-link></h5>
              <p class="card-text">See what the future holds for Oldroyd Games, along with all the latest announcements.</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="container pt-4">
      <h2>About</h2>
      <hr>
      <h5>Who are we?</h5>
      <p>Oldroyd Games was founded by John Oldroyd as an independant entertainment company and medium to publish new creative games.
        We are focused on creating games that emphasize bringing people together, adventure, and having fun!
        Because we are a very small team and we all have other jobs, we aren't terribly concerned with making the most comercially viable product.
        We just like these games, and hope you will too.</p>
      <p>John says: "My brothers and I have been designing board games since we were little.
        I graduated college with a degree in Neuroscience, and am currently attending law school.
        I have a wonderful wife and two children, and they do a lot to help me in the game-design process."</p>
    </div>



    <div class="container d-flex justify-content-center">
      <div class="card m-1" style="width: 18rem;">
        <img src="https://ksr-ugc.imgix.net/assets/020/141/114/feb50a7359ff2813f5d9122ce38ccf83_original.JPG?ixlib=rb-4.0.2&w=200&h=200&fit=crop&v=1548211245&auto=format&frame=1&q=92&s=60ac363d4160ff1a27413cdbe7cb5472" class="card-img-top"
          alt="CEO John">
        <div class="card-body">
          <h5 class="card-title">John Oldroyd</h5>
          <p class="card-text">John is the founder, manager, content creator, writer, legal advisor, inventor, and head figurehead of Oldroyd Games.</p>
        </div>
      </div>
      <div class="card m-1" style="width: 18rem;">
        <img src="https://avatars.githubusercontent.com/u/42311776?s=400&u=2d1f633a8705bf5636484a92580e6339a9745abe&v=4" class="card-img-top" alt="Ya boi Rob">
        <div class="card-body">
          <h5 class="card-title">Robert Oldroyd</h5>
          <p class="card-text">Robert is the web developer, head headmaster, programmer, co-writer, and oftentimes playtester for many of the projects here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
  },
};
</script>
