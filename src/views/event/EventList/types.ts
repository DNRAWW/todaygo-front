export type TEvent = {
  id: number;
  name: string;
  duration: number;
  tags: string[];
  address: string;
  createdAt: number;
  date: string;
  description: string;
  maxNumberOfParticipants: number;
  organizerId: number;
  numberOfParticipants: number;
  price: number;
  city: {
    id: number;
    name: string;
  };
};

export type GetAllEventsResponse = {
  data: {
    data: TEvent[];
    count: number;
  };
};

export type DateParams = {
  min: string | null;
  max: string | null;
};
