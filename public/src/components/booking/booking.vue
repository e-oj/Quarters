<template>
  <div id="app">
    <form class="app">
      <section>
        <h2>Select Size</h2>
        <div v-for="size in form.sizes">
          <label for="size">{{size}}</label>
          <input type="radio" id="size" v-model="form.sizePicked" v-bind:value="size"/>
        </div>
        <br>
        <span>Size Picked: {{form.sizePicked }}</span>
      </section>
      <div class="field">
        <div>
          <h2>Set your Pickup Date</h2>
          <h4> December </h4>
          <div v-for="date in form.pickupDates">
            <label for="pickupDate">{{date}}</label>
            <input type="radio" id="pickupDate" v-model="form.pickupPicked" v-bind:value="date"/>
          </div>
          <br>
          <span>Pickup Date Picked: December {{form.pickupPicked }}</span>
        </div>
      </div>
      <div>
        <h2>Set your Delivery Date</h2>
        <h4> January </h4>
        <div v-for="date in form.deliveryDates">
          <label for="deliveryDate">{{date}}</label>
          <input type="radio" id="deliveryDate" v-model="form.deliveryPicked" v-bind:value="date"/>
        </div>
        <br>
        <span>Delivery Date Selected: January {{form.deliveryPicked }}</span>
      </div>
    </form>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        form: {
          pickupDates: ["10th", "11th", "12th", "13th", "14th", "15th", "16th", "18th", "19th", "20th"],
          deliveryDates: ["7th", "8th", "9th", "10th", "11th", "12th", "13th", "15th", "16th", "17th"],
          pickupPicked: [],
          deliveryPicked: [],
          sizes: ["5'x5'", "5'x10'", "10'x15'", "10'x20'"],
          sizePicked: ''
        }
      }
    },

    methods: {}
  }
</script>


