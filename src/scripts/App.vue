<template>
    <div>
      <HeaderBar></HeaderBar>
      <notifications group="foo" position="bottom right"/>
      <div class="site__content">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import Footer from './components/Footer.vue'

export default {
  components:{
    HeaderBar,
    Footer
  },
   data() {
    return {
    }
  },
  mounted() {
  }
}
</script>

<style>

</style>