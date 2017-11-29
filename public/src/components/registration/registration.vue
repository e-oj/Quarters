<!-- @author Chike Udenze
     @since 11/29/2017
 -->


<template>
  <div id="container" class="full vertical-container">
    <div id="splash">
      <div id="title-text">Sign Up</div>
      <div id="subtitle-text">Enter in all your information to create your <strong>stör</strong> account.</div>

          <hr>
          <!-- form starts here -->
        <div id="form-border">
          <form>
            <div class="field">
              <input v-model="registerForm.firstName" class="input" type="text" required placeholder="First Name">
              <input v-model="registerForm.lastName" class="input" type="text" required placeholder="Last Name">
              <input v-model="registerForm.username" class="input" type="text" required placeholder="Enter a username ">
            </div>
            <div class="field">
              <input v-model="registerForm.email" class="input" type="text" required placeholder="Email">
              <input v-model="registerForm.password" class="input" type="password" required placeholder="Password" minlength="6">
              <input v-model="registerForm.address" class="input" type="text" required placeholder="Address" minlength="3">
            </div>

            <div class="field">
              <input v-model="registerForm.city" class="input" type="text"  required placeholder="City" minlength="6">
              <input v-model="registerForm.state" class="input" type="text" required placeholder="State" >
              <input v-model="registerForm.zipcode" class="input" type="text" required placeholder="Zip Code">
            </div>

            <div class="field">
              <input v-model="registerForm.number" class="input" type="text" required placeholder="Phone Number" minlength="3">
            </div>
          </form>
        </div>
    </div>
  </div>

</template>


<script>
  export default {
    data() {
      return {
        registerForm: {
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          address: '',
          email: '',
          city: '',
          state: '',
          zipcode: '',
          number: ''
        },
      }


      },
    methods: {
      //this.$http.post('/someUrl', [userBody], [options]).then(successCallback, errorCallback);
    }



  }
</script>

<style>
  #splash{
    background-color: #4992B7 ;
    background-size: cover;
    background-position: 100%;
    flex: 2;
    min-height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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
  .splash-text{
    position: relative;
    padding-left: 20%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  #form-border{
    background-color: #336680;
    border-radius: 25px;
    width: 8em;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    height: 70%;

  }
  #splash p{
    margin: 0;
    font-size: 0.16em;
    text-align: center;
  }
  input[type=text]{
    outline: none;
    background: inherit;
    border: none;
    color: white;
    border-bottom: 2px solid white;
    width: 300px;
    margin-top: 5px;
    font-size: 0.16em;
    margin-left: 5px;
  }

  input[type=text]::placeholder{
    opacity: 0.5;
    transition: all 0.2s linear;
  }

  input[type=text]:focus::placeholder, input[type=text]:hover::placeholder{
    opacity: 1;
  }
  input[type=password]{
    outline: none;
    background: inherit;
    border: none;
    color: white;
    border-bottom: 2px solid white;
    width: 300px;
    font-size: 0.16em;
    margin-top: 10px;
    margin-left: 5px;
  }

  input[type=password]::placeholder{
    opacity: 0.5;
    transition: all 0.2s linear;
  }

  input[type=password]:focus::placeholder, input[type=password]:hover::placeholder{
    opacity: 1;
  }

</style>
