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
};

export type GetAllEventsResponse = {
  data: {
    data: TEvent[];
    count: number;
  };
};
