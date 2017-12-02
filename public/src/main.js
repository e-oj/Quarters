/* eslint-disable no-undef */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from "vue-resource";

Vue.use(VueResource);

let $window;
let $nav;

new Vue({
  el: "#app"
  , data: {
    stickyNav: false
  }
  , template: "<App/>"
  , components: {App}
  , methods: {

    /**
     * toggles sticky nav
     */
    toggleSticky(){
      const self = this;

      $nav.toggleClass("sticky-nav");
      self.stickyNav = !self.stickyNav;
    }

    /**
     * This beautiful function is responsible
     * for making the nav sticky
     */
    , actSticky(){
      const self = this;
      let MAX_SCROLL = 0.9;
      let top = $window.scrollTop();

      if(top > MAX_SCROLL && !self.stickyNav){
        self.toggleSticky();
      }
      else if(top < MAX_SCROLL && self.stickyNav){
        self.toggleSticky();
      }
    }
  }

  /**
   * Called by vue when the component
   * has been mounted
   */
  , mounted(){
    let self = this;
    const FONT_RATIO = 0.1;
    let $body = $("body");

    $body.css({
      fontSize: (window.screen.availWidth * FONT_RATIO) + "px"
    });

    $window = $(window);
    $nav = $("#nav");

    $window.on("scroll", function(){
      self.actSticky();
    });
  }
  , router
});
