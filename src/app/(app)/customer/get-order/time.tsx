import React, { useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
  Vibration,
} from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";

const { width } = Dimensions.get("window");
const ITEM_HEIGHT = 40;
const WEEK_DAYS = ["Du", "Se", "Ch", "Pa", "Ju", "Sha", "Ya"];
const MONTH_NAMES = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

// 🔹 Sanalarni oldindan saqlaymiz 2025 dekabrgacha
const generateDates = () => {
  const today = new Date();
  const endDate = new Date(2025, 11, 31);
  const months: { month: number; year: number; days: number[] }[] = [];
  let current = new Date(today.getFullYear(), today.getMonth(), 1);

  while (current <= endDate) {
    const year = current.getFullYear();
    const month = current.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: number[] = [];

    const startDay =
      month === today.getMonth() && year === today.getFullYear()
        ? today.getDate()
        : 1;

    for (let d = startDay; d <= daysInMonth; d++) {
      days.push(d);
    }

    months.push({ month, year, days });
    current.setMonth(current.getMonth() + 1);
  }
  return months;
};

export default function MiniDatePicker() {
  const Colors = useThemeColors();
  const months = useMemo(() => generateDates(), []);
  const today = new Date();

  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const monthFlatListRef = useRef<FlatList>(null);

  const daySize = (width - 32) / 7; // 16 padding *2

  // 🔹 Oylarni scroll qilishda markazlashgan element
  const scrollToMonth = (index: number) => {
    if (index >= 0 && index < months.length) {
      monthFlatListRef.current?.scrollToIndex({ index, animated: true });
      setSelectedMonthIndex(index);
      const monthObj = months[index];
      setSelectedDay(monthObj.days[0]);
      Vibration.vibrate(10);
    }
  };

  const renderDayItem = (day: number | null) => {
    if (day === null)
      return <View style={{ width: daySize, height: daySize }} />;
    const isSelected = day === selectedDay;

    return (
      <Pressable
        onPress={() => {
          setSelectedDay(day);
          Vibration.vibrate(10);
        }}
        style={[
          styles.item,
          {
            width: daySize,
            height: daySize,
            backgroundColor: isSelected ? Colors.primary : Colors.Boxbackground,
            borderColor: Colors.borderColor,
            borderWidth: 1,
          },
        ]}
      >
        <Text
          style={{
            color: isSelected ? "#fff" : Colors.textPrimary,
            fontWeight: isSelected ? "bold" : "normal",
          }}
        >
          {day}
        </Text>
      </Pressable>
    );
  };

  const renderMonthPage = ({
    item: monthObj,
  }: {
    item: { month: number; year: number; days: number[] };
  }) => {
    const weeks: (number | null)[][] = [];
    let temp: (number | null)[] = [];

    monthObj.days.forEach((day, i) => {
      temp.push(day);
      if ((i + 1) % 7 === 0) {
        weeks.push(temp);
        temp = [];
      }
    });
    if (temp.length > 0) {
      while (temp.length < 7) temp.push(null);
      weeks.push(temp);
    }

    return (
      <View style={{ width }}>
        <Text style={[styles.monthTitle, { color: Colors.textPrimary }]}>
          {MONTH_NAMES[monthObj.month]} {monthObj.year}
        </Text>

        {/* Hafta kunlari */}
        <View style={styles.weekRow}>
          {WEEK_DAYS.map((wd, i) => (
            <Text
              key={i}
              style={[
                styles.weekDayText,
                {
                  width: daySize,
                  textAlign: "center",
                  color: Colors.textSecondary,
                },
              ]}
            >
              {wd}
            </Text>
          ))}
        </View>

        {weeks.map((week, wIndex) => (
          <View key={wIndex} style={styles.weekRow}>
            {week.map((day, dIndex) => (
              <View key={dIndex}>{renderDayItem(day)}</View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackground }}>
      <PageHeader title="Tanlangan Sana" enableBack />
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={[styles.selectedDateText, { color: Colors.textPrimary }]}>
          {selectedDay} {MONTH_NAMES[months[selectedMonthIndex].month]}{" "}
          {months[selectedMonthIndex].year}
        </Text>

        <FlatList
          ref={monthFlatListRef}
          data={months}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          pagingEnabled
          renderItem={renderMonthPage}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            scrollToMonth(index);
          }}
        />

        {/* Buttonlar */}
        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => scrollToMonth(selectedMonthIndex - 1)}
            style={[styles.navButton, { backgroundColor: Colors.primary }]}
          >
            <Text style={{ color: "#fff" }}>⬅ Oldingi Oy</Text>
          </Pressable>
          <Pressable
            onPress={() => scrollToMonth(selectedMonthIndex + 1)}
            style={[styles.navButton, { backgroundColor: Colors.primary }]}
          >
            <Text style={{ color: "#fff" }}>Keyingi Oy ➡</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: "600",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    margin: 1,
  },
  selectedDateText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
