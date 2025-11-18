import { StyleSheet, Text, View } from "react-native";
import TabIndicator from "./TabIndicator";
import TabButton from "./TabButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import { useThemeColors } from "@/theme/useThemeColors";
import { Radius, Shadow } from "@/shared/token";

const TabHeader = ({ pages, handlePress, scrollX }: any) => {
  const insetTop = useSafeAreaInsets().top;
  const theme = useAtomValue(themeAtom);
  const Colors = useThemeColors();
  return (
    <View
      style={[
        styles.header,
        {
          height: 55 + insetTop,
          backgroundColor:
            theme === "light" ? Colors.primary : Colors.Boxbackground,
        },
        Shadow.medium,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {pages.map((p: any, i: any) => {
          return (
            <TabButton
              pages={pages}
              key={p.key}
              title={p.title}
              index={i}
              scrollX={scrollX}
              onPress={() => handlePress(i)} // button bosilganda shu pagega o'tadi
              dataLength={p.component()?.props?.orders?.length}
            />
          );
        })}
      </View>
      <TabIndicator scrollX={scrollX} pages={pages} />
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  header: {
    position: "relative",
    justifyContent: "flex-end",
    paddingBottom: 5,
    borderRadius: Radius.primary,
  },
});
