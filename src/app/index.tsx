import { useThemeColors } from "@/theme/useThemeColors";
import WelcomePageDotes from "@/widget/welcome/dotes";
import { welcomePages } from "@/widget/welcome/pages";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import { WelcomePageStyles as styles } from "@/widget/welcome/style";
import WelcomeButton from "@/widget/welcome/button";
import WelcomePageRenderer from "@/widget/welcome/PageRenderer";
import WelcomeBackgroundImage from "@/widget/welcome/backgroundImage";
import WelcomeLanguageButton from "@/widget/welcome/languageButton";
import { useSharedValue } from "react-native-reanimated";

export default function Welcome() {
  const Colors = useThemeColors();
  const ref = useRef<FlatList>(null);
  const [activePage, setActivePage] = useState<number>(0);
  const welcomeScrollX = useSharedValue(0);

  const handleNext = () => {
    if (activePage < welcomePages.length - 1) {
      ref.current?.scrollToIndex({
        index: activePage + 1,
        animated: true,
      });
      setActivePage((active) => active + 1);
    } else {
      router.push("auth");
    }
  };

  const handlePrev = () => {
    if (activePage > 0) {
      ref.current?.scrollToIndex({
        index: activePage - 1,
        animated: true,
      });
      setActivePage((active) => active - 1);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors.backgroundSecondary },
      ]}
    >
      <WelcomeBackgroundImage activePage={activePage} />

      <WelcomePageRenderer
        ref={ref}
        setActivePage={setActivePage}
        welcomeScrollX={welcomeScrollX}
      />

      <WelcomeButton
        handleNext={handleNext}
        handlePrev={handlePrev}
        activePage={activePage}
      />
      {/* 
      <WelcomeLanguageButton /> */}

      <WelcomePageDotes welcomeScrollX={welcomeScrollX} />
    </View>
  );
}
