import { ADD_VISIBLE_NAME } from "@/store/constants";
import { MutationTree } from "vuex";
import { UserState } from "./types";

export const mutations: MutationTree<UserState> = {
  [ADD_VISIBLE_NAME](state: UserState, name: string): void {
    state.visibleName = name;
  },
};
