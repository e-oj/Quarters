/**
 * @author EmmanuelOlaojo
 * @since 11/25/17
 */

import Vue from "vue"
import Router from "vue-router";
import Home from "../components/home/home.vue"
import Registration from "../components/registration/registration.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {path: "/", component: Home},
    {path:"/register", component: Registration}
  ]
});
