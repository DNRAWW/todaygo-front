import { RootState } from "@/store/types";
import { Module } from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { UserState } from "./types";

export const state: UserState = {
  visibleName: null,
};

export const user: Module<UserState, RootState> = {
  state,
  getters,
  mutations,
};
