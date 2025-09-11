import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CargoType,
  cargoSchema,
} from "@/shared/validation/get-order/cargo-schema";
import AppInputWithUnit from "@/components/Input/InputWithUnit";
import { UNIT_OPTIONS } from "@/constants/unit";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Spacing } from "@/shared/token";
import AppText from "@/components/Texts/Text";
import ArrowIcon from "@/assets/icon/arrow";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";
import GetOrderNextButton from "@/widget/customer/get-order/next-button";

const CargoForm = () => {
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);

  // Unit states
  const [units, setUnits] = useState({
    weight: "kg",
    volume: "m³",
    quantity: "dona",
    length: "m",
    height: "m",
    width: "m",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CargoType>({
    resolver: zodResolver(cargoSchema),
    defaultValues: {
      type: "",
      weight: "",
      volume: "",
      quantity: "",
      length: "",
      height: "",
      width: "",
    },
  });

  const onSubmit = (data: CargoType) => {
    const formattedData = Object.keys(data).reduce(
      (acc, key) => {
        acc[key] = {
          value: data[key as keyof CargoType],
          unit: key === "type" ? null : units[key as keyof typeof units],
        };
        return acc;
      },
      {} as Record<string, { value: string; unit: string | null }>
    );

    console.log("Cargo data:", formattedData);
    router.push(AppRoutes.customer.getOrder.locations);
    Keyboard.dismiss();
  };

  const inputBackColor = Colors.pageBackground;
  const darkModeInputStyle =
    theme === "dark"
      ? { elevation: 0, backgroundColor: inputBackColor, borderWidth: 1 }
      : {};

  const renderInput = (
    name: keyof CargoType,
    label: string,
    type: keyof typeof units,
    numeric = false
  ) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <AppInputWithUnit
          label={label}
          value={value}
          onChangeText={onChange}
          type={name === "type" ? "cargoType" : type}
          selectedUnit={units[type]}
          onUnitChange={(unit) =>
            setUnits((prev) => ({ ...prev, [type]: unit }))
          }
          error={errors[name]?.message}
          keyboardType={numeric ? "numeric" : "default"}
          backColor={inputBackColor}
          styleView={darkModeInputStyle}
        />
      )}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <PageHeader title="Yuk" enableBack />
        <View style={styles.container}>
          {renderInput("type", "Yuk turi", "weight")}

          <View style={styles.row}>
            <View style={[styles.half, { marginRight: 5 }]}>
              {renderInput("weight", "Vazni", "weight", true)}
            </View>
            <View style={[styles.half, { marginLeft: 5 }]}>
              {renderInput("volume", "Hajmi", "volume", true)}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.half, { marginRight: 5 }]}>
              {renderInput("quantity", "Soni", "quantity", true)}
            </View>
            <View style={[styles.half, { marginLeft: 5 }]}>
              {renderInput("length", "Uzunligi", "length", true)}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.half, { marginRight: 5 }]}>
              {renderInput("height", "Balandligi", "height", true)}
            </View>
            <View style={[styles.half, { marginLeft: 5 }]}>
              {renderInput("width", "Kengligi", "width", true)}
            </View>
          </View>

          <View style={styles.row}>
            <Pressable
              onPress={() => {
                (reset(), Keyboard.dismiss());
              }}
            >
              <AppText style={{ color: "red" }}>Tozalash</AppText>
            </Pressable>

            <GetOrderNextButton
              title="Keyingisi"
              onPress={handleSubmit(onSubmit)}
            />
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
});

// import React, { useState } from "react";
// import {
//   View,
//   Button,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Pressable,
// } from "react-native";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   CargoType,
//   cargoSchema,
// } from "@/shared/validation/get-order/cargo-schema";
// import AppInputWithUnit from "@/components/Input/InputWithUnit";
// import { UNIT_OPTIONS } from "@/constants/unit";
// import PageHeader from "@/components/Header/PageHeader/PageHeader";
// import { Spacing } from "@/shared/token";
// import AppText from "@/components/Texts/Text";
// import ArrowIcon from "@/assets/icon/arrow";
// import { router } from "expo-router";
// import { AppRoutes } from "@/constants/routes";
// import { useThemeColors } from "@/theme/useThemeColors";
// import { useAtomValue } from "jotai";
// import { themeAtom } from "@/theme/theme";

// const Cargo = () => {
//   const Colors = useThemeColors();
//   const theme = useAtomValue(themeAtom);
//   const [weightUnit, setWeightUnit] = useState("kg");
//   const [volumeUnit, setVolumeUnit] = useState("m³");
//   const [quantityUnit, setQuantityUnit] = useState("dona");
//   const [lengthUnit, setLengthUnit] = useState("m");
//   const [heightUnit, setHeightUnit] = useState("m");
//   const [widthUnit, setWidthUnit] = useState("m");

//   const {
//     control,
//     handleSubmit,

//     formState: { errors },
//   } = useForm<CargoType>({
//     resolver: zodResolver(cargoSchema),
//     defaultValues: {
//       type: "",
//       weight: "",
//       volume: "",
//       quantity: "",
//       length: "",
//       height: "",
//       width: "",
//     },
//   });

//   const onSubmit = (data: CargoType) => {
//     const formattedData = {
//       type: {
//         value: data.type,
//         unit: null, // Yuk turi uchun birlik yo'q
//       },
//       weight: {
//         value: data.weight,
//         unit:
//           UNIT_OPTIONS.weight.find((u) => u.short === weightUnit)?.label ||
//           weightUnit,
//       },
//       volume: {
//         value: data.volume,
//         unit:
//           UNIT_OPTIONS.volume.find((u) => u.short === volumeUnit)?.label ||
//           volumeUnit,
//       },
//       quantity: {
//         value: data.quantity,
//         unit:
//           UNIT_OPTIONS.quantity.find((u) => u.short === quantityUnit)?.label ||
//           quantityUnit,
//       },
//       length: {
//         value: data.length,
//         unit:
//           UNIT_OPTIONS.length.find((u) => u.short === lengthUnit)?.label ||
//           lengthUnit,
//       },
//       height: {
//         value: data.height,
//         unit:
//           UNIT_OPTIONS.height.find((u) => u.short === heightUnit)?.label ||
//           heightUnit,
//       },
//       width: {
//         value: data.width,
//         unit:
//           UNIT_OPTIONS.width.find((u) => u.short === widthUnit)?.label ||
//           widthUnit,
//       },
//     };

//     console.log("Cargo data:", formattedData);
//     router.push(AppRoutes.customer.getOrder.locations);
//     Keyboard.dismiss();
//   };

//   const inputBackColor = Colors.pageBackground;

//   const darkModeInputStyle =
//     theme === "dark"
//       ? {
//           elevation: 0,
//           backgroundColor: inputBackColor,
//           borderWidth: 1,
//         }
//       : {};

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <View style={{ flex: 1 }}>
//         <PageHeader title="Yuk" />
//         <View style={[styles.container]}>
//           {/* Yuk turi (faqat bitta) */}
//           <Controller
//             control={control}
//             name="type"
//             render={({ field: { onChange, value } }) => (
//               <AppInputWithUnit
//                 label="Yuk turi"
//                 value={value}
//                 onChangeText={onChange}
//                 type="cargoType"
//                 selectedUnit={weightUnit}
//                 onUnitChange={setWeightUnit}
//                 error={errors.type?.message}
//                 backColor={inputBackColor}
//                 styleView={darkModeInputStyle}
//               />
//             )}
//           />

//           {/* Vazni va Hajmi */}
//           <View style={styles.row}>
//             <View style={[styles.half, { marginRight: 5 }]}>
//               <Controller
//                 control={control}
//                 name="weight"
//                 render={({ field: { onChange, value } }) => (
//                   <AppInputWithUnit
//                     label="Vazni"
//                     value={value}
//                     onChangeText={onChange}
//                     type="weight"
//                     selectedUnit={weightUnit}
//                     onUnitChange={setWeightUnit}
//                     error={errors.weight?.message}
//                     keyboardType="numeric"
//                     backColor={inputBackColor}
//                     styleView={darkModeInputStyle}
//                   />
//                 )}
//               />
//             </View>

//             <View style={[styles.half, { marginLeft: 5 }]}>
//               <Controller
//                 control={control}
//                 name="volume"
//                 render={({ field: { onChange, value } }) => (
//                   <AppInputWithUnit
//                     label="Hajmi"
//                     value={value}
//                     onChangeText={onChange}
//                     type="volume"
//                     selectedUnit={volumeUnit}
//                     onUnitChange={setVolumeUnit}
//                     error={errors.volume?.message}
//                     keyboardType="numeric"
//                     backColor={inputBackColor}
//                     styleView={darkModeInputStyle}
//                   />
//                 )}
//               />
//             </View>
//           </View>

//           {/* Soni va Uzunligi */}
//           <View style={styles.row}>
//             <View style={[styles.half, { marginRight: 5 }]}>
//               <Controller
//                 control={control}
//                 name="quantity"
//                 render={({ field: { onChange, value } }) => (
//                   <AppInputWithUnit
//                     label="Soni"
//                     value={value}
//                     onChangeText={onChange}
//                     type="quantity"
//                     selectedUnit={quantityUnit}
//                     onUnitChange={setQuantityUnit}
//                     error={errors.quantity?.message}
//                     keyboardType="numeric"
//                     backColor={inputBackColor}
//                     styleView={darkModeInputStyle}
//                   />
//                 )}
//               />
//             </View>

//             <View style={[styles.half, { marginLeft: 5 }]}>
//               <Controller
//                 control={control}
//                 name="length"
//                 render={({ field: { onChange, value } }) => (
//                   <AppInputWithUnit
//                     label="Uzunligi"
//                     value={value}
//                     onChangeText={onChange}
//                     type="length"
//                     selectedUnit={lengthUnit}
//                     onUnitChange={setLengthUnit}
//                     error={errors.length?.message}
//                     keyboardType="numeric"
//                     backColor={inputBackColor}
//                     styleView={darkModeInputStyle}
//                   />
//                 )}
//               />
//             </View>
//           </View>

//           {/* Balandligi va Kengligi */}
//           <View style={styles.row}>
//             <View style={[styles.half, { marginRight: 5 }]}>
//               <Controller
//                 control={control}
//                 name="height"
//                 render={({ field: { onChange, value } }) => (
//                   <AppInputWithUnit
//                     label="Balandligi"
//                     value={value}
//                     onChangeText={onChange}
//                     type="height"
//                     selectedUnit={heightUnit}
//                     onUnitChange={setHeightUnit}
//                     error={errors.height?.message}
//                     keyboardType="numeric"
//                     backColor={inputBackColor}
//                     styleView={darkModeInputStyle}
//                   />
//                 )}
//               />
//             </View>

//             <View style={[styles.half, { marginLeft: 5 }]}>
//               <Controller
//                 control={control}
//                 name="width"
//                 render={({ field: { onChange, value } }) => (
//                   <AppInputWithUnit
//                     label="Kengligi"
//                     value={value}
//                     onChangeText={onChange}
//                     type="width"
//                     selectedUnit={widthUnit}
//                     onUnitChange={setWidthUnit}
//                     error={errors.width?.message}
//                     keyboardType="numeric"
//                     backColor={inputBackColor}
//                     styleView={darkModeInputStyle}
//                   />
//                 )}
//               />
//             </View>
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Pressable>
//               <AppText style={{ color: "red" }}>Tozalash</AppText>
//             </Pressable>
//             <Pressable
//               onPress={handleSubmit(onSubmit)}
//               style={{
//                 alignSelf: "baseline",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: 7,
//                 padding: 8,
//                 backgroundColor: "#ddd",
//                 borderRadius: 8,
//               }}
//             >
//               <AppText style={{ fontSize: 12 }}>Manzil</AppText>
//               <ArrowIcon size={12} direction="right" />
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default Cargo;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 20,
//     paddingHorizontal: Spacing.horizontal,
//     flex: 1,
//     gap: 20,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   half: {
//     flex: 1,
//   },
// });
