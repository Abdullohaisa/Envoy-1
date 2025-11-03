import { AppRoutes } from "@/constants/routes";

export type TOrderButton = {
  key: string;
  title: string;
  icon: string;
  route: string;
  getValue: (order: any) => string | null;
};

// 🔹 Tugmalar ro‘yxati
export const orderButtons: TOrderButton[] = [
  {
    key: "cargo",
    title: "Yuk",
    icon: "package",
    route: AppRoutes.customer.getOrder.cargo,
    getValue: (order) => order?.cargo?.type?.value || null,
  },
  {
    key: "locations",
    title: "Manzillar",
    icon: "map-pin",
    route: AppRoutes.customer.getOrder.locations.index,
    getValue: (order) => {
      const pickup = order?.locations?.pickup?.[0]?.short_title;
      const dropoff = order?.locations?.dropoff?.[0]?.short_title;

      if (pickup && dropoff) return `${pickup} -> ${dropoff}`;
      if (pickup) return pickup;
      if (dropoff) return dropoff;
      return null;
    },
  },
  {
    key: "truck",
    title: "Mashina",
    icon: "truck",
    route: AppRoutes.customer.getOrder.truck,
    getValue: (order) => order?.truck || null,
  },
  {
    key: "price",
    title: "Narx",
    icon: "dollar-sign",
    route: AppRoutes.customer.getOrder.price,
    getValue: (order) =>
      order?.price?.value ? `${order.price.value} UZS` : null,
  },
  {
    key: "time",
    title: "Vaqt",
    icon: "calendar",
    route: AppRoutes.customer.getOrder.time,
    getValue: (order) =>
      order?.time?.deadline?.day
        ? `${order.time.deadline.day}.${order.time.deadline.month}.${order.time.deadline.year}`
        : null,
  },
  {
    key: "comment",
    title: "Izoh",
    icon: "message-square",
    route: AppRoutes.customer.getOrder.comment,
    getValue: (order) => order?.comment || null,
  },
];
