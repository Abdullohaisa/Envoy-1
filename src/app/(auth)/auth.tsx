import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import AppText from "@/components/Texts/Text";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import AppButton from "@/components/Buttons/Button";

const authPages = [
  { id: 1, title: "Login" },
  { id: 2, title: "Register" },
];

export default function Auth() {
  const Colors = useThemeColors();
  const [activePage, setActivePage] = useState<number>(0);
  const ref = useRef<ScrollView>(null);

  const handleScrollTo = (index: number) => {
    ref.current?.scrollTo({ x: screens.width * index, animated: true });
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Tablar */}
      <View style={styles.tabs}>
        {authPages.map((page, index) => (
          <Pressable
            key={page.id}
            onPress={() => handleScrollTo(index)}
            style={[
              styles.tab,
              {
                borderBottomWidth: activePage === index ? 1 : 0,
                borderColor: Colors.primary,
              },
            ]}
          >
            <AppText style={{ color: Colors.textPrimary }}>
              {page.title}
            </AppText>
          </Pressable>
        ))}
      </View>

      {/* Scroll pages */}
      <ScrollView
        ref={ref}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        onMomentumScrollEnd={(e) => {
          const offset = e.nativeEvent.contentOffset.x;
          const index = Math.round(offset / screens.width);
          setActivePage(index);
        }}
      >
        {/* Login Page */}
        <View style={styles.page}>
          <TextInput
            placeholder="Telefon raqami"
            keyboardType="phone-pad"
            style={[
              styles.input,
              { borderColor: Colors.primary, color: Colors.textPrimary },
            ]}
            placeholderTextColor={Colors.textSecondary}
          />
          <TextInput
            placeholder="Parol"
            secureTextEntry
            style={[
              styles.input,
              { borderColor: Colors.primary, color: Colors.textPrimary },
            ]}
            placeholderTextColor={Colors.textSecondary}
          />
          <AppText style={[styles.forgot, { color: Colors.primary }]}>
            Parolni unutdingizmi?
          </AppText>
        </View>

        {/* Register Page */}
        <View style={styles.page}>
          <TextInput
            placeholder="Telefon raqami"
            keyboardType="phone-pad"
            style={[
              styles.input,
              { borderColor: Colors.primary, color: Colors.textPrimary },
            ]}
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
      </ScrollView>

      {/* Umumiy pastdagi button */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        keyboardVerticalOffset={10}
      >
        <View style={styles.buttonContainer}>
          <AppButton text={activePage === 0 ? "Kirish" : "Ro'yxatdan o'tish"} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    marginTop: screens.height * 0.05,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  page: {
    paddingTop: 30,
    width: screens.width,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  forgot: {
    marginTop: 10,
    fontSize: 14,
    alignSelf: "flex-end",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    flex: 1,
    width: "100%",
    paddingHorizontal: screens.width * 0.04,
  },
});
