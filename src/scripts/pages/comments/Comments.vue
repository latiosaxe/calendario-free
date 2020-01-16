<template>
  <div>
    <div class="event__comments">
      <form v-if="show_new && user" @submit.prevent="sendComment()">
        <div class="columns">
          <div class="column" v-if="user.username">
            <div class="field">
              <label class="label">Agrega un comentario</label>
              <div class="control">
                <textarea v-model="newComment.message" class="input"  placeholder="Recuerda mostrar respeto en tu comentario..." required="required" minlength="10"></textarea>
              </div>
            </div>
          </div>
          <div class="column has-text-centered" v-else>
            <p>Para poder realizar comentarios es necesario configurar tu nombre de usuario.</p>
            <p><router-link class="button is-gray" to="/usuario"><span>Da click aquí</span></router-link></p>
          </div>
        </div>
        <div class="columns">
          <div class="column has-text-right">
            <button class="button is-warning">Publicar comentario</button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="comments" class="event__comments__list">
      <p><strong class="has-text-grey">Comentarios:</strong></p>
      <div v-for="comment in comments" :key="comment.id" class="event__comments__list__single">
        <div class="event__comments__list__single__user">
          <Avatar :user_id="comment[comment.id].user_id" />
        </div>
        <div class="event__comments__list__single__comment">
          {{ comment[comment.id].message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";

export default {
  name: 'Comments',
  props: ['slug', 'user'],
  components:{
    Avatar
  },
  computed: {
    comments(){
      return this.$store.getters.setEventComments;
    }
  },
  data(){
    return {
      show_new: true,
      newComment: {
        message: ''
      }
    }
  },
  mounted(){
    this.$store.dispatch('eventComments', this.slug);
  },
  methods: {
    sendComment(){
      console.log("sendComment", this.newComment.message);
      this.newComment.user_id = this.user.id;
      this.newComment.event = this.slug;
      this.newComment.points = 0;
      // this.newComment.postedAt = new Date();
      this.$store.dispatch('createComment', this.newComment)
      this.show_new = false;
    }
  }
}
</script>

<style>

</style>