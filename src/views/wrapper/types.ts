export type meResponse = {
  data: {
    person: {
      id: number;
      visableName: string;
      role: string;
    };
  };
};

export type TCity = {
  id: number;
  name: string;
};

export type GetAllCititesResponse = {
  data: TCity[];
};
