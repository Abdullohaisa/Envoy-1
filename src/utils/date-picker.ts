// utils.ts
export const getMonthDates = (year: number, month: number) => {
  const weeks: (number | null)[][] = [];
  let date = new Date(year, month, 1);
  let week: (number | null)[] = new Array(7).fill(null);

  while (date.getMonth() === month) {
    const dayOfWeek = (date.getDay() + 6) % 7; // du=0, ya=6
    week[dayOfWeek] = date.getDate();

    if (dayOfWeek === 6) {
      weeks.push(week);
      week = new Array(7).fill(null);
    }

    date.setDate(date.getDate() + 1);
  }

  if (week.some((d) => d !== null)) weeks.push(week);
  return weeks;
};
