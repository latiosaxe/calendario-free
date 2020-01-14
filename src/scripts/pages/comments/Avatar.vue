<template>
  <div class="event__comments__list__single__user__wrapper">
    <div v-if="user.profile_pic" class="event__comments__list__single__user__wrapper__avatar" :style="{ 'background-image': `url(${user.profile_pic})` }" ></div>
    <div class="event__comments__list__single__user__wrapper__username">
      {{ user.username }}
    </div>
  </div>
</template> 

<script>
export default {
    name: 'Avatar',
    props: ['user_id'],
    computed: {
      user(){
        return this.$store.getters.getUserById(this.user_id);
      }
    },
    mounted(){
        console.log(this.user_id);
        this.$store.dispatch('getUserById', this.user_id);
    }
}
</script>