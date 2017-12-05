<template>
  <div id="booking">
    <h1>Confirm Your Space today</h1>

    <form class="b-form">

      <div>
        <div class="header">
          Select Size
          <div class="sub-header">feet</div>
        </div>
        <div class="radios">
          <div v-for="s in sizes" class="radio">
            <label>
              <input type="radio" :id="'s_' + s" :value="s" v-model="size"/>
              <label :for="'s_' + s">{{s}}</label>
            </label>
          </div>
        </div>
      </div>

      <div>
        <div class="header">
          Pickup Date
          <div class="sub-header">December</div>
        </div>

        <div class="pickup">
          <div class="multi-select">
            <label for="pickup-day"></label>
            <select id="pickup-day" v-model="pickupDay">
              <option disabled value="">Pick a day</option>
              <option v-for="day in pickupDays" :value="day">{{day + "th"}}</option>
            </select>
          </div>

          <div class="multi-select">
            <label for="pickup-time"></label>
            <select id="pickup-time" :disabled="!pickupDay" v-model="pickupTime">
              <option disabled value="">Pick a time</option>
              <option v-for="time in pickupTimes" :value="time">{{time}}</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div class="header">
          Delivery Date
          <div class="sub-header">January</div>
        </div>


        <div class="delivery">
          <div class="multi-select">
            <label for="delivery-day"></label>
            <select id="delivery-day" v-model="deliveryDay">
              <option disabled value="">Pick a day</option>
              <option v-for="day in deliveryDays" :value="day">{{day + "th"}}</option>
            </select>
          </div>

          <div class="multi-select">
            <label for="delivery-time"></label>
            <select id="delivery-time" :disabled="!deliveryDay" v-model="deliveryTime">
              <option disabled value="">Pick a time</option>
              <option v-for="time in deliveryTimes" :value="time">{{time}}</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div class="header">
          Items to be stored
        </div>

        <div class="items">
          <div v-for="item in items" class="item">
            <label>
              <input type="text" placeholder="Item Name" v-model="item.name"/>
            </label>
            <label>
              <input type="text" placeholder="Item Description" v-model="item.description"/>
            </label>
          </div>

          <button class="button" @click.prevent="addItem">Add Item</button>
        </div>
      </div>

      <button class="button">Book Now</button>
    </form>
  </div>
</template>

<script>
  import config from "../../config"

  export default{
    data(){
      return {
        pickup: []
        , delivery: []
        , pickupDays: []
        , deliveryDays: []
        , pickupDay: ""
        , pickupTime: ""
        , deliveryDay: ""
        , deliveryTime: ""
        , sizes: ["5x5", "5x10", "10x10", "10x15", "10x20"]
        , size: ""
        , items: [{
          name: ""
          , description: ""
        }]
      }
    }
    , computed: {
      pickupTimes(){
        let self = this;
        let pickup = self.pickup[self.pickupDay];

        if(pickup) return Object.keys(pickup).sort();
      }
      , deliveryTimes(){
        let self = this;
        let delivery = self.delivery[self.deliveryDay];

        if(delivery) return Object.keys(delivery).sort();
      }
    }
    , methods: {
      addItem(){
        let self = this;

        self.items.push({
          name: ""
          , description: ""
        });
      }
      , pad(num){
        let s = "0" + num;
        return s.substring(s.length - 2);
      }
      , setTimes(){
        let self = this;
        let pickup = {};
        let delivery = {};

        self.pickupDays = self.parseTimes(self.pickup, pickup);
        self.deliveryDays = self.parseTimes(self.delivery, delivery);

        self.pickup = pickup;
        self.delivery = delivery;
      }
      , parseTimes(dates, result){
        let self = this;
        let days = [];

        for(let obj of dates){
          let date = new Date(obj.date);
          let day = date.getUTCDate() + "";
          let hours = self.pad(date.getHours());
          let mins = self.pad(date.getMinutes());
          let time = `${hours}:${mins}`;

          if(result[day] === undefined){
            result[day] = {};
            days.push(day);
          }

          result[day][time] = obj._id;
        }

        return days.sort();
      }
      , async getTimes(){
        let self = this;

        try{
          let res = await self.$http.get(`${config.BASE_URL}/api/b/dates`);
          let {pickup, delivery} = res.body.result;

          self.pickup = pickup;
          self.delivery = delivery;
          self.setTimes();
        }
        catch(err){
          console.log(err);
        }
      }
    }
    , async mounted(){
      let self = this;

      try{
        await self.getTimes();
      }
      catch(err){
        console.log(err);
      }

      let $nav = $("#nav");
      let $container = $("#booking");
      let $window = $(window);

      self.$nextTick(function () {
        $window.off("scroll");
      });

      $nav.css({transition: "none"});
      $nav.addClass("sticky-nav");

      $container.css({
        top: $nav.height()
      });
    }
  }
</script>

<style>
  #booking{
    position: relative;
    font-size: 0.17em;
    display: flex;
    flex-direction: column;
    font-family: Nunito, Quicksand, sans-serif;
  }

  #booking h1{
    text-align: center;
    font-size: 0.7em;
    margin: 50px;
  }

  .b-form{
    display: flex;
    flex-direction: column;
    max-width: 700px;
    min-width: 700px;
    margin: auto;
  }

  .b-form .header{
    font-size: 0.6em;
    text-align: center;
    margin: 10px;
  }

  .b-form .sub-header{
    font-size: 0.7em;
    text-align: center;
    margin: 10px;
  }

  .b-form .radios
  , .b-form .pickup
  , .b-form .delivery {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
  }

  .b-form .radio{
    margin-right: 40px;
  }

  .b-form .radio:last-child{
    margin-right: 0;
  }

  .b-form input[type="radio"]{
    display: none;
  }

  .b-form input[type="radio"] + label{
    background-color: #35667F;
    color: white;
    display: flex;
    width: 70px;
    height: 70px;
    align-items: center;
    justify-content: center;
    font-size: 0.5em;
    border-radius: 4px;
    transition: all 0.2s linear;
  }

  .b-form input[type="radio"] + label:hover{
    cursor: pointer;
    background-color: #417D9A;
    color: lightblue;
  }

  .b-form input[type="radio"]:checked + label{
    background-color: #8CAFC0;
  }

  .b-form .pickup, .b-form .delivery,  .b-form .item{
    justify-content: space-evenly;
  }

  .b-form .items{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .b-form .item{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .b-form button{
    width: 100px;
    height: 35px;
    color: #35667F;
    background: white;
    font-size: 0.5em;
    border: 2px solid #35667F;
    margin: 20px auto;
  }

  .b-form button:hover{
    color: white;
    background: #35667F;
  }

  .b-form input{
    text-indent: 5px;
  }

  .b-form input::placeholder{
    color: gray;
  }

  .b-form .multi-select select, .b-form .items input{
    width: 300px;
    height: 35px;
    background: white;
    font-size: 0.5em;
  }
</style>
