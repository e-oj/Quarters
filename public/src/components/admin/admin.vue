<template>
  <div id="container">
    <div id="hosts">
      These be the hosts
    </div>
  </div>
</template>

<script>
  export default{
    mounted(){
      let $nav = $("#nav");
      let $window = $(window);

      $window.off("scroll");

      $nav.css({
        transition: "none"
      });
      $nav.addClass("sticky-nav");
    }
  }
</script>

<style>

</style>
