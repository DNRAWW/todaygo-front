import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { CitiyState, TCity } from "./types";

export const getters: GetterTree<CitiyState, RootState> = {
  currentCityId(state: CitiyState): number {
    return state.currentCity.id;
  },
  currentCityName(state: CitiyState): string {
    return state.currentCity.name;
  },
  cities(state: CitiyState): TCity[] {
    return state.cities;
  },
};
