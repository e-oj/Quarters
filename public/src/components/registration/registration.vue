<!-- @author Chike Udenze
     @since 11/29/2017
 -->
<template>
  <div id="register">
    <!-- form starts here -->
    <form class="r-form" @submit.prevent="signup">

      <div class="row">
        <label for="first-name"></label>
        <input :class="{'error': errors.first_name && !first_name}" id="first-name" v-model="first_name" type="text"  placeholder="First Name">

        <label for="last-name"></label>
        <input :class="{'error': errors.last_name && !last_name}" id="last-name" v-model="last_name" type="text"  placeholder="Last Name" >

        <label for="email"></label>
        <input :class="{'error': errors.email && !email}" id="email" v-model="email" type="email"  placeholder="Email">

      </div>
      <div class="row">
        <div class="username">
          <label for="alias"></label>
          <input v-model="alias" :class="{'error': errors.alias && !alias}" id="alias" type="text" placeholder="Username">
        </div>

        <label for="password"></label>
        <input :class="{'error': errors.password && !password}" id="password" v-model="password" type="password"  placeholder="Password">

        <label for="address"></label>
        <input :class="{'error': errors.address && !address}" id="address" v-model="address" type="text"  placeholder="Address">

      </div>
      <div class="row">
        <label for="city"></label>
        <select :class="{'error': errors.city && !city}" id="city" v-model="city" >
          <option value="" disabled="disabled">Select City</option>
          <option value="1">Rochester</option>
          <option value="2">Buffalo</option>
        </select>
        <label for="state"></label>
        <select :class="{'error': errors.state && !state}" id="state" v-model="state">
          <option value="" disabled="disabled" selected="selected">Select State</option>
          <option value="1">New York</option>
          <option value="2">Massachusetts</option>
        </select>

        <label for="phone"></label>
        <input :class="{'error': errors.phone && !phone}" id="phone" v-model="phone" type="tel" placeholder="Phone" >

      </div>
      <div class="row">

        <button type="submit" class="button">Sign Up</button>
      </div>
    </form>

  </div>
</template>


<script>
  import Vue from "vue"
  import VueResource from "vue-resource";
  import config from "../../config";
  import router from "../../router";

  Vue.use(VueResource);

  let errors = {
    last_name: false
    , first_name: false
    , alias: false
    , password: false
    , email: false
    , address: false
    , city: false
    , state:false
    , phone:false
  };

  export default {
    data() {
      return {
        first_name: '',
        last_name: '',
        alias: '',
        password: '',
        address: '',
        email: '',
        city: '',
        state: '',
        phone: '',
        errors,
      }
    },
    methods: {
      validate(){
        let self = this;
        let keys = Object.keys(self.errors);
        console.log(keys);
        let validated = true;

        for(let key of keys){
          if(!self[key]){
            self.errors[key] = true;

            if(validated) validated = false;
          }
          else if(self.errors[key]){
            self.errors[key] = false;
          }
        }

        return validated;
      }

      ,signup: async function(){
        let self = this;
        let {alias, email,first_name,last_name,address,phone, password} = self;

        let User = {alias,first_name,last_name,address,phone,password,email};

        if (!self.validate()){
          console.log("Nope!!");
          return;
        }

        try{

          let signupRoute = `${config.BASE_URL}/api/u/`;
          let res = await self.$http.post(signupRoute, User,{
            headers: {
              'Content-Type': 'application/json'
            }
          });

          let {token, user} = res.body.result;

          localStorage.setItem(config.AUTH, token);
          localStorage.setItem(config.ADMIN, user.admin);

          router.push({path:"/book"});
          location.reload();
        }
        catch(err){
          console.log(err);
        }
      }
    }, mounted(){
      let self = this;
      let $nav = $("#nav");
      let $window = $(window);
      let $register = $("#register");

      self.$nextTick(function () {
        $window.off("scroll");
      });

      $nav.css({transition: "none"});
      $nav.addClass("sticky-nav");

      $register.css({
        top: $nav.height()
      });
    }
  }
</script>

<style>
  #register {
    position: relative;
    font-size: 0.17em;
    display: flex;
    flex-direction: column;
    font-family: Nunito, Quicksand, sans-serif;
    color: #396F89;
    background-color: white;
    padding: 18px;
  }

  #register h1{
    text-align: center;
    font-size: 1.2em;
    margin: 50px;
  }

  .r-form {
    display: flex;
    flex-direction: column;
    height: 600px;
    width: 700px;
    border:  2px solid #4992B7;
    border-radius: 4px;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: auto;
    padding: 15px;
    padding-bottom: 0;
    font-size: 0.7em;
  }

  .r-form .header{
    font-size: 0.6em;
    text-align: center;
    margin: 10px;
  }

  .r-form button{
    width: 100px;
    height: 35px;
    color: #35667F;
    background: white;
    border: 2px solid #4992B7;
    margin: 0;
    font-size: 0.7em;
  }

  .r-form .row{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .r-form label{
    display: none;
  }

  select, input{
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0;
    border: none;
    border-bottom: 2px solid #4992B7;
    color: #396F89;
    transition: all 0.2s linear;
    width: 190px;
    font-size: 0.7em;
    padding: 7px;
    padding-left: 0;
    background-color: transparent;
    box-sizing: border-box;
  }

  select:focus, input:focus{
    outline: none;
    border-color: green;
    color: green;
  }

  input::placeholder{
    color: #396F89;
    opacity: 1;
  }

  input:focus::placeholder{
    color: green;
  }

  select:hover{
    cursor: pointer;
  }

  select:disabled{
    text-indent: 5px;
  }
  .r-form button:hover{
    color: white;
    background: #4992B7;
  }

  .r-form input{
    text-indent: 5px;
  }
  .r-form select{
    text-indent: 5px;
  }
  .r-form option{
    text-indent: 5px;
  }

  .r-form .error{
    color: red !important;
  }

  .r-form .error::placeholder{
    color: red !important;
  }

  .r-form .success{
    color: green;
  }

  .r-form .sub-header{
    font-size: 0.5em;
    text-align: center;
    margin: 10px;
  }
  .username{
    display: inline-flex;
    flex-direction: column;
  }

</style>
