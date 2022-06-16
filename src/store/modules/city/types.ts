export type CitiyState = {
  currentCityId: number | null;

  currentCity: TCity | null;

  cities: TCity[];
};

export type TCity = {
  id: number;
  name: string;
};
