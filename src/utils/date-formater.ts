import DateNames from "@/widget/customer/get-order/get-order-form/date/date-names";

type DeadlineType = {
  day: number;
  month: number;
  year: number;
};

export const formatDate = (input: string | DeadlineType) => {
  const { monthNames } = DateNames();

  let day: number;
  let monthIndex: number;
  let year: number;

  // 🔹 Agar bu object bo‘lsa (masalan: { day: 23, month: 10, year: 2025 })
  if (typeof input === "object") {
    day = input.day;
    monthIndex = input.month - 1; // Date’da 0-based index
    year = input.year;
  } else {
    // 🔹 Aks holda, string bo‘lsa (masalan: "2025-11-09 09:34:35.135205+00:00")
    const date = new Date(input);
    day = date.getDate();
    monthIndex = date.getMonth();
    year = date.getFullYear();
  }

  const month = monthNames[monthIndex];
  return `${day}-${month} ${year}`;
};
