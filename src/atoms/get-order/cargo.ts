import { atom } from "jotai";

// Cargo uchun atom
export const getOrderCargoAtom = atom<TCargo>({
  type: { value: "", unit: null },
});

import { CargoType } from "@/shared/validation/get-order/cargo-schema";
import { TCargo } from "@/types/order";

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
