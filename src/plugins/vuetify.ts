import Vue from "vue";
import Vuetify, { UserVuetifyPreset } from "vuetify";
import "vuetify/dist/vuetify.min.css";
import ru from "vuetify/src/locale/ru";

Vue.use(Vuetify);

const opts: Partial<UserVuetifyPreset> = {
  lang: {
    current: "ru",
    locales: {
      ru,
    },
  },
  icons: {
    iconfont: "mdi",
  },
};

export default new Vuetify(opts);
