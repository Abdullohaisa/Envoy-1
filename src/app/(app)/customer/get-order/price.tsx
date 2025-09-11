import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef } from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Controller, useForm } from "react-hook-form";
import AppInputWithUnit from "@/components/Input/InputWithUnit";
import { TextInput } from "react-native-gesture-handler";
import GetOrderNextButton from "@/widget/customer/get-order/next-button";
import { Spacing } from "@/shared/token";

const Price = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      price: null,
      currency: "UZS",
    },
  });

  const priceValue = watch("price");
  const currencyValue = watch("currency");
  const inputRef = useRef<TextInput>(null);

  const formattedPrice = new Intl.NumberFormat("ru-RU").format(priceValue);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader title="Narx" enableBack />

        <View style={{ flex: 1, padding: 16 }}>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <AppInputWithUnit
                label="Narx"
                value={new Intl.NumberFormat("ru-RU").format(value)} // inputda formatlangan ko‘rinish
                onChangeText={(text) => {
                  // Faqat raqamlarni ajratamiz
                  const numeric = text.replace(/\D/g, "");

                  // Form value raqam sifatida saqlansin
                  onChange(Number(numeric));
                  setValue("price", Number(numeric));

                  // Inputda formatlangan holda ko‘rsatiladi
                  inputRef.current?.setNativeProps({
                    text: new Intl.NumberFormat("ru-RU").format(
                      Number(numeric)
                    ),
                  });
                }}
                type="price"
                selectedUnit={currencyValue}
                onUnitChange={(unit) => setValue("currency", unit)}
                keyboardType="numeric"
                ref={inputRef}
              />
            )}
          />

          <Text style={{ marginTop: 16, fontSize: 16 }}>
            narx: {currencyValue} {formattedPrice}
          </Text>

          <View
            style={{
              alignItems: "flex-end",
              marginTop: 10,
            }}
          >
            <GetOrderNextButton title="Keyingisi" onPress={() => {}} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Price;

const styles = StyleSheet.create({});
