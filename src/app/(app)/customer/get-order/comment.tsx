import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useRef } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Controller, useForm } from "react-hook-form";
import AppInputWithUnit from "@/components/Input/InputWithUnit";
import AppText from "@/components/Texts/Text";
import { Spacing } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import GetOrderNextButton from "@/widget/customer/get-order/next-button";
import { useAtomValue, useSetAtom } from "jotai";
import { getOrderComment } from "@/atoms/get-order/comment";
import { themeAtom } from "@/theme/theme";
import { useRouter } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import GetOrderBackButton from "@/widget/customer/get-order/back-button";
import { safeNavigate } from "@/utils/safe-navigation";
import { useTranslation } from "react-i18next";

const MAX_LENGTH = 400;

const CommentForm = () => {
  const Colors = useThemeColors();
  const setComment = useSetAtom(getOrderComment);
  const savedComment = useAtomValue(getOrderComment);
  const inputRef = useRef<TextInput>(null);
  const theme = useAtomValue(themeAtom);
  const router = useRouter();
  const { t } = useTranslation();

  const { control, watch, setValue } = useForm({
    defaultValues: {
      comment: savedComment || "",
    },
  });

  const commentValue = watch("comment") || "";

  // 🔹 Har yozganda atomga 400 ms kechikish bilan saqlaydi
  useEffect(() => {
    const timeout = setTimeout(() => {
      setComment(commentValue);
    }, 400);

    return () => clearTimeout(timeout);
  }, [commentValue]);

  const inputBackColor = Colors.pageBackground;
  const darkModeInputStyle =
    theme === "dark"
      ? {
          elevation: 0,
          backgroundColor: inputBackColor,
          borderWidth: 1,
          minHeight: 250,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingVertical: 10,
        }
      : {
          minHeight: 250,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingVertical: 10,
        };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader
          title={t("comment")}
          enableBack
          routePath={AppRoutes.customer.getOrder.index}
        />

        <View style={{ padding: 16, height: 270 }}>
          <Controller
            control={control}
            name="comment"
            render={({ field: { onChange, value } }) => (
              <AppInputWithUnit
                maxLength={MAX_LENGTH}
                label={t("enter_additional_info")}
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  setValue("comment", text);
                }}
                type="comment"
                selectedUnit=""
                onUnitChange={() => {}}
                keyboardType="default"
                multiline
                numberOfLines={10}
                ref={inputRef}
                styleView={darkModeInputStyle}
                styleInput={{
                  textAlignVertical: "top",
                  minHeight: "100%",
                }}
              />
            )}
          />
        </View>

        {/* Tozalash va hisobchi qismi */}
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingHorizontal: Spacing.horizontal + 5,
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <View
            style={{
              padding: 7,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: commentValue.length > 0 ? "red" : Colors.borderColor,
            }}
          >
            <AppText
              onPress={() => {
                if (commentValue.length > 0) {
                  setValue("comment", "");
                  setComment("");
                }
              }}
              style={{
                color: commentValue.length > 0 ? "red" : Colors.textSecondary,
                fontWeight: "400",
              }}
            >
              Tozalash
            </AppText>
          </View>

          <View
            style={{
              padding: 7,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.borderColor,
            }}
          >
            <AppText
              style={{
                color:
                  commentValue.length > 0
                    ? Colors.primary
                    : Colors.textSecondary,
              }}
            >
              {commentValue.length} / {MAX_LENGTH}
            </AppText>
          </View>
        </View>

        {/* Tugma */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: Spacing.horizontal,
            marginTop: 10,
          }}
        >
          <GetOrderBackButton
            title={t("time")}
            onPress={() =>
              safeNavigate(() => router.push(AppRoutes.customer.getOrder.time))
            }
          />
          <GetOrderNextButton
            title={t("home_page")}
            onPress={() =>
              safeNavigate(() => router.push(AppRoutes.customer.getOrder.index))
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentForm;

const styles = StyleSheet.create({});
