import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Spacing, screens } from "@/shared/token";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";

interface MonthItemProps {
  item: { id: number; name: string; weeks: (number | null)[][] };
  selectedDate: { day: number; month: number; year: number } | null;
  setSelectedDate: (
    date: { day: number; month: number; year: number } | null
  ) => void;
  selectedYear: number;

  isToday: (day: number | null, month: number, year: number) => boolean;
  isSelectable: (day: number | null, month: number, year: number) => boolean;
  weekDays: string[];
}

const MonthItem: React.FC<MonthItemProps> = ({
  item,
  selectedDate,
  setSelectedDate,
  selectedYear,
  isToday,
  isSelectable,
  weekDays,
}) => {
  const Colors = useThemeColors();

  return (
    <View
      style={[
        styles.monthContainer,
        { borderBottomColor: Colors.borderColor04 },
      ]}
    >
      <View style={styles.weekNameBox}>
        {weekDays.map((day) => (
          <AppText
            key={day}
            style={[styles.weekNameText, { color: Colors.primary }]}
          >
            {day}
          </AppText>
        ))}
      </View>

      <View style={{ marginTop: 10 }}>
        {item.weeks.map((week, wi) => (
          <View key={wi} style={styles.dayBox}>
            {week.map((day, di) => {
              const isTodayCell = isToday(day, item.id, selectedYear);
              const isSelected =
                selectedDate &&
                selectedDate.day === day &&
                selectedDate.month === item.id &&
                selectedDate.year === selectedYear;

              const backgroundColor = isTodayCell
                ? Colors.primary08
                : isSelected
                  ? Colors.green08
                  : isSelectable(day, item.id, selectedYear)
                    ? Colors.borderColor02
                    : "transparent";

              const color = isTodayCell
                ? "#fff"
                : isSelected
                  ? "#fff"
                  : isSelectable(day, item.id, selectedYear)
                    ? Colors.textPrimary
                    : Colors.textSecondary;

              const borderColor =
                !isSelected && day && isSelectable(day, item.id, selectedYear)
                  ? "#818181"
                  : "transparent";

              return (
                <Pressable
                  key={di}
                  style={styles.dayCell}
                  disabled={!day || !isSelectable(day, item.id, selectedYear)}
                  onPress={() =>
                    setSelectedDate(
                      day ? { day, month: item.id, year: selectedYear } : null
                    )
                  }
                >
                  <AppText
                    style={[
                      styles.dayText,
                      {
                        height: 35,
                        borderColor,
                        color,
                        backgroundColor,
                      },
                    ]}
                  >
                    {day}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MonthItem;

const styles = StyleSheet.create({
  monthContainer: {
    width: screens.width,
    paddingHorizontal: Spacing.horizontal,
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    height: 287,
  },
  weekNameBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekNameText: {
    textAlign: "center",
    flex: 1,
    fontWeight: "600",
  },
  dayBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCell: {
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    textAlign: "center",
    margin: 3,
    padding: 5,
    borderRadius: 5,
    width: screens.width * 0.114,
    textAlignVertical: "center",
  },
});
