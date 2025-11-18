import { StyleSheet, View, FlatList, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { Fonts } from "@/shared/token";
import AppText from "@/components/Texts/Text";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/locales/_i18n";
import i18n from "@/locales/_i18n"; // import qilib olayapmiz, tilni tekshirish uchun

// NOTE: bu yerda code'lar _i18n resources_ bilan mos bo'lishi kerak
const languages = [
  { code: "uzbekistan", nativeName: "Oʻzbekcha" },
  { code: "uzbekistan_cyril", nativeName: "Ўзбекча (кирилча)" },
  { code: "russia", nativeName: "Русский" },
  { code: "english", nativeName: "English" },
  { code: "turkey", nativeName: "Türkçe" },
  { code: "kazakhstan", nativeName: "Қазақша" },
  { code: "kyrgyzstan", nativeName: "Кыргызча" },
  { code: "tajikistan", nativeName: "Тоҷикӣ" },
  { code: "turkmenistan", nativeName: "Türkmençe" },
  { code: "china", nativeName: "中文" },
  { code: "belarus", nativeName: "Беларуская" },
];

const LanguagePage = () => {
  const Colors = useThemeColors();
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  // currentLang yordamida rerenderni majbur qilamiz
  const [currentLang, setCurrentLang] = useState(i18n.language || "uzbekistan");

  useEffect(() => {
    const handler = (lng: any) => setCurrentLang(lng);
    i18n.on("languageChanged", handler);
    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);

  // Qidiruv filter (nativeName ga qaraydi)
  const filteredLanguages = languages.filter((lang) =>
    lang.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectLanguage = async (langCode: string) => {
    // changeLanguage ni chaqiramiz va state i18n.on orqali yangilanadi
    await setLanguage(langCode);
    // agar kerak bo'lsa, darhol ham update qilamiz
    setCurrentLang(langCode);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      {/* agar PageHeader ichida useTranslation ishlamasa, uni key orqali rerender qilyapmiz */}
      <PageHeader title={t("choose_language")} enableBack key={currentLang} />

      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: Colors.Boxbackground,
            color: Colors.textPrimary,
            fontFamily: Fonts.regular,
          },
        ]}
        placeholder={t("search_placeholder")}
        placeholderTextColor={Colors.textSecondary}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredLanguages}
        keyExtractor={(item) => item.code}
        style={{ flexGrow: 1 }}
        renderItem={({ item }) => {
          const isActive =
            currentLang === item.code || i18n.language === item.code;
          return (
            <Pressable
              style={[
                styles.item,
                {
                  marginHorizontal: 10,
                  borderBottomColor: Colors.borderColor,
                  backgroundColor: isActive
                    ? Colors.primary + "22"
                    : "transparent",
                },
              ]}
              onPress={() => handleSelectLanguage(item.code)}
            >
              <AppText
                style={[
                  styles.itemText,
                  {
                    color: Colors.textPrimary,
                    fontFamily: Fonts.regular,
                  },
                ]}
              >
                {item.nativeName} {isActive ? "✓" : ""}
              </AppText>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default LanguagePage;

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchInput: { margin: 12, padding: 12, borderRadius: 12, fontSize: 16 },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
  itemText: { fontSize: 16 },
});
