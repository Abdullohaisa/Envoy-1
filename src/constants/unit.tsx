export type UnitType =
  | "weight"
  | "length"
  | "height"
  | "width"
  | "quantity"
  | "volume"
  | "cargoType"
  | "price"
  | "comment";

type UnitOption = { label: string; short: string };

export const UNIT_OPTIONS = (): Record<UnitType, UnitOption[]> => ({
  weight: [
    { label: t("gram"), short: t("g") },
    { label: t("kilogram"), short: t("kg") },
    { label: t("ton"), short: t("t") },
  ],
  length: [
    { label: t("centimeter"), short: t("cm") },
    { label: t("meter"), short: t("m") },
  ],
  height: [
    { label: t("centimeter"), short: t("cm") },
    { label: t("meter"), short: t("m") },
  ],
  width: [
    { label: t("centimeter"), short: t("cm") },
    { label: t("meter"), short: t("m") },
  ],
  quantity: [
    { label: t("piece"), short: t("piece") },
    { label: t("box"), short: t("box") },
    { label: t("bag"), short: t("bag") },
    { label: t("pallet"), short: t("pallet") },
    { label: t("bottle"), short: t("bottle") },
  ],
  volume: [
    { label: t("milliliter"), short: t("ml") },
    { label: t("liter"), short: t("l") },
    { label: t("cubic_meter"), short: t("m3") },
  ],
  cargoType: [],
  price: [
    { label: t("uzs"), short: t("uzs") },
    { label: t("usd"), short: t("usd") },
    { label: t("rub"), short: t("rub") },
  ],
  comment: [],
});

import ArrowIcon from "@/assets/icon/arrow";
import { t } from "i18next";
import { JSX } from "react";

export const UNIT_ICONS: Record<string, JSX.Element> = {
  // 🔹 Og'irlik
  g: <ArrowIcon />,
  kg: <ArrowIcon />,
  t: <ArrowIcon />,

  // 🔹 Uzunlik / Balans / Kenglik
  sm: <ArrowIcon />,
  m: <ArrowIcon />,

  // 🔹 Miqdor
  dona: <ArrowIcon />,
  quti: <ArrowIcon />,
  qop: <ArrowIcon />,
  palet: <ArrowIcon />,
  shisha: <ArrowIcon />,

  // 🔹 Hajm / Hajm o'lchovlari
  ml: <ArrowIcon />,
  l: <ArrowIcon />,
  "m³": <ArrowIcon />,

  // 🔹 Narxlar
  UZS: <ArrowIcon />,
  USD: <ArrowIcon />,
  RUB: <ArrowIcon />,

  // 🔹 Yuk turi va kommentariyalar
  cargoType: <ArrowIcon />,
  comment: <ArrowIcon />,
};
