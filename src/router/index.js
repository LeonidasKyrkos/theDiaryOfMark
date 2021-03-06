import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Admin from "@/components/Admin";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/phrases/:phrase",
            name: "Phrase",
            component: Home
        },
        {
            path: "/admin",
            name: "Admin",
            component: Admin
        }
    ]
});
