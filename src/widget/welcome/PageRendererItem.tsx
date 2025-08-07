import { useThemeColors } from "@/theme/useThemeColors";
import { WelcomePages } from "./pages";
import AppImage from "@/components/Image/Image";
import AppTitle from "@/components/Texts/Title";
import AppDesc from "@/components/Texts/Desc";

import { WelcomePageStyles as styles } from "./style";
import { View } from "react-native";
import AppText from "@/components/Texts/Text";
import { themeAtom } from "@/theme/theme";
import { useAtomValue } from "jotai";

const WelcomePageItem = ({ item }: { item: WelcomePages }) => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);

  return (
    <View style={styles.page}>
      <View style={styles.imgBox}>
        <AppImage source={item.img} contentFit="cover" />
      </View>
      <View style={styles.contentBox}>
        <AppTitle style={{ color: Colors.primary }}>{item.title}</AppTitle>
        <AppDesc
          style={{ color: theme === "dark" ? Colors.textSecondary : "#fff" }}
        >
          {item.desc}
        </AppDesc>
      </View>
    </View>
  );
};

export default WelcomePageItem;
