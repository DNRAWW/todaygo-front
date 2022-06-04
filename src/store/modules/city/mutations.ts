import { ADD_CITIES, ADD_CURRENT_CITY } from "@/store/constants";
import { MutationTree } from "vuex";
import { CitiyState, TCity } from "./types";

export const mutations: MutationTree<CitiyState> = {
  [ADD_CITIES](state: CitiyState, cities: TCity[]): void {
    state.cities = cities;
  },
  [ADD_CURRENT_CITY](state: CitiyState, citiy: TCity): void {
    state.currentCity = citiy;
  },
};
