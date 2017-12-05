<template>
<div class="whole-page">
  <booking v-for="item in items" :key="item._id" :booking="item"></booking>
</div>
</template>

<script>
  import config from "../../config"
  import Booking from "../booking/booking.vue"

  export default{
    data(){
      return {
        items: []
      }
    },
    name: "your-stor",

    components:{
      "booking": Booking
    },

    methods:{
      async getStor(){
        let self = this;

        try{
          let res = await self.$http.get(`${config.BASE_URL}/api/b/all/`);

          console.log(res);

          self.items = res.body.result.items;
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
      try{
        await self.getStor();
      }
      catch(err){
        console.log(err);
      }

      $stor.css({
        top: $nav.height()
      });
    }
  }
</script>


<style scoped>
.whole-page{
  background-color: #336680;
}
</style>
