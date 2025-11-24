export interface TruckItem {
  id: string | number;
  title: string;
  image: any;
}

export const truckData: TruckItem[] = [
  {
    id: "1",
    title: "tent",
    image: require("../assets/image/truck-1.png"),
  },
  {
    id: "2",
    title: "refrigerator",
    image: require("../assets/image/truck-2.png"),
  },
  {
    id: "3",
    title: "mega",
    image: require("../assets/image/truck-3.png"),
  },
  {
    id: "4",
    title: "semi_trailer",
    image: require("../assets/image/truck-1.png"),
  },
  {
    id: "5",
    title: "shalanda",
    image: require("../assets/image/truck-2.png"),
  },
  {
    id: "6",
    title: "lomovoz",
    image: require("../assets/image/truck-3.png"),
  },
  {
    id: "7",
    title: "trailer",
    image: require("../assets/image/truck-1.png"),
  },
];
