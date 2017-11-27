<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div id="content" class="full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Nav from "./components/nav/nav.vue";

  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      "nav-bar": Nav
    }
  }
</script>

<style>
  html{
    font-size: 90%;
  }

  html, body{
    height: 100%;
    margin: 0;
  }

  #app {
    height: 100%;
    width: 100%;
    position: relative;
  }

  #content{
    height: 100%;
  }

  .full{
    width: 100%;
    height: 100%;
  }
</style>
