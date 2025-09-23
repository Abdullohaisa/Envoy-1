import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";

const languages = [
  // O‘rta Osiyo
  { code: "uz", label: "O‘zbek" },
  { code: "kk", label: "Qozoq" },
  { code: "ky", label: "Qirg‘iz" },
  { code: "tg", label: "Tojik" },
  { code: "tm", label: "Turkman" },

  // Yaqin tillar
  { code: "ru", label: "Rus" },
  { code: "tr", label: "Turk" },

  // Dunyo tillari
  { code: "en", label: "Ingliz" },
  { code: "zh", label: "Xitoy" },
  { code: "by", label: "Belarus" },
];

const LanguagePage = () => {
  const Colors = useThemeColors();
  const [search, setSearch] = useState("");

  const filteredLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <PageHeader title="Til tanlash" enableBack />

      {/* Qidiruv */}
      <TextInput
        style={[
          styles.searchInput,
          { backgroundColor: Colors.Boxbackground, color: Colors.textPrimary },
        ]}
        placeholder="Qidiruv..."
        placeholderTextColor={Colors.textSecondary}
        value={search}
        onChangeText={setSearch}
      />

      {/* Til ro‘yxati */}
      <FlatList
        data={filteredLanguages}
        keyExtractor={(item) => item.code}
        style={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.item, { borderBottomColor: Colors.borderColor }]}
            onPress={() => console.log("Tanlangan til:", item.code)}
          >
            <Text style={[styles.itemText, { color: Colors.textPrimary }]}>
              {item.label}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default LanguagePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    margin: 12,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemText: {
    fontSize: 16,
  },
});
