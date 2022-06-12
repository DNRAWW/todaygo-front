export type TPerson = {
  id: number;
  visibleName: string;
  orgName: string | null;
  role: string;
  firstName: string;
  lastName: string;
  surName: string;
  fullName: string;
};

export type GetPerson = {
  data: TPerson;
};
