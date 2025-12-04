type TCargoField<T> = {
  unit: string | null;
  value: T | null;
};

// Cargo tipi
export type TCargo = {
  type: TCargoField<string>; // faqat string bo‘ladi
  weight?: TCargoField<number>;
  volume?: TCargoField<number>;
  quantity?: TCargoField<number>;
  length?: TCargoField<number>;
  height?: TCargoField<number>;
  width?: TCargoField<number>;
};

export type TComment = string | null;

export interface ILocation {
  id: string;
  full_title: string;
  short_title: string;
  coordinates: {
    latitude: number; // kenglik → latitude
    longitude: number; // uzunlik → longitude
  };
  contact: {
    name: string;
    phone: string;
  };
}

export interface ILocations {
  pickup: ILocation[]; // olish → pickup
  dropoff: ILocation[]; // tushirish → dropoff
}

export interface IPrice {
  value: number | null;
  currency: string | null;
}

export type TTruck = number | null;

interface IDriverLocationStatus {
  id: string;
  departed: boolean;
  arrived: boolean;
}

interface IDriverStatus {
  pickup: IDriverLocationStatus[];
  dropoff: IDriverLocationStatus[];
}

type TOrderStatus = "attached" | "active" | "finished";

export interface IStatus {
  order_status: TOrderStatus;
  driver_status: IDriverStatus;
}

export interface ILocationTime {
  id: string;
  departed: string | null; // ISO string
  arrived: string | null; // ISO string yoki null
}

export interface ILocationTimes {
  pickup: ILocationTime[];
  dropoff: ILocationTime[];
}

export interface IExpectedArrivalTime {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface IOrderTime {
  expected_arrival_time: IExpectedArrivalTime;
  created: string; // ISO string: "2025-11-19 15:37:16.042908+00:00"
  location_times: ILocationTimes;
}

export interface IOrderUser {
  id: number;
  name: string;
  phone: string;
  image: string | null;
  comment_count: number | null;
  rating: {
    count: number;
    score: number;
  };
}

export interface IOrderDriver extends IOrderUser {
  driver_coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type TCreateOrder = {
  cargo: TCargo;
  truck: TTruck;
  locations: ILocations;
  price: IPrice;
  comment: TComment;
  time: {
    expected_arrival_time: IExpectedArrivalTime;
  };
};

export interface IOrder extends TCreateOrder {
  id: number;
  status: IStatus;
  time: IOrderTime;
  owner: IOrderUser;
  driver: IOrderDriver;
  requested_drivers: IOrderUser[];
}
