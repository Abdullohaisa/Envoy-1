import { useThemeColors } from "@/theme/useThemeColors";
import { WelcomePages } from "./pages";
import AppImage from "@/components/Image/Image";
import AppTitle from "@/components/Texts/Title";
import AppDesc from "@/components/Texts/Desc";

import { WelcomePageStyles as styles } from "./style";
import { View } from "react-native";

const WelcomePageItem = ({ item }: { item: WelcomePages }) => {
  const Colors = useThemeColors();

  return (
    <View style={styles.page}>
      <View style={styles.imgBox}>
        <AppImage source={item.img} contentFit="cover" />
        <View style={{ position: "absolute", bottom: 10, right: 20 }}></View>
      </View>
      <View style={styles.contentBox}>
        <AppTitle style={{ color: Colors.primary }}>{item.title}</AppTitle>
        <AppDesc>{item.desc}</AppDesc>
      </View>
    </View>
  );
};

export default WelcomePageItem;
