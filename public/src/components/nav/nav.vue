<template>
  <div id="nav" class="reg-nav">
    <div id="nav-bar">
      <div class="logo">
        <a href="/"><img src="/src/assets/logo.png"/></a>
      </div>
      <div id="nav-items">
        <ul>
          <li><a href="/">About</a></li>
          <li><a href="/">Hosts</a></li>
          <li><a href="/">Rates</a></li>
          <li v-if="!loggedIn"><a href="/">Team</a></li>
          <li v-if="loggedIn"><a href="/">Your Stör</a></li>
          <li v-if="admin"><a href="/">Add Host</a></li>
        </ul>
        <div class="nav-action">
          <a v-if="loggedIn" href="">Book Now</a>
          <router-link v-else to="/register">Sign Up</router-link>
          <a v-if="loggedIn" class="sign-out" @click="signOut">Sign Out</a>
          <a v-else class="login" @click="displayLogin">Login</a>
        </div>
        <login-form v-show="showLogin"></login-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Login from "../login/login.vue";
  import config from "../../config";

  export default {
    data(){
      return {
        admin: false
        , showLogin: false
        , loggedIn: !!localStorage.getItem(config.AUTH)
      }
    }
    , methods: {
      signOut(){
        let self = this;

        console.log("hey Thya");

        localStorage.removeItem(config.AUTH);
        self.loggedIn = false;
        self.showLogin = false;
      }

      , displayLogin(){
        const self = this;
        let $loginButton = $(".nav-action .login");
        let $loginForm;

        if(!self.showLogin){
          let top = $loginButton.position().top + $loginButton.height() + 5;
          self.showLogin = true;
          $loginForm = $("#login");

          console.log("form", $loginForm);
          $loginForm.css({top});
        }
        else{
          self.showLogin = false;
        }
      }
    }

    , components: {
      "login-form": Login
    }
  }
</script>

<style>
  #nav{
    z-index: 200;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-out;
  }

  .reg-nav{
    position: absolute;
    background-color: transparent;
    top: 100px;
  }

  .sticky-nav{
    position: fixed;
    background-color: #4992B7;
    top: 0;
  }

  #nav-bar{
    position: relative;
    font-family: Nunito, Quicksand, sans-serif;
    font-size: 0.08em;
    color: white;
    width: 60%;
    height: 80%;
    min-width: 600px;
    margin: auto;
    display: flex;
    align-items: center;
    align-content: center;
  }

  #nav-bar .logo{
    margin-right: auto;
    width: 20%;
    min-width: 50px;
  }

  #nav-items{
    display: flex;
    flex: 1;
    align-items: center;
  }

  #nav-items ul{
    margin: 0;
    list-style-type: none;
    display: flex;
    flex: 0.9;
  }

  #nav-items li{
    text-align: center;
    flex: 1;
  }

  #nav-items ul a{
    padding: 7px 5px;
    border-bottom: solid 3px transparent;
    transition: border-bottom-color 0.2s linear;
    color: inherit;
  }

  #nav-items ul a:hover{
    border-bottom: solid 3px white;
  }

  #nav-bar .logo img{
    width: 70%;
    min-width: 50px;
    max-width: 110px;
  }

  #nav-bar a{
    text-decoration: none;
  }

  .nav-action{
    margin-left: auto;
  }

  .nav-action a{
    border: 2px solid white;
    border-radius: 50px;
    padding: 5px 20px;
    margin-right: 15px;
    color: white;
    transition: background 0.2s linear;
  }

  .nav-action a:last-child{
    margin-right: 0;
  }

  .nav-action a:hover{
    cursor: pointer;
    background: white;
    color: #4992B7;
  }
</style>
