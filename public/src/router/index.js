/**
 * @author EmmanuelOlaojo
 * @author Chike Udenze
 * @since 11/25/17
 */

import Vue from "vue";
import Router from "vue-router";

import Home from "../components/home/home.vue";
import Admin from "../components/admin/admin.vue";
import AdminHost from "../components/admin/add.hosts.vue";
import Registration from "../components/registration/registration.vue";
import Booking from "../components/booking/booking.vue";
import Hosts from "../components/host/hosts";
import Stor from "../components/your-stör/your-stör.vue";

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
    , {path: "/", component: Home}
    , {path:"/register", component: Registration}
    , {path: "/book",component: Booking}
    , {path: "/hosts", component: Hosts}
    ,{path: "/your-stor", component: Stor}
  ]
  , scrollBehavior (to) {
    if(to.hash){
      return {
        selector: to.hash
        , offset: {x: 0, y: 100}
      };
    }

    return {x: 0, y: 0};
  }
});
