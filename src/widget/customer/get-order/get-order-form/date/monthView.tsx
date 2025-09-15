import { View, StyleSheet, Pressable } from "react-native";
import AppText from "@/components/Texts/Text";

const weekDays = ["du", "se", "ch", "pa", "ju", "sh", "ya"];

export default function MonthView({
  item,
  year,
  selectedDate,
  onSelectDate,
  isToday,
  Colors,
}: any) {
  return (
    <View style={styles.monthContainer}>
      {/* Haftaning kunlari */}
      <View style={styles.weekNameBox}>
        {weekDays.map((day: string) => (
          <AppText
            key={day}
            style={[styles.weekNameText, { color: Colors.primary }]}
          >
            {day}
          </AppText>
        ))}
      </View>

      {/* Oyning kunlari */}
      <View style={{ marginTop: 10 }}>
        {item.weeks.map((week: (number | null)[], wi: number) => (
          <View key={wi} style={styles.dayBox}>
            {week.map((day: number | null, di: number) => {
              const isTodayCell = isToday(day, item.id, year);
              const isSelected =
                selectedDate &&
                selectedDate.day === day &&
                selectedDate.month === item.id &&
                selectedDate.year === year;

              return (
                <Pressable
                  key={di}
                  style={styles.dayCell}
                  disabled={!day}
                  onPress={() =>
                    onSelectDate(day ? { day, month: item.id, year } : null)
                  }
                >
                  <AppText
                    style={[
                      styles.dayText,
                      {
                        height: 35,
                        borderWidth: 1,
                        borderColor: day ? "#d7d7d7" : "transparent",
                        color: isTodayCell
                          ? "#fff"
                          : isSelected
                            ? "#fff"
                            : Colors.textPrimary,
                        backgroundColor: isTodayCell
                          ? Colors.primary
                          : isSelected
                            ? Colors.green
                            : "transparent",
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
}

const styles = StyleSheet.create({
  monthContainer: { width: 380, marginTop: 10 }, // screens.width o‘rniga
  weekNameBox: { flexDirection: "row", justifyContent: "space-between" },
  weekNameText: { textAlign: "center", flex: 1, fontWeight: "600" },
  dayBox: { flexDirection: "row", justifyContent: "space-between" },
  dayCell: { justifyContent: "center", alignItems: "center" },
  dayText: {
    textAlign: "center",
    margin: 3,
    padding: 5,
    borderRadius: 5,
    width: 50,
    textAlignVertical: "center",
  },
});
