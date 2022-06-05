import Vue from "vue";
import App from "./views/App/index.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios, { AxiosStatic } from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.API_URL ?? "http://localhost:3000/";
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
