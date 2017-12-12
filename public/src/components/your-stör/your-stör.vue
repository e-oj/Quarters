<template>
  <div id="overall">
    <div id="stor">
      <div class="booking" v-for="booking in bookings">
        <div class="booking-label">
          <img :src="base64Img(booking.host.profile_img)"/>
          <div class="size-label">
            {{booking.size}}
          </div>
        </div>
        <div class="time-slot" >
          <div class="date-display">
            <h2> December {{booking.pickup.date.split("-")[0]}}th </h2>
            Pickup Time: {{booking.pickup.date.split("-")[1]}}
          </div>
          <div class="date-display">
            <h2> January {{booking.delivery.date.split("-")[0]}}th </h2>
            Delivery Time: {{booking.delivery.date.split("-")[1]}}
          </div>
        </div>
          <div class="item" v-for="item in booking.items">
            <span>{{item.name}}:</span> {{item.description}}
          </div>
    </div>
    </div>
  </div>
</template>

<script>
  import config from "../../config"
  import Booking from "../booking/booking.vue"
  import Host from "../host/host.vue"


  export default{
    data(){
      return {
        bookings: []
        ,size: ''
      }
    }
    ,components: {
    "host": Host
    }
    ,name: "your-stor"
    ,methods:{
      base64Img(img){
        return `data:${img.mimetype};base64,${img.data}`
      }
      , async getStor(){
        let self = this;

        try{
          let res = await self.$http.get(`${config.BASE_URL}/api/b/all/`);

          self.bookings = res.body.result.bookings.reverse();
        }
        catch(err){
          throw err;
        }
      }
    },

    async mounted(){
      let self = this;
      let $nav = $("#nav");
      let $window = $(window);
      let $overall = $("#overall");

      self.$nextTick(function () {
        $window.off("scroll");
      });

      $nav.css({transition: "none"});
      $nav.addClass("sticky-nav");


      $overall.css({
        top: $nav.height()
      });
      try{

        await self.getStor();
      }
      catch(err){
        console.log(err);
      }
    }
  }
</script>


<style scoped>

  #overall{
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    justify-content: center;
    margin-bottom: 30px;
  }

  #stor{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #396F89;
  }

  img{
    border-radius: 50%;
    height: 60px;
    width: 60px;
    margin-right: 20px;
  }

  .date-display{
    display: flex;
    flex-direction: row;
    text-align: center;
    border: 2px solid #4992B7;
    width: 45%;
    border-radius: 4px;
    font-size: 1em;
    margin-top: 20px;
    padding: 12px;
  }

  .date-display h2{
    font-size: 1.2em;
  }

  .booking{
    background-color: white;
    color: #4992B7;
    display: flex;
    flex-direction: column;
    font-family: Nunito, Quicksand, sans-serif;
    font-size: 0.14em;
    justify-content: left;
    width: 700px;
    border-radius: 4px;
    margin-top: 30px;
    min-height: 250px;
    padding: 18px;
    border: 2px solid #4992B7;
  }
  .size-label{
    width: 60px;
    height: 60px;
    background-color: #4992B7;
    text-align: center;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 0.7em;
  }
  .booking-label{
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    justify-content: flex-start;
  }
  .time-slot{
    display: flex;
    flex-direction: row;
    font-size: 0.6em;
    justify-content: space-between;
  }
  .item{
    background-color: white ;
    color: #4992B7;
    border: 2px solid #4992B7;
    border-radius: 4px;
    flex-direction: column;
    padding: 12px;
    margin-top: 15px;
    font-size: 0.7em;
  }

  .item span{
    font-weight: 900;
  }
</style>
