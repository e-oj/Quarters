<template>
  <div id="add-hosts">
    <form @submit.prevent="submit">
      <div>
        <label for="add-first-name">first name</label>
        <input v-model="first_name" id="add-first-name" type="text"/>
      </div>
      <div>
        <label for="add-last-name">last name</label>
        <input v-model="last_name" id="add-last-name" type="text"/>
      </div>
      <div>
        <label for="add-host-image">Profile Image</label>
        <input id="add-host-image" type="file"/>
      </div>
      <div>
        <label for="add-storage-image">Storage Image</label>
        <input id="add-storage-image" type="file"/>
      </div>

      <button>Submit</button>
    </form>

    <div v-if="err">{{err}}</div>
    <div v-if="done">{{done}}</div>
  </div>
</template>

<script>
  import config from "../../config"

  export default{
    data(){
      return {
        first_name: ""
        , last_name: ""
        , err: ""
        , done: ""
      }
    }
    , methods: {
      async submit(){
        let self = this;
        let formData = new FormData();
        let profileImg = $("#add-host-image")[0].files[0];
        let storageImg = $("#add-storage-image")[0].files[0];

        for(let key of ["first", "last"]){
          formData.append(`${key}_name`, self[`${key}_name`]);
        }

        formData.append("profile_img", profileImg);
        formData.append("storage_img", storageImg);

        try{
          console.log("sending...", profileImg);
          let res = await self.$http.post(`${config.BASE_URL}/api/h/`, formData);

          self.done = res.body.message;
          let $form = $("#add-hosts").find("form");

          $form.find("input").val("");
          self.first_name = "";
          self.last_name = "";
        }
        catch(err){
          self.err = err.message;
          console.log(err);
        }
      }
    }
    , mounted(){
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
