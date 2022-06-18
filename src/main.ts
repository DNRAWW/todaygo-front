import Vue from "vue";
import App from "./views/App/index.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios, { AxiosStatic } from "axios";

export const baseURL = process.env.API_URL ?? "http://localhost:3000/";

Vue.config.productionTip = false;
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
axios.defaults.headers.get = {
  authorization: localStorage.getItem("token") ?? "",
};
axios.defaults.headers.post = {
  authorization: localStorage.getItem("token") ?? "",
};
declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosStatic;
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
