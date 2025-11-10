import {
  BackHandler,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useCallback, useEffect, useRef } from "react";
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
import { useFocusEffect, useRouter } from "expo-router"; // yoki react-navigation ishlatayotgan bo‘lsang, o‘shani import qil
import { AppRoutes } from "@/constants/routes";
import GetOrderBackButton from "@/widget/customer/get-order/back-button";
import { safeNavigate } from "@/utils/safe-navigation";
import { useTranslation } from "react-i18next";

const Price = () => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      price: 0,
      currency: "UZS",
    },
  });

  const priceValue = watch("price");
  const currencyValue = watch("currency");
  const inputRef = useRef<TextInput>(null);
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  const setOrder = useSetAtom(getOrderPriceAtom);
  const router = useRouter();
  const { t } = useTranslation();

  // 🔹 Raqamni formatlash
  const formatPrice = (value: number) =>
    value ? new Intl.NumberFormat("ru-RU").format(value) : "";

  const inputBackColor = Colors.pageBackground;
  const darkModeInputStyle =
    theme === "dark"
      ? { elevation: 0, backgroundColor: inputBackColor, borderWidth: 1 }
      : {};

  // 🔹 useEffect bilan har o‘zgarishda atomni yangilaymiz (debounce bilan)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOrder({
        value: priceValue || 0,
        currency: currencyValue || "UZS",
      });
    }, 300); // 400ms kechiktirish (debounce)

    return () => clearTimeout(timeout);
  }, [priceValue, currencyValue]);

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader
          title={t("price")}
          enableBack
          routePath={AppRoutes.customer.getOrder.index}
        />

        <View style={{ flex: 1, padding: 16 }}>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <AppInputWithUnit
                label={t("price")}
                value={formatPrice(value)}
                onChangeText={(text) => {
                  const numeric = text.replace(/\D/g, "");
                  const numberValue = numeric ? Number(numeric) : 0;
                  onChange(numberValue);
                }}
                type="price"
                selectedUnit={currencyValue}
                onUnitChange={(unit) => setValue("currency", unit)}
                keyboardType="numeric"
                ref={inputRef}
                backColor={inputBackColor}
                styleView={darkModeInputStyle}
              />
            )}
          />

          <View
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 20,
              backgroundColor: Colors.Boxbackground,
            }}
          >
            <AppText style={{ fontSize: 14, color: Colors.textSecondary }}>
              {t("proposed_price")}
            </AppText>
            <AppText
              style={{
                fontSize: 24,
                fontWeight: "600",
                color: Colors.textPrimary,
                marginTop: 4,
              }}
            >
              {formatPrice(priceValue)} {currencyValue}
            </AppText>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
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

const styles = StyleSheet.create({});
