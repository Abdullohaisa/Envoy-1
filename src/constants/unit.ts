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

export const UNIT_OPTIONS: Record<UnitType, UnitOption[]> = {
  weight: [
    { label: "Gramm", short: "g" },
    { label: "Kilogramm", short: "kg" },
    { label: "Tonna", short: "t" },
  ],
  length: [
    { label: "Santimetr", short: "sm" },
    { label: "Metr", short: "m" },
  ],
  height: [
    { label: "Santimetr", short: "sm" },
    { label: "Metr", short: "m" },
  ],
  width: [
    { label: "Santimetr", short: "sm" },
    { label: "Metr", short: "m" },
  ],
  quantity: [
    { label: "Dona", short: "dona" },
    { label: "Quti", short: "quti" },
    { label: "Qop", short: "qop" },
    { label: "Palet", short: "palet" },
    { label: "Shisha", short: "shisha" }, // ichimliklar uchun
  ],
  volume: [
    { label: "Millilitr", short: "ml" },
    { label: "Litr", short: "l" },
    { label: "Kub metr", short: "m³" },
  ],
  cargoType: [], // ✅ yuk turi uchun joy (hozircha bo‘sh)
  price: [
    { label: "So'm", short: "UZS" },
    { label: "Dollar", short: "USD" },
    { label: "Rubl", short: "RUB" },
  ],
  comment: [],
};
