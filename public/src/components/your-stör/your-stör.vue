<template>

</template>

<script>
  export default {
    name: "your-stör",

    mounted(){
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
    }
  }
</script>

<style scoped>

</style>
