import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { screens } from "@/shared/token";
import AppPhoneInput from "@/components/Input/PhoneInput";
import { useForm, Controller } from "react-hook-form";
import { PhoneSchemaType, phoneSchema } from "@/shared/validation.scheme";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = ({
  onSubmitRef,
}: {
  onSubmitRef: React.MutableRefObject<() => void>;
}) => {
  const [phoneFocused, setPhoneFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema()),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = (data: any) => {
    const formattedPhone = "+998" + data.phone.replace(/[^0-9]/g, "");
    const payload = {
      phone: formattedPhone,
    };
    console.log(payload);
  };

  useEffect(() => {
    onSubmitRef.current = handleSubmit(onSubmit);
  }, [handleSubmit]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <AppPhoneInput
            label={"Telefon raqam"}
            value={value}
            onChangeText={onChange}
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
            error={errors.phone?.message}
            keyboardType="number-pad"
            mask="99 999-99-99"
            focused={phoneFocused}
          />
        )}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: screens.width,
    height: screens.height,
    flex: 1,
    paddingTop: 30,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
});
