<template>
  <div v-if="user" class="event__comments__list__single__user__wrapper">
    <div v-if="user.profile_pic" class="event__comments__list__single__user__wrapper__avatar" :style="{ 'background-image': `url(${user.profile_pic})` }" ></div>
    <div v-else-if="user.username" class="event__comments__list__single__user__wrapper__avatar letter">
      <p v-text="user.username[0]"></p>
    </div>
    <div class="event__comments__list__single__user__wrapper__username" v-if="user.username" v-text="user.username"></div>
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
        this.$store.dispatch('getUserById', this.user_id);
    }
}
</script>