import { ADD_ROLE, ADD_PERSON_ID, ADD_VISIBLE_NAME } from "@/store/constants";
import { MutationTree } from "vuex";
import { UserState } from "./types";

export const mutations: MutationTree<UserState> = {
  [ADD_VISIBLE_NAME](state: UserState, name: string): void {
    state.visibleName = name;
  },
  [ADD_ROLE](state: UserState, role: string): void {
    state.role = role;
  },
  [ADD_PERSON_ID](state: UserState, personId: number): void {
    state.personId = personId;
  },
};
