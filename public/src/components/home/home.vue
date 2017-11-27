<template>
  <div id="container" class="full">
    <div id="splash" class="full">
      <div class="splash-text">
        <!--<p>-->
          <!--<span>RIT STUDENTS</span>-->
          <!--Save up to <span>50%</span> this winter break-->
          <!--on storing your items!-->
        <!--</p>-->
      </div>
    </div>
    <div id="how" class="full"></div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        holler: "Allo!"
      }
    }
  }
</script>

<style>
  #splash{
    background: url("/src/assets/phone blur-u1756-fr_2x.jpg") no-repeat center center;
  }

  #splash p{
    margin: 0;
  }

  #how{
    background: #61BBE7;
  }
</style>
