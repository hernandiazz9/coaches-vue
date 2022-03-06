<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './component/layout/TheHeader.vue';
export default {
  components: { TheHeader },
  created() {
    this.$store.dispatch('tryLogin');
  },
  computed:{
    didAutoLogout(){
      return this.$store.getters.didAutoLogout
    }
  },
  watch:{
    didAutoLogout(currV, oldV){
      if(currV && currV !== oldV){
        this.$router.replace('/')
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
* {
  box-sizing: border-box;
}
html {
  font-family: 'Roboto', sans-serif;
}
body {
  margin: 0;
}
</style>
