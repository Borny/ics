export interface SessionsKids {
  address: Address;
  schedule: Schedule;
  map?: string;
}

interface Address {
  city: string;
  venue: string;
  street: string;
  zipcode: number;
}

interface Schedule {
  day: string;
  groups: Age[];
}

interface Age {
  age: string;
  startTime: string;
  endTime: string;
}
