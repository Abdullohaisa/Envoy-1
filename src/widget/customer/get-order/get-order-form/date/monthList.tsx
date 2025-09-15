import { StyleSheet, View, FlatList } from "react-native";
import React, { RefObject } from "react";
import { screens } from "@/shared/token";
import MonthItem from "./monthItem";

interface MonthListProps {
  monthsData: { id: number; name: string; weeks: (number | null)[][] }[];
  flatListRef: RefObject<FlatList<any> | null>;
  currentDate: Date;
  setSelectedMonth: (month: number) => void;
  selectedDate: any;
  setSelectedDate: (a: any) => void;
  selectedYear: any;
  weekDays: any;
}

const MonthList: React.FC<MonthListProps> = ({
  monthsData,
  flatListRef,
  currentDate,
  setSelectedMonth,
  selectedDate,
  setSelectedDate,
  selectedYear,
  weekDays,
}) => {
  const renderMonthItem = ({
    item,
  }: {
    item: MonthListProps["monthsData"][number];
  }) => (
    <MonthItem
      item={item}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      selectedYear={selectedYear}
      isToday={isToday}
      isSelectable={isSelectable}
      weekDays={weekDays}
    />
  );

  const isSelectable = (day: number | null, month: number, year: number) => {
    if (day === null) return false;

    const date = new Date(year, month, day); // shu katak sanasi
    const today = new Date(); // hozirgi sana
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30); // 30 kun qo'shamiz

    return date >= today && date <= maxDate;
  };

  const isToday = (day: number | null, month: number, year: number) => {
    if (day === null) return false;

    return (
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    );
  };

  const getItemLayout = (_: any, index: number) => ({
    length: screens.width,
    offset: screens.width * index,
    index,
  });

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={monthsData}
        renderItem={renderMonthItem}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / screens.width
          );
          setSelectedMonth(index);
        }}
        initialScrollIndex={currentDate.getMonth()}
        windowSize={3}
        maxToRenderPerBatch={3}
        initialNumToRender={1}
      />
    </View>
  );
};

export default MonthList;

const styles = StyleSheet.create({});
