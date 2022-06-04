import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { UserState } from "./types";

export const getters: GetterTree<UserState, RootState> = {
  visibleName(state: UserState) {
    return state.visibleName;
  },
};
