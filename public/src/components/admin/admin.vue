<template>
  <div id="container">
    <div id="admin">
      <div class="controls">
        <ul>
          <li><router-link to="/admin/hosts">Add Hosts</router-link></li>
          <li><a>Remove Hosts</a></li>
          <li><a>All Orders</a></li>
          <li><a>Pending Orders</a></li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {

      }
    }
    , mounted(){
      let self = this;
      let $nav = $("#nav");
      let $container = $("#container");
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
  #container{
    position: relative
  }

  #admin{
    font-size: 0.17em;
  }

  #admin .controls{
    position: fixed;
    width: 100%;
  }

  #admin .controls ul{
    list-style-type: none;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.5em;
    background-color: lightblue;
    justify-content: space-around;

  }

  #admin .controls li{
    padding: 10px;
  }

  #admin .controls li:hover{
    border-bottom: 2px solid green;
    cursor: pointer;
  }
</style>
