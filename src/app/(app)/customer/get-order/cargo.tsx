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
import { safeNavigate } from "@/utils/safe-navigation";
import { useTranslation } from "react-i18next";

const CargoForm = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const [cargoAtom, setCargoAtom] = useAtom(getOrderCargoAtom);
  const [isChanged, setIsChanged] = useState(false); // 👈 o‘zgarish kuzatish
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    watch,
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
        unit: t("none"), // null o‘rniga
      },
      weight: {
        value: String(cargoAtom?.weight?.value || ""),
        unit: cargoAtom?.weight?.unit || t("kg"),
      },
      volume: {
        value: String(cargoAtom?.volume?.value || ""),
        unit: cargoAtom?.volume?.unit || t("m3"),
      },
      quantity: {
        value: String(cargoAtom?.quantity?.value || ""),
        unit: cargoAtom?.quantity?.unit || t("piece"),
      },
      length: {
        value: String(cargoAtom?.length?.value || ""),
        unit: cargoAtom?.length?.unit || t("m"),
      },
      height: {
        value: String(cargoAtom?.height?.value || ""),
        unit: cargoAtom?.height?.unit || t("m"),
      },
      width: {
        value: String(cargoAtom?.width?.value || ""),
        unit: cargoAtom?.width?.unit || t("m"),
      },
    });
  }, [t]);

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

  const inputBackColor = theme === "dark" ? Colors.pageBackground : "#fff";
  const darkModeInputStyle =
    theme === "dark"
      ? { elevation: 0, backgroundColor: inputBackColor, borderWidth: 1 }
      : { elevation: 0, backgroundColor: inputBackColor };

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

  const formValues = watch();
  const anyFilled = Object.values(formValues).some(
    (f: any) => f?.value && String(f.value).trim() !== ""
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <PageHeader
          title={t("cargo")}
          enableBack
          animated
          routePath={AppRoutes.customer.getOrder.index}
        />

        <View style={styles.container}>
          {renderInput("type", t("cargo_type"))}
          <View style={styles.row}>
            <View style={[styles.half, { marginRight: 5 }]}>
              {renderInput("weight", t("weight"), true)}
            </View>
            <View style={[styles.half, { marginLeft: 5 }]}>
              {renderInput("volume", t("volume"), true)}
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.half, { marginRight: 5 }]}>
              {renderInput("quantity", t("quantity"), true)}
            </View>
            <View style={[styles.half, { marginLeft: 5 }]}>
              {renderInput("length", t("length"), true)}
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.half, { marginRight: 5 }]}>
              {renderInput("height", t("height"), true)}
            </View>
            <View style={[styles.half, { marginLeft: 5 }]}>
              {renderInput("width", t("width"), true)}
            </View>
          </View>
          <View style={styles.row}>
            <Pressable
              onPress={handleClear}
              disabled={!anyFilled}
              style={{
                padding: 10,
                borderRadius: 15,
                backgroundColor:
                  // anyFilled ? Colors.red + "22":
                  Colors.Boxbackground,
              }}
            >
              <AppText
                variant="semiBold"
                style={{ color: anyFilled ? Colors.red : Colors.textSecondary }}
              >
                {t("clear")}
              </AppText>
            </Pressable>

            <View>
              <Pressable
                onPress={handleSubmit(onSave)}
                disabled={!isChanged}
                style={{
                  padding: 10,
                  borderRadius: 15,
                  backgroundColor:
                    // isChanged ? Colors.green + "22" :
                    Colors.Boxbackground,
                }}
              >
                <AppText
                  variant="semiBold"
                  style={{
                    color: isChanged ? Colors.green : Colors.textSecondary,
                    textAlign: "center",
                  }}
                >
                  {t("save")}
                </AppText>
              </Pressable>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <GetOrderNextButton title={t("locations")} onPress={onNext} />
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
