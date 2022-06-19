import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import {
  ADMIN_PANEL,
  EVENT_CREATE,
  EVENT_EDIT,
  EVENT_LIST,
  EVENT_VIEW,
  LOGIN,
  MAIN,
  PERSON_VIEW,
  PROFILE_EDIT,
  SIGNUP,
} from "./routes";
import MainWrapper from "../views/wrapper/index.vue";
import EventList from "../views/event/EventList/index.vue";
import EventView from "../views/event/EventView/index.vue";
import Login from "../views/auth/login/index.vue";
import SignUp from "../views/auth/signup/index.vue";
import PersonView from "../views/person/PersonView/index.vue";
import PersonEdit from "../views/person/PersonEdit/index.vue";
import EventEdit from "../views/event/EventEdit/index.vue";
import AdminPanel from "../views/adminPanel/index.vue";

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
        path: EVENT_CREATE,
        name: EVENT_CREATE,
        component: EventEdit,
      },
      {
        path: EVENT_EDIT,
        name: EVENT_EDIT,
        component: EventEdit,
      },
      {
        path: PERSON_VIEW,
        name: PERSON_VIEW,
        component: PersonView,
      },
      {
        path: PROFILE_EDIT,
        name: PROFILE_EDIT,
        component: PersonEdit,
      },
      {
        path: ADMIN_PANEL,
        name: ADMIN_PANEL,
        component: AdminPanel,
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
