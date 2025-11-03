import { atom } from "jotai";

// Har bir field uchun type
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

// Cargo uchun atom
export const getOrderCargoAtom = atom<TCargo>({
  type: { value: "", unit: null },
});

import { CargoType } from "@/shared/validation/get-order/cargo-schema";

export const normalizeCargoData = (data: CargoType) => {
  // Bo'sh qiymatlarni olib tashlash
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key, field]) => {
      if (key === "type") {
        return field.value?.trim() !== "";
      }
      return field.value !== "" && field.value !== null;
    })
  );

  // Raqamlashtirish
  const normalizedData = Object.fromEntries(
    Object.entries(filteredData).map(([key, field]) => {
      if (key === "type") {
        return [key, field]; // string saqlanadi
      }
      return [key, { ...field, value: Number(field.value) || 0 }];
    })
  );

  return normalizedData;
};
