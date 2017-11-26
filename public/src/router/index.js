/**
 * @author EmmanuelOlaojo
 * @since 11/25/17
 */

import Vue from "vue"
import Router from "vue-router";
import Home from "../components/home/home.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {path: "/", component: Home}
  ]
});