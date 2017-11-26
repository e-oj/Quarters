<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
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
  #app {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .content{
    position: relative;
    top: 80px;
  }
</style>
