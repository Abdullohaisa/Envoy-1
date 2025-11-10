import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import ArrowIcon from "@/assets/icon/arrow";
import { Spacing } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";
import { Dispatch, RefObject } from "react";
import { SetStateAction } from "jotai";
import { useTranslation } from "react-i18next";

interface SelectedDate {
  day: number;
  month: number;
  year: number;
}

interface DateNavigationContainerProps {
  selectedDate: SelectedDate | null;
  monthNames: string[];
  selectedMonth: number;
  flatListRef: RefObject<FlatList<any> | null>;
  setSelectedMonth: Dispatch<SetStateAction<number>>;
  setSelectedYear: Dispatch<SetStateAction<number>>;
}

export default function DateNavigationContainer({
  selectedDate,
  monthNames,
  selectedMonth,
  flatListRef,
  setSelectedMonth,
  setSelectedYear,
}: DateNavigationContainerProps) {
  const Colors = useThemeColors();
  const { t } = useTranslation();

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
    flatListRef.current?.scrollToIndex({
      index: selectedMonth === 0 ? 11 : selectedMonth - 1,
      animated: true,
    });
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
    flatListRef.current?.scrollToIndex({
      index: selectedMonth === 11 ? 0 : selectedMonth + 1,
      animated: true,
    });
  };

  return (
    <View style={styles.navigationContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={handlePrevMonth}
          style={[styles.navButton, { borderColor: Colors.primary }]}
        >
          <ArrowIcon color={Colors.primary} />
        </TouchableOpacity>

        <View
          style={[styles.selectedDateBox, { borderTopColor: Colors.primary04 }]}
        >
          {selectedDate ? (
            <AppText style={{ fontWeight: "700", color: Colors.green }}>
              {selectedDate.day} - {monthNames[selectedDate.month]}{" "}
              {selectedDate.year}
            </AppText>
          ) : (
            <AppText
              style={[styles.selectedDateText, { color: Colors.primary }]}
            >
              <AppText>{t("select_pickup_time")}</AppText>
            </AppText>
          )}
        </View>

        <TouchableOpacity
          onPress={handleNextMonth}
          style={[styles.navButton, { borderColor: Colors.primary }]}
        >
          <ArrowIcon color={Colors.primary} direction="right" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    paddingHorizontal: Spacing.horizontal,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    padding: 12,
    borderRadius: 30,
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDateBox: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedDateText: {
    fontSize: 16,
  },
});
