import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { UserState } from "./types";

export const getters: GetterTree<UserState, RootState> = {
  visibleName(state: UserState) {
    return state.visibleName;
  },
  role(state: UserState) {
    return state.role;
  },
  personId(state: UserState) {
    return state.personId;
  },
};
