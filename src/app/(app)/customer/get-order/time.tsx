import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { View, FlatList, BackHandler } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import DateHeader from "@/widget/customer/get-order/get-order-form/date/header";
import DateNavigationContainer from "@/widget/customer/get-order/get-order-form/date/navigationContainer";
import MonthList from "@/widget/customer/get-order/get-order-form/date/monthList";
import DateNames from "@/widget/customer/get-order/get-order-form/date/date-names";
import { getMonthDates } from "@/utils/date-picker";
import GetOrderNextButton from "@/widget/customer/get-order/next-button";
import { Spacing } from "@/shared/token";
import { router, useFocusEffect } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { useAtom, useSetAtom } from "jotai";
import { getOrderTime } from "@/atoms/get-order/time";
import GetOrderBackButton from "@/widget/customer/get-order/back-button";
import { safeNavigate } from "@/utils/safe-navigation";

export default function DatePicker() {
  const [time, setTime] = useAtom(getOrderTime);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [currentDate, setCurrentDate] = useState(new Date());
  const flatListRef = useRef<FlatList | null>(null);
  const { monthNames, weekDays } = useMemo(() => DateNames(), []);
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(
    time?.deadline?.day && time?.deadline?.month && time?.deadline?.year
      ? {
          day: time.deadline.day,
          month: time.deadline.month,
          year: time.deadline.year,
        }
      : null
  );

  useEffect(() => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    if (
      selectedDate?.day &&
      selectedDate?.month != null &&
      selectedDate?.year
    ) {
      setTime({ deadline: selectedDate });
    }
  }, [selectedDate]);

  const monthsData = useMemo(
    () =>
      Array.from({ length: 12 }, (_, monthIndex) => ({
        id: monthIndex,
        name: monthNames[monthIndex],
        weeks: getMonthDates(selectedYear, monthIndex),
      })),
    [selectedYear]
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        safeNavigate(() => router.replace(AppRoutes.customer.getOrder.index));
        return true;
      };
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => sub.remove();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <PageHeader
        title="Yuklash vaqti"
        enableBack
        routePath={AppRoutes.customer.getOrder.index}
      />

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

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 20,
          paddingHorizontal: Spacing.horizontal,
        }}
      >
        <GetOrderBackButton
          title="Narx"
          onPress={() =>
            safeNavigate(() => router.push(AppRoutes.customer.getOrder.price))
          }
        />
        <GetOrderNextButton
          title="Izoh"
          onPress={() => {
            safeNavigate(() =>
              router.push(AppRoutes.customer.getOrder.comment)
            );
          }}
        />
      </View>
    </View>
  );
}
