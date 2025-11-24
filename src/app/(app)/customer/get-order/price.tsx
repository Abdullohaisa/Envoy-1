import {
  BackHandler,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Controller, useForm } from "react-hook-form";
import AppInputWithUnit from "@/components/Input/InputWithUnit";
import { TextInput } from "react-native-gesture-handler";
import GetOrderNextButton from "@/widget/customer/get-order/next-button";
import { useThemeColors } from "@/theme/useThemeColors";
import { themeAtom } from "@/theme/theme";
import { useAtomValue, useSetAtom } from "jotai";
import AppText from "@/components/Texts/Text";
import { getOrderPriceAtom } from "@/atoms/get-order/price";
import { useFocusEffect, useRouter } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import GetOrderBackButton from "@/widget/customer/get-order/back-button";
import { safeNavigate } from "@/utils/safe-navigation";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";

const Price = () => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      price: 0,
      currency: "UZS",
    },
  });

  const orderPrice = useAtomValue(getOrderPriceAtom);
  const setOrder = useSetAtom(getOrderPriceAtom);

  const priceValue = watch("price");
  const currencyValue = watch("currency");

  const inputRef = useRef<TextInput>(null);
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const router = useRouter();
  const { t } = useTranslation();

  // 🔹 Sahifa ochilgan payt atomdagi qiymatni formga yuklash
  useEffect(() => {
    setValue("price", orderPrice.value);
    setValue("currency", orderPrice.currency);
  }, [orderPrice, setValue]);

  // 🔹 Formatlash tez ishlash uchun regex + useCallback
  const formatPrice = useCallback((value: number) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  const inputBackColor = Colors.pageBackground;
  const darkModeInputStyle =
    theme === "dark"
      ? { elevation: 0, backgroundColor: inputBackColor, borderWidth: 1 }
      : {};

  // 🔹 Narxni atomga saqlash debounced
  const debouncedSetOrder = useDebouncedCallback(
    (price: number, currency: string) => {
      setOrder({ value: price, currency });
    },
    300
  );

  useEffect(() => {
    debouncedSetOrder(priceValue || 0, currencyValue || "UZS");
  }, [priceValue, currencyValue, debouncedSetOrder]);

  // 🔹 BackHandler
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
    }, [router])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <PageHeader
          title={t("price")}
          enableBack
          routePath={AppRoutes.customer.getOrder.index}
        />

        <View style={styles.content}>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => {
              const [localValue, setLocalValue] = useState(value);

              const handleChange = (text: string) => {
                const numeric = text.replace(/\D/g, "");
                const numberValue = numeric ? Number(numeric) : 0;
                setLocalValue(numberValue);
                onChange(numberValue);
              };

              return (
                <AppInputWithUnit
                  label={t("price")}
                  value={formatPrice(localValue)}
                  onChangeText={handleChange}
                  type="price"
                  selectedUnit={currencyValue}
                  onUnitChange={(unit) => setValue("currency", unit)}
                  keyboardType="numeric"
                  ref={inputRef}
                  backColor={inputBackColor}
                  styleView={darkModeInputStyle}
                />
              );
            }}
          />

          <View
            style={[
              styles.summaryBox,
              { backgroundColor: Colors.Boxbackground },
            ]}
          >
            <AppText
              style={[styles.summaryLabel, { color: Colors.textSecondary }]}
            >
              {t("proposed_price")}
            </AppText>
            <AppText
              style={[styles.summaryValue, { color: Colors.textPrimary }]}
            >
              {formatPrice(priceValue)} {currencyValue}
            </AppText>
          </View>

          <View style={styles.buttonsRow}>
            <GetOrderBackButton
              title={t("cargo_truck")}
              onPress={() =>
                safeNavigate(() =>
                  router.push(AppRoutes.customer.getOrder.truck)
                )
              }
            />
            <GetOrderNextButton
              title={t("time")}
              onPress={() =>
                safeNavigate(() =>
                  router.push(AppRoutes.customer.getOrder.time)
                )
              }
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Price;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 16 },
  summaryBox: { marginTop: 16, padding: 16, borderRadius: 20 },
  summaryLabel: { fontSize: 14 },
  summaryValue: { fontSize: 24, fontWeight: "600", marginTop: 4 },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
