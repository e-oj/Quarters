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
    position: relative;
  }

  #content{
    height: 100%;
    font-family: 'Open Sans', sans-serif;
  }

  .full{
    height: 100%;
  }

  .bolder{
    font-weight: 900;
  }

  .blue-text{
    color: #6BCDFD;
  }

  .fredoka-font{
    font-family: 'Fredoka One', cursive;
  }

  input::placeholder{
    color: white;
    opacity: 0.7;
  }

  .button{
    min-width: 100px;
    min-height: 35px;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 4px;
    color: white;
    transition: all 0.2s linear;
    margin-left: 15px;
    font-size: 0.8em;
  }

  .button:hover{
    color: #4992B7;
    background-color: white;
    cursor: pointer;
  }

  .flex{
    display: flex !important;
  }

  .ghost{
    display: none !important;
  }
</style>
