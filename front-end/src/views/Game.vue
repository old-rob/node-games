<template>
  <div>
    <nav class="container rounded" aria-label="breadcrumb">
      <ol class="breadcrumb p-3 h4">
        <li class="breadcrumb-item"><router-link to="/play">Play</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ game.name }}</li>
      </ol>
    </nav>

    <div class="container">
      <p>I haven't actually figured out the best way to get the games functioning with vue.
        I'm looking into it and should figure it out sometime soon. At least vue makes comments managable.
      </p>
    </div>

    <div class="container">
      <div v-if="this.areComments">
        <h3>Comments</h3>
        <div v-for="comment in this.$root.$data.game_comments[this.game.id]" :key="comment">
          <hr>
          <p><strong>{{comment.author}}</strong></p>
          <p>{{comment.text}}</p>
          <p class="timestamp"><small>{{comment.timestamp}}</small></p>
        </div>
      </div>
      <h3 class="p-2">Add a Comment</h3>
      <div>
        <div class="mb-0 form-floating">
          <input type="text" class="form-control" id="commenter_name" v-model="commenterName" placeholder="Name">
          <label for="commenter_name" class="form-label mb-0">Name</label>
        </div>
        <div class="mb-0 form-floating">
          <textarea type="text" class="form-control" id="commentBox" v-model="newComment" placeholder="Comment" style="height: 100px"></textarea>
          <label for="commentBox" class="form-label mb-0">Comment</label>
        </div>
        <br />
        <button class="btn btn-primary" type="button" v-on:click="addComment()">Comment</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      game: {},
      commenterName: '',
      newComment: '',
      areComments: false,
    }
  },
  created() {
    this.game = this.$root.$data.games.find(game => game.id === parseInt(this.$route.params.id));
    if (this.game.id in this.$root.$data.game_comments) {
      this.areComments = true;
    }
  },
  methods: {
    getDateTime() {
      let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let date = new Date();
      let now = month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes();
      return now
    },
    addComment() {
      let comments = this.$root.$data.game_comments;
      if (!(this.game.id in comments))
        comments[this.game.id] = new Array;
      comments[this.game.id].unshift({
        author: this.commenterName,
        text: this.newComment,
        timestamp: "Posted " + this.getDateTime(),
      });
      this.commenterName = '';
      this.newComment = '';
      this.areComments = true;
    },
    setRating(rating){
      let ratings = this.$root.$data.game_ratings;
      if (!(this.game.id in ratings)) {
        this.set(ratings, this.game.id, {
          sum: 0,
          total: 0
        });
      }
      ratings[this.game.id].sum += rating;
      ratings[this.game.id].total += 1;
    },
  }
};
</script>
