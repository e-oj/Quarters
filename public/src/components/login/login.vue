<template>
  <div id="login">
    <form @submit.prevent="login" >
      <div class="fields">
        <div>
          <label for="login-username"></label>
          <input id="login-username" v-model="alias" type="text" placeholder="Username"/>
        </div>

        <div>
          <label for="login-password"></label>
          <input id="login-password" v-model="password" type="password" placeholder="Password"/>
        </div>
      </div>

      <button type="submit" class="button">Login</button>

      <p v-if="errMsg">{{errMsg}}</p>
    </form>
  </div>
</template>

<script>
  import Vue from "vue"
  import config from "../../config";

  export default {
    data(){
      return {
        alias: ""
        , password: ""
        , errMsg: ""
      }
    }
    , methods: {
      login: async function(){
        let self = this;
        let {alias, password} = self;

        try{
          let credentials = {alias, password};
          let loginRoute = `${config.BASE_URL}/api/u/auth/`;
          let res = await self.$http.post(loginRoute, credentials);

          console.log(res);

          self.loggedIn(res);
        }
        catch(err){
          self.errMsg = "Invalid Credentials";
          console.log(err);
        }
      }
      , loggedIn(res){
        let self = this;
        let {token, user} = res.body.result;

        localStorage.setItem(config.AUTH, token);
        localStorage.setItem(config.ADMIN, user.admin);

        self.$parent.loggedIn =  !!localStorage.getItem("auth");
        self.$parent.showLogin = false;
        location.reload();
      }
    }
  }
</script>

<style>
  #login{
    position: absolute;
    right: 0;
    width: 300px;
    height: 230px;
    background-color: #35667F;
    display: flex;
    transition: opacity 0.2s linear;
    flex-direction: column;
  }

  #login form{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  #login form .fields{
    flex: 3;
    width: 85%;
    max-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
  }

  #login div{
    width: 100%;
    position: relative;
    margin: 0 auto;
  }

  #login input{
    background-color: transparent;
    color: white;
    width: 100%;
    height: 70%;
    font-size: 1.2em;
    border: none;
    border-bottom: solid 2px white;
    margin: 0;
    padding: 0;
  }

  #login input::placeholder{
    opacity: 0.5;
    transition: all 0.2s linear;
  }

  #login input:focus::placeholder, #login input:hover::placeholder{
    opacity: 1;
  }

  #login input:hover{
    outline: none;
  }

  #login input:focus{
    outline: none;
  }

  #login button{
    position: relative;
    font-size: 1.1em;
    max-width: 110px;
    max-height: 45px;
    margin: 0;
    padding: 0;
    flex: 1;
  }

  #login button:focus{
    outline: none;
  }

  #login p{
    margin: 0;
    padding: 0;
  }
</style>
