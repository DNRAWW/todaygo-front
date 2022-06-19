import {
  ADD_CITIES,
  ADD_CURRENT_CITY,
  ADD_ROLE,
  ADD_PERSON_ID,
  ADD_VISIBLE_NAME,
} from "@/store/constants";
import { TCity } from "@/store/modules/city/types";
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { ADMIN_PANEL, LOGIN, PERSON_VIEW, SIGNUP } from "@/router/routes";
import { GetAllCititesResponse, meResponse } from "./types";

@Component({})
export class Wrapper extends Vue {
  protected get currentCity(): TCity {
    return this.$store.getters.currentCity;
  }
  protected get cities(): TCity[] {
    return this.$store.getters.cities;
  }
  protected setCurrentCity(city: TCity) {
    this.$store.commit(ADD_CURRENT_CITY, city);
  }
  private setCities(cities: TCity[]) {
    this.$store.commit(ADD_CITIES, cities);
  }
  protected get visibleName(): TCity {
    return this.$store.getters.visibleName;
  }
  protected get role(): string {
    return this.$store.getters.role;
  }
  protected get personId(): string {
    return this.$store.getters.personId;
  }

  protected async getCities() {
    const cities: GetAllCititesResponse = await axios.get("cities/get-all");

    this.setCities(cities.data);

    return;
  }

  private async mounted() {
    await this.getCities();

    await this.getMe();

    const currentCityId = localStorage.getItem("currentCityId");

    if (!currentCityId) {
      this.setCurrentCity(this.cities[0]);
      return;
    }

    const doesCityExists = this.cities.find((i) => {
      return i.id === parseInt(currentCityId);
    });

    if (doesCityExists) {
      this.setCurrentCity(doesCityExists);
    } else {
      this.setCurrentCity(this.cities[0]);
    }
  }

  protected makeLoginLink() {
    return {
      name: LOGIN,
    };
  }
  protected makeSignUpLink() {
    return {
      name: SIGNUP,
    };
  }
  protected makeProfileLink() {
    return {
      name: PERSON_VIEW,
      params: {
        id: this.personId,
      },
    };
  }
  protected makeAdminLink() {
    return {
      name: ADMIN_PANEL,
    };
  }

  protected async getMe() {
    if (!localStorage.getItem("token")) {
      return;
    }

    try {
      const me: meResponse = await axios.get("users/me");

      if (me.data.person.visableName) {
        this.$store.commit(ADD_VISIBLE_NAME, me.data.person.visableName);
        this.$store.commit(ADD_ROLE, me.data.person.role);
        this.$store.commit(ADD_PERSON_ID, me.data.person.id);
      }

      if (me.data.person.role !== "ADMIN" && this.$route.name === ADMIN_PANEL) {
        window.location.href = "/";
      }
    } catch {
      if (this.$route.name === ADMIN_PANEL) {
        window.location.href = "/";
      }
      return;
    }
  }

  protected logout() {
    localStorage.removeItem("token");
    this.$store.commit(ADD_VISIBLE_NAME, null);
    window.location.href = "/";
  }
}

export default Wrapper;
