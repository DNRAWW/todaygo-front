export type TPerson = {
  id: number;
  visableName: string;
  orgName: string | null;
  role: string;
  firstName: string;
  lastName: string;
  surName: string;
  fullName: string;
  dateOfBirth: Date;
};

export type GetPerson = {
  data: TPerson;
};
