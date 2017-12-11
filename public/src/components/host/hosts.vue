
<template>
  <div id="host-page">
    <div class="title-text">
      <h1>Verified Hosts</h1>
    </div>
    <div class="host-container">
      <host v-for="host in hosts" :key="host._id" :host="host"></host>
    </div>
  </div>
</template>

<script>
  import config from "../../config"
  import Host from "../host/host.vue"
  export default {
    data(){
      return{
        hosts: []
      }
    }
    , components: {
      "host": Host
    }
    ,methods: {
      /**
       * gets all hosts from the server
       * and assigns them to self.hosts
       *
       * @returns {Promise.<void>}
       */
      async getHosts(){
        let self = this;

        try{
          let res = await self.$http.get(`${config.BASE_URL}/api/h/all/`);

          console.log(res);

          self.hosts = res.body.result.hosts;
        }
        catch(err){
          throw err;
        }
      }
    }
    ,async mounted(){
      let self = this;
      let $nav = $("#nav");
      let $window = $(window);
      let $hosts = $("#host-page");



      self.$nextTick(function () {
        $window.off("scroll");
      });

      $nav.css({transition: "none"});
      $nav.addClass("sticky-nav");
      try{
        await self.getHosts();
      }
      catch(err){
        console.log(err);
      }

      $hosts.css({
        top: $nav.height()
    });

    }
  }
</script>

<style scoped>
  .title-text{
    color: #336680;
    margin: auto;
    position: relative;
    text-align: center;
    font-family: Nunito, Quicksand, sans-serif;
  }

  #host-page{
    background-color: white;
    color: white;
    min-height: 500px;
    font-size: 0.11em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-width: 1100px;
    min-width: 1100px;
    margin: auto;
    position:relative;
  }


  .host-container{
    max-width: 1100px;
    min-width: 1100px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    min-height: 700px;

  }
</style>
