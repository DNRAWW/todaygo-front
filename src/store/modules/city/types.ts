export type CitiyState = {
  currentCity: TCity | null;

  cities: TCity[];
};

export type TCity = {
  id: number;
  name: string;
};
