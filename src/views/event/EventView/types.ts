import { TEvent } from "../EventList/types";

export type GetOneEvent = {
  data: TEvent;
};

export type GetOneOrg = {
  data: {
    orgName: string | null;
  };
};

export type TCommenter = {
  visableName: string;
};

export type TComment = {
  comment: {
    id: number;
    text: string;
    person: TCommenter;
  };
};

export type GetCommentsResponse = {
  data: {
    data: TComment[];
    count: number;
  };
};

export type CreateCommentResponse = {
  data: number;
};
