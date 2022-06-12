import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import {
  EVENT_LIST,
  EVENT_VIEW,
  LOGIN,
  MAIN,
  PERSON_VIEW,
  SIGNUP,
} from "./routes";
import MainWrapper from "../views/wrapper/index.vue";
import EventList from "../views/event/EventList/index.vue";
import EventView from "../views/event/EventView/index.vue";
import Login from "../views/auth/login/index.vue";
import SignUp from "../views/auth/signup/index.vue";
import PersonView from "../views/person/PersonView/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: LOGIN,
    name: LOGIN,
    component: Login,
  },
  {
    path: SIGNUP,
    name: SIGNUP,
    component: SignUp,
  },
  {
    path: MAIN,
    name: MAIN,
    component: MainWrapper,
    children: [
      {
        path: EVENT_LIST,
        name: EVENT_LIST,
        component: EventList,
      },
      {
        path: EVENT_VIEW,
        name: EVENT_VIEW,
        component: EventView,
      },
      {
        path: PERSON_VIEW,
        name: PERSON_VIEW,
        component: PersonView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
