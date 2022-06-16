import { RootState } from "@/store/types";
import { Module } from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { CitiyState } from "./types";

export const state: CitiyState = {
  currentCityId: <number | null>localStorage.getItem("currentCityId") ?? 1,
  currentCity: null,
  cities: [],
};

export const city: Module<CitiyState, RootState> = {
  state,
  getters,
  mutations,
};
