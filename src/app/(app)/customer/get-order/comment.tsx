import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import React, { useRef } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Controller, useForm } from "react-hook-form";
import AppInputWithUnit from "@/components/Input/InputWithUnit";
import AppText from "@/components/Texts/Text";
import { Spacing } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { CommentSchema } from "@/shared/validation/get-order/comment-schema";
import GetOrderNextButton from "@/widget/customer/get-order/next-button";

const MAX_LENGTH = 400; // 🔹 Komment uchun maksimal belgi

const CommentForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CommentSchema>({
    defaultValues: {
      comment: "", // default qiymat endi comment
    },
  });

  const Colors = useThemeColors();

  const commentValue = watch("comment") || "";
  const inputRef = useRef<TextInput>(null);

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader title="Izoh" enableBack />
        <View style={{ padding: 16, height: 270 }}>
          <Controller
            control={control}
            name="comment"
            render={({ field: { onChange, value } }) => (
              <AppInputWithUnit
                maxLength={400}
                label="Izoh"
                value={value}
                onChangeText={(text) => {
                  onChange(text); // react-hook-form uchun
                  setValue("comment", text); // state update
                  inputRef.current?.setNativeProps({ text }); // inputga ko‘rsatish
                }}
                type="comment"
                selectedUnit="" // commentda birlik yo‘q
                onUnitChange={() => {}} // commentda birlik o‘zgarmaydi
                keyboardType="default"
                multiline={true} // 🔹 ko‘p qatorli
                numberOfLines={10} // 🔹 boshlang‘ich 6 qator balandlik
                ref={inputRef}
                styleView={{
                  minHeight: 250,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  paddingVertical: 10,
                }}
                styleInput={{
                  textAlignVertical: "top",
                  minHeight: "100%",
                }} // 🔹 yozuv yuqoridan boshlanishi
              />
            )}
          />
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingHorizontal: Spacing.horizontal + 10,
          }}
        >
          <AppText
            style={{
              color:
                commentValue?.length > 0
                  ? Colors.primary
                  : Colors.textSecondary,
            }}
          >
            {commentValue?.length} / {MAX_LENGTH}
          </AppText>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            paddingHorizontal: Spacing.horizontal,
            marginTop: 10,
          }}
        >
          <GetOrderNextButton
            title="Keyingisi"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentForm;

const styles = StyleSheet.create({});
