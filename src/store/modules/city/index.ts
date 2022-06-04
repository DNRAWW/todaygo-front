import { RootState } from "@/store/types";
import { Module } from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { CitiyState } from "./types";

export const state: CitiyState = {
  currentCity: {
    id: 1,
    name: "Санкт-Петербург",
  },
  cities: [],
};

export const user: Module<CitiyState, RootState> = {
  state,
  getters,
  mutations,
};
