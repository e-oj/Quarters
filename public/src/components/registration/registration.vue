<!-- @author Chike Udenze
     @since 11/29/2017
 -->


<template>
    <div id="register">
          <!-- form starts here -->
          <div id="form-border">
            <form id="reg-form" @submit.prevent="signup">
               <div id="reg-form-inputs">
                  <div>
                    <label for="first-name"></label>
                    <input id="first-name" v-model="first_name" class="input" type="text" required placeholder="First Name">
                  </div>
                  <div>
                    <label for="last-name"></label>
                    <input id="last-name" v-model="last_name" class="input" type="text" required placeholder="Last Name">
                  </div>
                  <div>
                    <label for="alias"></label>
                    <input id="alias" v-model="alias" class="input" type="text" required placeholder="Username">
                  </div>
                  <div>
                    <label for="password"></label>
                    <input id="password" v-model="password" class="input" type="password" required placeholder="Password">
                  </div>
                  <div>
                    <label for="email"></label>
                    <input id="email" v-model="email" class="input" type="email" required placeholder="Email">
                  </div>
                  <div>
                    <label for="address"></label>
                    <input id="address" v-model="address" class="input" type="text" required placeholder="Address">
                  </div>

                  <div>
                    <label for="city"></label>
                    <input id="city" v-model="city" class="input" type="text" required placeholder="City">
                  </div>
                  <div>
                    <label for="phone"></label>
                    <input id="phone" v-model="phone" class="input" type="tel" required placeholder="Phone">
                  </div>
                  <div>
                    <label for="state"></label>
                    <input id="state" v-model="state" class="input" type="text" required placeholder="State">
                  </div>
               </div>

              <button type="submit" class="button">Sign Up</button>

            </form>
          </div>
        </div>
</template>


<script>
  import Vue from "vue"
  import VueResource from "vue-resource";
  import config from "../../config";

  Vue.use(VueResource);

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
          phone: ''
      }


      },
    methods: {
      signup: async function(){
        let self = this;
        let {alias, email,first_name,last_name,address,phone, password} = self;

        try{
          let user = {alias,first_name,last_name,address,phone,password,email};
          let signupRoute = `${config.BASE_URL}/api/u/`;
          let res = await self.$http.post(signupRoute, user,{
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log(res);
        }
        catch(err){
          console.log(err);
        }
      }
    },
    mounted(){
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
  #register{
    background-color: white ;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-content: center;
    position: relative;
    padding-bottom: 35px;
  }
  #reg-form-inputs{
    display:flex;
    flex-direction: row;
    width: inherit;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  #form-border{
    display: flex;
    flex-direction: row;
    background-color: #336680;
    border-radius: 0;
    min-width: 500px;
    margin: auto;
    margin-bottom: 20px;
    margin-top:15px;
  }

  #form-border button{
    font-size: 0.11em;
    width: 60px;
    border-radius: 0;
  }
  #splash p{
    margin: 0;
    font-size: 0.16em;
    text-align: center;
  }
  input{
    outline: none;
    background: inherit;
    border: none;
    color: white;
    border-bottom: 2px solid white;
    font-size: 0.11em;
    margin-left: 5px;
    margin-right: 5px;
    width:auto
  }
  #reg-form{
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    width: 700px;
    padding: 20px;
  }

  input::placeholder{
    opacity: 0.5;
    transition: all 0.2s linear;
  }

  input:focus::placeholder, input:hover::placeholder{
    opacity: 1;
  }
</style>
