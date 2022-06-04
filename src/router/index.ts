import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { MAIN } from "./routes";
import MainWrapper from "../views/wrapper/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: MAIN,
    name: MAIN,
    component: MainWrapper,
    children: [],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
