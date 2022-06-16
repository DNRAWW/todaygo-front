import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { CitiyState, TCity } from "./types";

export const getters: GetterTree<CitiyState, RootState> = {
  currentCity(state: CitiyState): TCity | null {
    return state.currentCity;
  },
  cities(state: CitiyState): TCity[] {
    return state.cities;
  },
  currentCityId(state: CitiyState) {
    return state.currentCityId;
  },
};
