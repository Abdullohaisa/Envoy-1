import { IExpectedArrivalTime } from "@/types/order";
import DateNames from "@/widget/customer/get-order/get-order-form/date/date-names";

export const formatDate = (input?: string | IExpectedArrivalTime | null) => {
  if (!input) return; // null yoki undefined bo'lsa, hech narsa qaytarmaydi

  const { monthNames } = DateNames();

  let day: number;
  let monthIndex: number;
  let year: number;

  // 🔹 Agar bu object bo‘lsa (masalan: { day: 23, month: 10, year: 2025 })
  if (typeof input === "object") {
    if (!input.day || !input.month || !input.year) return; // null bo'lsa qaytarmaydi
    day = input.day;
    monthIndex = input.month - 1; // Date’da 0-based index
    year = input.year;
  } else {
    // 🔹 Aks holda, string bo‘lsa (masalan: "2025-11-09 09:34:35.135205+00:00")
    const date = new Date(input);
    if (isNaN(date.getTime())) return; // invalid string bo'lsa
    day = date.getDate();
    monthIndex = date.getMonth();
    year = date.getFullYear();
  }

  const month = monthNames[monthIndex];
  return `${day}-${month} ${year}`;
};

export function formatTimeDiff(start: string, end: string) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  const diffMs = Math.abs(date2.getTime() - date1.getTime()); // millisekund

  const diffMinutes = Math.floor(diffMs / (1000 * 60)); // to‘liq daqiqa
  const hours = Math.floor(diffMinutes / 60); // soat
  const minutes = diffMinutes % 60; // qolgan daqiqa

  if (hours > 0) {
    return `${hours} soat ${minutes} daqiqa`;
  } else {
    return `${minutes} daqiqa`;
  }
}
