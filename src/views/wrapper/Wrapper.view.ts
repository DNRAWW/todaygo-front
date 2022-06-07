import { ADD_CITIES, ADD_CURRENT_CITY } from "@/store/constants";
import { TCity } from "@/store/modules/city/types";
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { LOGIN, SIGNUP } from "@/router/routes";

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

  private mounted() {
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
      params: null,
    };
  }
  protected makeSignUpLink() {
    return {
      name: SIGNUP,
      params: null,
    };
  }
}

export default Wrapper;
