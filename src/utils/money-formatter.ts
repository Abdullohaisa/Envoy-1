export const moneyFormatter = (value?: string | number) => {
  if (value === undefined || value === null) return "";

  const str = String(value);
  const cleaned = str.replace(/\D/g, "");
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
