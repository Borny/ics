export interface SessionsAdults {
  address: Address;
  schedule: Schedule[];
  map?: string;
}

interface Address {
  city: string;
  venue: string;
  street: string;
  zipcode: number | string;
}

interface Schedule {
  category: string;
  time: Time[];
}

interface Time {
  day: string;
  startTime: string;
  endTime: string;
}
