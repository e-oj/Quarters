/**
 * @author EmmanuelOlaojo
 * @since 11/25/17
 */

import Vue from "vue";
import Router from "vue-router";

import Home from "../components/home/home.vue";
import Admin from "../components/admin/admin.vue";
import AdminHost from "../components/admin/add.hosts.vue";

Vue.use(Router);

export default new Router({
  mode: "history"
  , routes: [
    {path: "/", component: Home}
    , {path: "/admin"
      , component: Admin
      , children: [{
        path: "hosts"
        , component: AdminHost
      }]
    }
  ]
});
