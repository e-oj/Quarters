<template>
  <div id="stor">
    <div class="booking" v-for="booking in bookings">
      <p> Storage Size : {{booking.size}} (feet)</p>
      <p> Pickup Date: {{booking.pickup.date}}</p>
      <p> Delivery Date: {{booking.delivery.date}}</p>
      <div class="booking-host">
        <host v-model="host"></host>
      </div>
      <div class="items">
        <h1>Items</h1>
        <div class="item" v-for="item in booking.items">
          <p> Name: {{item.name}}</p>
          <p> Description: {{item.description}}</p>
        </div>
      </div>
      <div class="booking-host">
        <host v-model="host"></host>
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
        ,host: ''
        ,pickup:{
          date:''
          ,taken: ''
        }
        ,delivery:{
          date:''
          ,taken: ''
        }
      }
    }
    ,components: {
    "host": Host
    }
    ,name: "your-stor"

    ,methods:{
      async getHosts(){
        let self = this;

        try{
          let res = await self.$http.get(`${config.BASE_URL}/api/h/all/`);



          let hosts = res.body.result.hosts;
          console.log(hosts);
          self.host = hosts.filter(function(host) {
            return host.first_name === "Akram"
          });
          console.log(self.host);
        }
        catch(err){
          throw err;
        }
      }
      ,async getStor(){
        let self = this;

        try{
          let res = await self.$http.get(`${config.BASE_URL}/api/b/all/`);

          console.log(res);

          self.bookings = res.body.result.items;
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
      let $stor = $("#stor");

      self.$nextTick(function () {
        $window.off("scroll");
      });

      $nav.css({transition: "none"});
      $nav.addClass("sticky-nav");


      $stor.css({
        top: $nav.height()
      });
      try{
        await self.getHosts();
        await self.getStor();

      }
      catch(err){
        console.log(err);
      }
    }
  }
</script>


<style scoped>

  #stor{
    display:flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
  }

  .booking{
    background-color: white;
    color: #336680;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: Nunito, Quicksand, sans-serif;
    font-size: 0.17em;
    justify-content: space-evenly;
  }
  .item{
    font-size: 0.11em;
    margin-bottom: 25px;
  }

</style>
