<template>

  <div id="app">
    <div>
      <section>
        <h1>Registration Form</h1>
        <p>
          Enter in all your information to create your <strong>Stör</strong> account.
        </p>
        <hr>

        <!-- form starts here -->
        <section>
          <div>
            <label>Full Name</label>
            <div>
              <input v-model="form.name" class="input" type="text" placeholder="Enter your Full Name">
            </div>
          </div>
          <div>
            <label>Username</label>
            <div>
              <input v-model="form.username" class="input" type="text" placeholder="Enter your Full Name">
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>
              <input v-model="form.password" class="input" type="text" placeholder="Enter your Full Name">
            </div>
          </div>
          <div>
            <label>Email</label>
            <div>
              <input v-model="form.email" class="input" type="text" placeholder="Enter your Full Name">
            </div>
          </div>
          <div>
            <label>Address</label>
            <div>
              <input v-model="form.address" class="input" type="text" placeholder="Enter your Address">
            </div>
          </div>
          <div>
            <label>City</label>
            <div>
              <input v-model="form.city" class="input" type="text" placeholder="Enter your City">
            </div>
          </div>
          <div>
            <label>State</label>
            <div>
              <input v-model="form.state" class="input" type="text" placeholder="Enter your State">
            </div>
          </div>
          <div>
            <label>Zip Code</label>
            <div>
              <input v-model="form.zipcode" class="input" type="text" placeholder="Enter your Zip Code">
            </div>
          </div>
          <div>
            <label>Phone Number</label>
            <div>
              <input v-model="form.number" class="input" type="text" placeholder="Enter Phone Number">
            </div>
          </div>
        </section>
      </section>
    </div>
    <div>
      <section>
          <h2>Select Size</h2>
          <div v-for="size in form.sizes">
            <label for="size">{{size}}</label>
            <input type="radio" id="size" v-model="form.sizePicked" v-bind:value="size"/>
          </div>
          <br>
          <span>Size Picked: {{form.sizePicked }}</span>

      </section>
    </div>
    <div>
        <section id="results">
          <div>
            <ul>
              <!-- loop through all the `form` properties and show their values -->
              <li v-for="(item, k) in form">
                <strong>{{ k }}:</strong> {{ item }}
              </li>
            </ul>
          </div>
        </section>
    </div>
    <div>
      <h2>Set your Pickup Date</h2>
      <h4> December </h4>
      <div v-for="date in form.pickupDates">
        <label for="pickupDate">{{date}}</label>
          <input type="radio" id="pickupDate" v-model="form.pickupPicked" v-bind:value="date"/>
      </div>
      <br>
      <span>Pickup Date Picked: {{form.pickupPicked }}</span>
    </div>
    <div>
      <h2>Set your Delivery Date</h2>
      <h4> January </h4>
      <div v-for="date in form.pickupDates">
        <label for="deliveryDate">{{date}}</label>
        <input type="radio" id="deliveryDate" v-model="form.deliveryPicked" v-bind:value="date"/>
      </div>
      <br>
      <span>Delivery Date Picked: {{form.deliveryPicked }}</span>
    </div>
  </div>
</template>




<script>
 export default {
    data() {
      return {
        form: {
          name: '',
          username:'',
          password:'',
          address:'',
          email:'',
          city:'',
          state:'',
          zipcode:'',
          number:'',
          pickupDates: ["10th","11th","12th","13th","14th","15th","16th","18th","19th","20th"],
          deliveryDates: ["7th","8th","9th","10th","11th", "12th","13th","15th","16th","17th"],
          pickupPicked: [],
          deliveryPicked: [],
          sizes: ["5'x5'","5'x10'","10'x15'","10'x20'"],
          sizePicked: ''
        }
      }
    }

   // methods() {
     // return {
       // selectDate: function (event) {
        //}
      //}
    //}


  }
</script>
