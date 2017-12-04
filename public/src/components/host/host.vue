<template>
  <div class="host">
    <div class="head">
      <img :src="base64Img(host.profile_img)"/>
      <h4>{{host.first_name + " " + host.last_name}}</h4>
      <a id="linkedin" target="_blank" v-if="host.linkedIn" :href="host.linkedIn" ><i class="fa fa-linkedin-square fa-2x" ></i></a>
    </div>
    <div class="storage-img">
      <img :src="base64Img(host.storage_img)"/>
    </div>
  </div>
</template>

<script>
  export default{
    props: ["host"]
    , methods: {
      base64Img(img){
        return `data:${img.mimetype};base64,${img.data}`
      }
    }
  }
</script>

<style>

  .host{
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 300px;
    color: white;
    position: relative;
  }
  #linkedin{
    position: absolute;
    left: 250px;
    right: 20px;
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
  a { color: inherit; }
</style>
