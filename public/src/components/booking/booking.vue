<template>
  <div id="booking">
    <h1>Confirm Your Space today</h1>

    <form>

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
        , pickupDay: "10"
        , deliveryDay: "10"
        , size: ""
        ,
      }
    }
    , computed: {
      pickupTimes(){
        let self = this;
        let pickup = self.pickup[self.pickupDay];

        if(pickup) return Object.keys(pickup);
      }
      , deliveryTimes(){
        let self = this;
        let delivery = self.delivery[self.deliveryDay];

        if(delivery) return Object.keys(delivery);
      }
    }
    , methods: {
      setTimes(){
        let self = this;
        let pickup = {};
        let delivery = {};

        self.pickupDays = self.parseTimes(self.pickup, pickup);
        self.deliveryDays = self.parseTimes(self.delivery, delivery);

        self.pickup = pickup;
        self.delivery = delivery;
      }
      , parseTimes(dates, result){
        let days = [];

        for(let obj of dates){
          let date = obj.date;
          let parts = date.split("T");
          let day = parts[0].split("-")[2];
          let time = parts[1].substring(0, 5);

          if(!result[day]){
            result[day] = {};
            days.push(day);
          }

          result[day][time] = obj._id
        }

        return days;
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
  }
</style>
