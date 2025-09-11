import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const PickUpLocation = () => {
  const [query, setQuery] = useState(""); // inputdagi yozuv
  const [suggestions, setSuggestions] = useState<string[]>([
    "Chilonzor",
    "Amir Temur xiyoboni",
    "Yunusobod",
    "Sergeli",
  ]); // hozircha soxta ma'lumot

  const handleSelect = (item: string) => {
    setQuery(item); // tanlaganida inputga yoziladi
    console.log("Tanlangan manzil:", item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Yuk olinadigan manzil</Text>

      <TextInput
        style={styles.input}
        placeholder="Manzil kiriting..."
        value={query}
        onChangeText={setQuery}
      />

      {/* Takliflar ro'yxati */}
      {query.length > 0 && (
        <FlatList
          data={suggestions.filter((s) =>
            s.toLowerCase().includes(query.toLowerCase())
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.suggestionItem}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default PickUpLocation;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

// Shuni yodda tut: bepul versiyada cheklovlar bor — kuniga 25 000 so‘rov va 1 000 ta geocoder so‘rov.
