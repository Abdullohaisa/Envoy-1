import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  BackHandler,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CargoType,
  cargoSchema,
} from "@/shared/validation/get-order/cargo-schema";
import AppInputWithUnit from "@/components/Input/InputWithUnit";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Spacing } from "@/shared/token";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtom, useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import GetOrderNextButton from "@/widget/customer/get-order/next-button";
import { getOrderCargoAtom, normalizeCargoData } from "@/atoms/get-order/cargo";
import { router, useFocusEffect } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { useCallback, useEffect, useRef, useState } from "react";
import GetOrderBackButton from "@/widget/customer/get-order/back-button";
import { safeNavigate } from "@/utils/safe-navigation";

const CargoForm = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const [cargoAtom, setCargoAtom] = useAtom(getOrderCargoAtom);
  const [isChanged, setIsChanged] = useState(false); // 👈 o‘zgarish kuzatish

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CargoType>({
    resolver: zodResolver(cargoSchema),
    defaultValues: {
      type: { value: "", unit: null },
      weight: { value: "", unit: "kg" },
      volume: { value: "", unit: "m³" },
      quantity: { value: "", unit: "dona" },
      length: { value: "", unit: "m" },
      height: { value: "", unit: "m" },
      width: { value: "", unit: "m" },
    },
  });

  // birinchi marta cargoAtom dagi qiymatlarni forma ichiga yuklaymiz
  useEffect(() => {
    reset({
      type: {
        value: cargoAtom?.type?.value || "",
        unit: cargoAtom?.type?.unit || null,
      },
      weight: {
        value: String(cargoAtom?.weight?.value || ""),
        unit: cargoAtom?.weight?.unit || "kg",
      },
      volume: {
        value: String(cargoAtom?.volume?.value || ""),
        unit: cargoAtom?.volume?.unit || "m³",
      },
      quantity: {
        value: String(cargoAtom?.quantity?.value || ""),
        unit: cargoAtom?.quantity?.unit || "dona",
      },
      length: {
        value: String(cargoAtom?.length?.value || ""),
        unit: cargoAtom?.length?.unit || "m",
      },
      height: {
        value: String(cargoAtom?.height?.value || ""),
        unit: cargoAtom?.height?.unit || "m",
      },
      width: {
        value: String(cargoAtom?.width?.value || ""),
        unit: cargoAtom?.width?.unit || "m",
      },
    });
  }, []);

  // ✅ faqat saqlash tugmasi bosilganda atom yangilanadi
  const onSave = (data: CargoType) => {
    const normalizedData = normalizeCargoData(data);
    setCargoAtom(normalizedData);
    setIsChanged(false);
    Keyboard.dismiss();
  };

  const onNext = () => {
    router.push(AppRoutes.customer.getOrder.locations.index);
  };

  const handleClear = () => {
    // formani bo‘shatamiz
    reset({
      type: { value: "", unit: null },
      weight: { value: "", unit: "kg" },
      volume: { value: "", unit: "m³" },
      quantity: { value: "", unit: "dona" },
      length: { value: "", unit: "m" },
      height: { value: "", unit: "m" },
      width: { value: "", unit: "m" },
    });

    // atomni ham bo‘shatamiz
    setCargoAtom({
      type: { value: "", unit: null },
    });

    setIsChanged(true);
    Keyboard.dismiss();
  };

  const renderInput = (
    name: keyof CargoType,
    label: string,
    numeric = false
  ) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <AppInputWithUnit
          label={label}
          value={value.value}
          onChangeText={(text) => {
            onChange({ ...value, value: text });
            setIsChanged(true); // 👈 input o‘zgarsa saqlash aktiv bo‘ladi
          }}
          type={name === "type" ? "cargoType" : name}
          selectedUnit={value.unit}
          onUnitChange={(unit) => {
            onChange({ ...value, unit });
            setIsChanged(true);
          }}
          error={errors[name]?.value?.message}
          backColor={inputBackColor}
          styleView={darkModeInputStyle}
          keyboardType={numeric ? "decimal-pad" : "default"}
        />
      )}
    />
  );

  const inputBackColor = Colors.pageBackground;
  const darkModeInputStyle =
    theme === "dark"
      ? { elevation: 0, backgroundColor: inputBackColor, borderWidth: 1 }
      : {};

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        safeNavigate(() => router.replace(AppRoutes.customer.getOrder.index));

        return true;
      };
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => sub.remove();
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <PageHeader
          title="Yuk"
          enableBack
          animated
          routePath={AppRoutes.customer.getOrder.index}
        />

        <View style={styles.container}>
          {renderInput("type", "Yuk turi")}
          <View style={styles.row}>
            <View style={[styles.half, { marginRight: 5 }]}>
              {renderInput("weight", "Vazni", true)}
            </View>
            <View style={[styles.half, { marginLeft: 5 }]}>
              {renderInput("volume", "Hajmi", true)}
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.half, { marginRight: 5 }]}>
              {renderInput("quantity", "Soni", true)}
            </View>
            <View style={[styles.half, { marginLeft: 5 }]}>
              {renderInput("length", "Uzunligi", true)}
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.half, { marginRight: 5 }]}>
              {renderInput("height", "Balandligi", true)}
            </View>
            <View style={[styles.half, { marginLeft: 5 }]}>
              {renderInput("width", "Kengligi", true)}
            </View>
          </View>
          <View style={styles.row}>
            <Pressable onPress={handleClear}>
              <AppText style={{ color: "red" }}>Tozalash</AppText>
            </Pressable>

            {/* Keyingisi -> Manzillar */}
            <View>
              <Pressable onPress={handleSubmit(onSave)} disabled={!isChanged}>
                <AppText
                  style={{
                    color: isChanged ? Colors.primary : "#ccc",
                    textAlign: "center",
                  }}
                >
                  Saqlash
                </AppText>
              </Pressable>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <GetOrderNextButton title="Manzillar" onPress={onNext} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CargoForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: Spacing.horizontal,
    flex: 1,
    gap: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  half: { flex: 1 },
  saveBtnWrap: {
    paddingHorizontal: Spacing.horizontal,
    marginTop: 10,
  },
  saveBtn: {
    paddingVertical: 12,
    borderRadius: 8,
  },
});
