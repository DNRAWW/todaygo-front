import { TPerson } from "../PersonView/types";

export type TUser = {
  id: number;
  login: string;
  person: TPerson;
};

export type userResponse = {
  data: TUser;
};
