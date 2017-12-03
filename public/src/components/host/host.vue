<template>
  <div class="host">
    <div class="head">
      <img :src="'data:' + host.profile_img.mimetype + ';base64,' +host.profile_img.data"/>
      <h4>{{host.first_name + " " + host.last_name}}</h4>
    </div>
    <div class="storage-img">
      <img :src="'data:' + host.storage_img.mimetype + ';base64,' +host.storage_img.data"/>
    </div>
  </div>
</template>

<script>
  export default{
    props: ["host"]
  }
</script>

<style>
  .host{
    display: flex;
    flex-direction: column;
    min-width: 300px;
    color: white;
  }

  .host .head{
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #4C92B5;
    font-family: Nunito, Quicksand, sans-serif;
  }

  .host .head img{
    margin-left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 5px 0;
  }

  .host h4{
    margin: 0;
    margin-left: 20px;
    font-size: 1.1em;
    font-weight: 100;
  }

  .storage-img{
  }

  .storage-img img{
    width: 100%;
  }
</style>
