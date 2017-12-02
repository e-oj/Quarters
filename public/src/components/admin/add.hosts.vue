<template>
  <div id="add-hosts">
    <form>
      <div>
        <label for="add-first-name">first name</label>
        <input id="add-first-name" type="text"/>
      </div>
      <div>
        <label for="add-last-name">last name</label>
        <input id="add-last-name" type="text"/>
      </div>
      <div>
        <label for="add-host-image">Select an image</label>
        <input id="add-host-image" />
      </div>
    </form>
  </div>
</template>

<script>
  export default{
    mounted(){
      let $hosts = $("#add-hosts");
      let $controls = $("#admin").find(".controls");

      $hosts.css({top: $controls.height()});
    }
  }
</script>

<style>
  #add-hosts{
    position: relative
  }

  #add-hosts input{
    font-size: 0.7em;
  }
</style>
