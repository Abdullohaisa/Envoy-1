import { useAtomValue } from "jotai";
import { getOrderAtom } from "@/atoms/get-order";

export const useOrderFields = () => {
  const order = useAtomValue(getOrderAtom);

  const isFieldFilled = {
    cargo: !!order?.cargo?.type?.value,
    locations:
      order?.locations?.pickup?.[0]?.short_title ||
      order?.locations?.dropoff?.[0]?.short_title,
    truck: !!order?.truck,
    price: !!order?.price?.value,
    time:
      order?.time?.deadline?.day &&
      order?.time?.deadline?.month &&
      order?.time?.deadline?.year,
    comment: !!order?.comment,
  };

  const allFilled = Object.values(isFieldFilled).every(Boolean);
  const anyFilled = Object.values(isFieldFilled).some(Boolean);

  return { isFieldFilled, allFilled, anyFilled, order };
};
