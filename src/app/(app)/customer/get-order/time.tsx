import { useState, useEffect, useMemo, useRef } from "react";
import { View, FlatList } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import DateHeader from "@/widget/customer/get-order/get-order-form/date/header";
import DateNavigationContainer from "@/widget/customer/get-order/get-order-form/date/navigationContainer";
import MonthList from "@/widget/customer/get-order/get-order-form/date/monthList";
import DateNames from "@/widget/customer/get-order/get-order-form/date/date-names";
import { getMonthDates } from "@/utils/date-picker";

export default function DatePicker() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [currentDate, setCurrentDate] = useState(new Date());
  const flatListRef = useRef<FlatList | null>(null);
  const { monthNames, weekDays } = DateNames();
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);

  useEffect(() => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    setCurrentDate(today);
  }, []);

  const monthsData = useMemo(
    () =>
      Array.from({ length: 12 }, (_, monthIndex) => ({
        id: monthIndex,
        name: monthNames[monthIndex],
        weeks: getMonthDates(selectedYear, monthIndex),
      })),
    [selectedYear]
  );

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title="Yuklash vaqti" enableBack />

      <DateHeader
        selectedYear={selectedYear}
        monthNames={monthNames}
        selectedMonth={selectedMonth}
      />

      <MonthList
        flatListRef={flatListRef}
        monthsData={monthsData}
        setSelectedMonth={setSelectedMonth}
        currentDate={currentDate}
        weekDays={weekDays}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedYear={selectedYear}
      />

      <DateNavigationContainer
        selectedDate={selectedDate}
        monthNames={monthNames}
        flatListRef={flatListRef}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
    </View>
  );
}
