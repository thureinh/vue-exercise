<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div>
    <NavBar/>
  </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components:{
    NavBar
  },
  mounted(){
  },
  computed: {
    cartCount() {
      this.$store.dispatch('getData')
      return this.$store.getters.count
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
