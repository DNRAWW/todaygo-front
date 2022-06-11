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
import { LOGIN, SIGNUP } from "@/router/routes";
import { meResponse } from "./types";

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

  private async mounted() {
    this.setCities([
      {
        id: 1,
        name: "Санкт-Петербург",
      },
      {
        id: 2,
        name: "Москва",
      },
      {
        id: 3,
        name: "Челябинск",
      },
    ]);

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
    } catch {
      return;
    }
  }

  protected logout() {
    localStorage.removeItem("token");
    this.$store.commit(ADD_VISIBLE_NAME, null);
  }
}

export default Wrapper;
