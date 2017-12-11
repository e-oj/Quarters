<!-- @author Chike Udenze
     @since 11/29/2017
 -->
<template>
    <div id="register">
          <!-- form starts here -->
      <form class="r-form" @submit.prevent="signup">

              <div class="row">
                <label for="first-name">
                  <input :class="{'error': errors.first_name && !first_name}" id="first-name" v-model="first_name" type="text"  placeholder="First Name">
                </label>
                <label for="last-name">
                  <input :class="{'error': errors.last_name && !last_name}" id="last-name" v-model="last_name" type="text"  placeholder="Last Name" >
                </label>
                <label for="email">
                  <input :class="{'error': errors.email && !email}" id="email" v-model="email" type="email"  placeholder="Email">
                </label>

              </div>
              <div class="row">
                <div class="username">
                  <label for="alias">
                    <input :class="{'error': errors.alias && !alias}" id="alias" v-model="alias" type="text" placeholder="Username">
                    <br>
                    <span v-if="errors.username_error" class="sub-header" style="color:red;">No spaces in username</span>
                  </label>
                </div>
                <label for="password">
                  <input :class="{'error': errors.password && !password}" id="password" v-model="password" type="password"  placeholder="Password">
                </label>
                <label for="address">
                  <input :class="{'error': errors.address && !address}" id="address" v-model="address" type="text"  placeholder="Address">
                </label>
              </div>
              <div class="row">
                <label for="city">
                  <select :class="{'error': errors.city && !city}" id="city" v-model="city" >
                    <option value="" disabled="disabled">Select City</option>
                    <option value="1">Rochester</option>
                    <option value="2">Buffalo</option>
                  </select>
                </label>
                <label for="state">
                  <select :class="{'error': errors.state && !state}" id="state" v-model="state">
                    <option value="" disabled="disabled" selected="selected">Select State</option>
                    <option value="1">New York</option>
                    <option value="2">Massachusetts</option>
                  </select>
                </label>
                <label for="phone">
                  <input :class="{'error': errors.phone && !phone}" id="phone" v-model="phone" type="tel" placeholder="Phone" >
                </label>

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
    , username_error: ''
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
        let username = self["alias"];
        if(/\s/.test(username)){
          console.log("username has space!!");
          self.username_error="No spaces in username";
          validated = false;
        }

        return validated;
      }

      ,signup: async function(){
        let self = this;
        let {alias, email,first_name,last_name,address,phone, password} = self;

        let User = {alias,first_name,last_name,address,phone,password,email};

        if (!self.validate()) return;


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
    height: 700px;
    width: 700px;
    border:  2px solid #4992B7;
    border-radius: 4px;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: auto;
    padding: 15px;
    padding-bottom: 0;
  }

  .r-form .header{
    font-size: 0.6em;
    text-align: center;
    margin: 10px;
  }

  .r-form .sub-header{
    font-size: 0.7em;
    text-align: center;
    margin: 10px;
  }

  .r-form button{
    width: 100px;
    height: 35px;
    color: #35667F;
    background: white;
    font-size: 0.5em;
    border: 2px solid #4992B7;
  }
  .r-form .row{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  select, input{
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0;
    border: none;
    border-bottom: 2px solid #4992B7;
    text-indent: 5px;
    color: #396F89;
    transition: all 0.2s linear;
    width: 150px;

  }

  select:hover{
    cursor: pointer;
  }

  select:disabled{
    text-indent: 5px;
    font-size: 0.7em;
  }
  .r-form button:hover{
    color: white;
    background: #4992B7;
  }

  .r-form input{
     text-indent: 5px;
     font-size: 0.7em;
   }
  .r-form select{
    text-indent: 5px;
    font-size: 0.7em;
  }
  .r-form option{
    text-indent: 5px;
    font-size: 0.7em;
  }

  .r-form input::placeholder{
    color: #396F89;
    opacity: 1;
  }
  .r-form select::placeholder{
    color: #396F89;
    opacity: 1;
  }
  .r-form option::placeholder{
    color: #396F89;
    opacity: 1;
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
    display: block;
  }

</style>
