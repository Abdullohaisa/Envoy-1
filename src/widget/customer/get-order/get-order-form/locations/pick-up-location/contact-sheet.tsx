import React, { RefObject, useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AppText from "@/components/Texts/Text";
import FontAwesome6 from "@expo/vector-icons/FontAwesome5";
import { useThemeColors } from "@/theme/useThemeColors";
import * as Contacts from "expo-contacts";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Shadow, Spacing } from "@/shared/token";
import Octicons from "@expo/vector-icons/Octicons";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface ContactItem {
  id: string;
  name: string;
  phone: string;
}

interface Props {
  locationType: string;
  location: any;
  index: number;
  contactSheetRef: RefObject<BottomSheetModalMethods | null>;
}

const ContactBottomSheet: React.FC<Props> = ({
  locationType,
  location,
  index,
  contactSheetRef,
}) => {
  const Colors = useThemeColors();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactItem[]>([]);
  const [page, setPage] = useState(0);
  const insets = useSafeAreaInsets();

  // 📲 Telefon kontaktlarini olish (faqat telefon raqamlari bo'lganlar)
  useEffect(() => {
    const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        const formatted: ContactItem[] = data
          .map((c) => ({
            id: c.id,
            name: c.name,
            phone: c.phoneNumbers?.[0]?.number || "",
          }))
          .filter((c) => c.phone); // ❌ telefon raqami bo‘lmaganlarni chiqarma

        setContacts(formatted);
        setFilteredContacts(formatted);
      }
    };

    getContacts();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(text.toLowerCase()) ||
        c.phone.includes(text)
    );
    setFilteredContacts(filtered);
  };

  const handleSelectContact = (contact: ContactItem) => {
    setName(contact.name);
    setPhone(contact.phone);
    setPage(0);
  };

  const renderItem = ({ item }: { item: ContactItem }) => (
    <TouchableOpacity
      style={[
        styles.contactItem,
        {
          backgroundColor: Colors.Boxbackground,
          borderColor: Colors.borderColor,
        },
      ]}
      onPress={() => handleSelectContact(item)}
    >
      <View style={styles.contactRow}>
        <FontAwesome6
          name="user-circle"
          size={24}
          color={Colors.textSecondary}
        />
        <View style={{ marginLeft: 10 }}>
          <AppText style={{ fontSize: 16, color: Colors.textPrimary }}>
            {item.name}
          </AppText>
          <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
            {item.phone}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <CustomBottomSheetModal
      backdropOpacity={1}
      topInset={insets.top}
      ref={contactSheetRef}
      snapPoints={["100%"]}
      backgroundStyle={{
        backgroundColor: Colors.Boxbackground,
        borderRadius: 20,
      }}
    >
      <View
        style={[styles.container, { backgroundColor: "#000", gap: 5, flex: 1 }]}
      >
        <View
          style={[
            {
              flexDirection: "row",
              paddingVertical: 10,
              gap: 10,
              alignItems: "center",
              paddingHorizontal: Spacing.horizontal,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,

              backgroundColor: Colors.Boxbackground,
            },
            Shadow.light,
          ]}
        >
          <Octicons name="location" size={24} color={Colors.primary} />

          <View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <AppText style={{ fontSize: 13, color: Colors.textSecondary }}>
                {index + 1} -{" "}
                {locationType === "pickup"
                  ? "ortish manzilida kim kutib oladi"
                  : "tushirish manzilida kim kutib oladi"}
              </AppText>
            </View>

            <AppText style={{ fontSize: 16, color: Colors.textPrimary }}>
              {location.full_title || "Manzil hali tanlanmagan"}
            </AppText>
          </View>
        </View>

        <View
          style={[
            {
              flexDirection: "column",
              paddingVertical: 10,
              gap: 10,
              paddingHorizontal: Spacing.horizontal,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: Colors.Boxbackground,
              flex: 1,
              height: "100%",
            },
            Shadow.light,
          ]}
        >
          {page === 0 && (
            <View style={{ flex: 1, gap: 10 }}>
              <TextInput
                placeholder="Ism kiriting"
                value={name}
                onChangeText={setName}
                style={[
                  styles.input,
                  {
                    borderColor: Colors.borderColor,
                    color: Colors.textPrimary,
                  },
                ]}
              />

              <View style={styles.phoneContainer}>
                <TextInput
                  placeholder="Telefon raqam kiriting"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  style={[
                    styles.input,
                    {
                      flex: 1,
                      borderColor: Colors.borderColor,
                      color: Colors.textPrimary,
                    },
                  ]}
                />
                <TouchableOpacity
                  style={[
                    styles.contactButton,
                    { backgroundColor: Colors.borderColor },
                  ]}
                  onPress={() => setPage(1)}
                >
                  <FontAwesome6
                    name="address-book"
                    size={20}
                    color={Colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {page === 1 && (
            <>
              <TextInput
                placeholder="Qidirish..."
                value={searchQuery}
                onChangeText={handleSearch}
                style={[
                  styles.input,
                  {
                    borderColor: Colors.borderColor,
                    color: Colors.textPrimary,
                  },
                ]}
              />

              <BottomSheetFlatList
                data={filteredContacts}
                keyExtractor={(item) => item.id}
                style={{ flex: 1 }}
                renderItem={renderItem}
              />
            </>
          )}
        </View>
      </View>
    </CustomBottomSheetModal>
  );
};

export default ContactBottomSheet;

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactButton: {
    padding: 10,
    borderRadius: 10,
  },
  contactItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
