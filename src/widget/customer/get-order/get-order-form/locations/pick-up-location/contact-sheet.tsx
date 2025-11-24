import React, { RefObject, useEffect, useState, FC } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Pressable,
} from "react-native";
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
import ArrowIcon from "@/assets/icon/arrow";
import AppButton from "@/components/Buttons/Button";
import { useAtomValue } from "jotai";
import { locationPickerState } from "@/service/customer/get-order/controller";
import { getOrderLocationStatusAtom } from "@/atoms/get-order/locations";
import { performAndroidHapticsAsync } from "expo-haptics";
import { useTranslation } from "react-i18next";

// ------------------------- TYPES -------------------------
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
  onSaveContact: (contact: { name: string; phone: string }) => void;
}

// ------------------------- COMPONENTS -------------------------
const ContactRow: FC<{
  item: ContactItem;
  onSelect: (c: ContactItem) => void;
}> = ({ item, onSelect }) => {
  const Colors = useThemeColors();
  return (
    <TouchableOpacity
      style={[
        styles.contactItem,
        {
          backgroundColor: Colors.Boxbackground,
          borderColor: Colors.borderColor,
        },
      ]}
      onPress={() => onSelect(item)}
    >
      <View style={styles.contactRow}>
        <FontAwesome6
          name="user-circle"
          size={24}
          color={Colors.textSecondary}
        />
        <View style={{ marginLeft: 15 }}>
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
};

const PageZero: FC<{
  name: string;
  phone: string;
  setName: (val: string) => void;
  setPhone: (val: string) => void;
  onNextPage: () => void;
  save: () => void;
}> = ({ name, phone, setName, setPhone, onNextPage, save }) => {
  const Colors = useThemeColors();
  const { t } = useTranslation();
  return (
    <Pressable style={{ flex: 1, gap: 10 }} onPress={() => Keyboard.dismiss()}>
      <TextInput
        placeholderTextColor={Colors.textSecondary}
        placeholder="Ism kiriting"
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          { backgroundColor: Colors.borderColor, color: Colors.textPrimary },
        ]}
      />
      <View style={styles.phoneContainer}>
        <TextInput
          placeholderTextColor={Colors.textSecondary}
          placeholder={t("enter_phone_number")}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={[
            styles.input,
            {
              flex: 1,
              backgroundColor: Colors.borderColor,
              color: Colors.textPrimary,
            },
          ]}
        />
        <TouchableOpacity
          style={[
            styles.contactButton,
            { backgroundColor: Colors.borderColor },
          ]}
          onPress={onNextPage}
        >
          <FontAwesome6
            name="address-book"
            size={20}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
      <AppButton
        title="Tanlash"
        variant="secondary"
        buttonStyle={{ borderRadius: 10 }}
        onPress={save}
      />
    </Pressable>
  );
};

const PageOne: FC<{
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filteredContacts: ContactItem[];
  onSelectContact: (c: ContactItem) => void;
  onBack: () => void;
}> = ({
  searchQuery,
  setSearchQuery,
  filteredContacts,
  onSelectContact,
  onBack,
}) => {
  const Colors = useThemeColors();
  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Pressable
          onPress={onBack}
          style={{
            padding: 10,
            backgroundColor: Colors.borderColor,
            borderRadius: 10,
            height: 42,
            width: 42,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowIcon color={Colors.textSecondary} />
        </Pressable>
        <TextInput
          placeholder="Qidirish..."
          value={searchQuery}
          placeholderTextColor={Colors.textSecondary}
          onChangeText={setSearchQuery}
          style={[
            styles.input,
            {
              backgroundColor: Colors.borderColor,
              color: Colors.textPrimary,
              flex: 1,
            },
          ]}
        />
      </View>

      <BottomSheetFlatList
        data={filteredContacts}
        keyExtractor={(item: any) => item.id}
        style={{ flex: 1 }}
        renderItem={({ item }: { item: any }) => (
          <ContactRow item={item} onSelect={onSelectContact} />
        )}
      />
    </>
  );
};

// ------------------------- MAIN -------------------------
const ContactBottomSheet: React.FC<Props> = ({
  locationType,
  location,
  index,
  contactSheetRef,
  onSaveContact,
}) => {
  const Colors = useThemeColors();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactItem[]>([]);
  const [page, setPage] = useState(0);
  const insets = useSafeAreaInsets();
  const state = useAtomValue(getOrderLocationStatusAtom);

  useEffect(() => {
    setPage(0);
  }, []);

  // Kontaktlarni olish
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
          .filter((c) => c.phone);

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
    setSearchQuery("");
  };

  const save = () => {
    onSaveContact({
      name,
      phone,
    });
  };

  useEffect(() => {
    if (location) {
      setName(location.contact?.name || "");
      setPhone(location.contact?.phone || "");
    }
  }, [location]);

  return (
    <CustomBottomSheetModal
      backdropOpacity={0.7}
      topInset={insets.top}
      ref={contactSheetRef}
      snapPoints={["70%", "100%"]}
      backgroundStyle={{
        backgroundColor: Colors.Boxbackground,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.pageBackground,
          gap: 5,
        }}
      >
        {/* HEADER */}
        <View
          style={[
            styles.header,
            { backgroundColor: Colors.Boxbackground, elevation: 10 },
            Shadow.light,
          ]}
        >
          {/* <Octicons name="location" size={24} color={Colors.primary} /> */}
          {/* <View>
            <AppText style={{ fontSize: 13, color: Colors.primary }}>
              <AppText>
                {" "}
                {index + 1} {"- Ortish manzili:"}{" "}
              </AppText>
              {location?.full_title || "Manzil hali tanlanmagan"}
            </AppText>
            <AppText style={{ fontSize: 16, color: Colors.textPrimary }}>
              Kim kutib oladi
            </AppText>
          </View> */}

          <View
            style={{
              // paddingVertical: 10,
              // paddingHorizontal: 15,
              // backgroundColor: Colors.Boxbackground,
              // borderRadius: 12,
              // marginVertical: 5,
              // elevation: 2,
              gap: 5,
            }}
          >
            <AppText
              style={{
                fontSize: 14,
                color: Colors.primary,
                marginBottom: 4,
              }}
            >
              <AppText style={{ color: Colors.textSecondary }}>
                {index + 1} - Ortish manzili:{" "}
              </AppText>
              {location?.full_title || "Manzil hali tanlanmagan"}
            </AppText>
            <AppText
              style={{
                fontSize: 16,
                color: Colors.textSecondary,
                fontWeight: "500",
                borderTopWidth: 1,
                borderColor: Colors.borderColor,
                paddingVertical: 5,
                paddingTop: 10,
              }}
            >
              Haydovchini kim kutib oladi ?
            </AppText>
          </View>
        </View>

        {/* BODY */}
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
            <PageZero
              name={name}
              phone={phone}
              setName={setName}
              setPhone={setPhone}
              save={save}
              onNextPage={() => {
                setPage(1);
              }}
            />
          )}
          {page === 1 && (
            <PageOne
              searchQuery={searchQuery}
              setSearchQuery={handleSearch}
              filteredContacts={filteredContacts}
              onSelectContact={handleSelectContact}
              onBack={() => {
                setPage(0);
                setSearchQuery("");
              }}
            />
          )}
        </View>
      </View>
    </CustomBottomSheetModal>
  );
};

export default ContactBottomSheet;

// ------------------------- STYLES -------------------------
const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: Spacing.horizontal * 2,
    alignItems: "center",
    gap: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
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
    height: 42,
    width: 42,
    justifyContent: "center",
    alignItems: "center",
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
