import Vue from "vue";
import Vuex from "vuex";
import { user } from "./modules/user/index";
import { city } from "./modules/city/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "1.0",
  },
  modules: {
    user,
    city,
  },
});
