<!-- @author Chike Udenze
     @since 11/29/2017
 -->


<template>
    <div id="register">
      <div id="title-text">Sign Up</div>
      <div id="subtitle-text">Enter in all your information to create your <strong>stör</strong> account.</div>

          <hr>
          <!-- form starts here -->
        <div id="body-border">
          <div id="form-border">
            <form>

                <div>
                  <label for="first-name"></label>
                  <input id="first-name" v-model="first_name" class="input" type="text" required placeholder="First Name">

                  <label for="last-name"></label>
                  <input id="last-name" v-model="last_name" class="input" type="text" required placeholder="Last Name">
                </div>
                <div>
                  <label for="alias"></label>
                  <input id="alias" v-model="alias" class="input" type="text" required placeholder="Username">

                  <label for="password"></label>
                  <input id="password" v-model="password" class="input" type="password" required placeholder="Password">
                </div>
                <div>
                  <label for="email"></label>
                  <input id="email" v-model="email" class="input" type="email" required placeholder="Email">

                  <label for="address"></label>
                  <input id="address" v-model="address" class="input" type="text" required placeholder="Address">
                </div>

                <div>
                  <label for="city"></label>
                  <input id="city" v-model="city" class="input" type="text" required placeholder="City">
                  <label for="phone"></label>
                  <input id="phone" v-model="phone" class="input" type="text" required placeholder="Phone">
                </div>

                <button @click="signup" class="button">Sign Up</button>

            </form>
          </div>
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
    }
   // ,mounted(){
      //$nav.css({
        //top: 0
        //, position: fixed
      //})
    //}
  }
</script>

<style>
  #register{
    background-color: #4992B7 ;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-content: center;
  }
  #title-text{
    color: white;
    font-size: 0.3em;
    text-align: center;
  }
  #subtitle-text{
    color: white;
    font-size: 0.19em;
    text-align: center;
    margin-top: 10px;
  }

  #body-border{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;

  }

  #form-border{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;2
    background-color: #336680;
    border-radius: 25px;
    width: 60%;
    padding: auto;

  }
  #form-border button{
    font-size: 0.1em;
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
    font-size: 0.15em;
    margin-left: 5px;
    margin-right: 5px;
    width:auto
  }
  form{
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  input::placeholder{
    opacity: 0.5;
    transition: all 0.2s linear;
  }

  input:focus::placeholder, input:hover::placeholder{
    opacity: 1;
  }
</style>
