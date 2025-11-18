import React, { memo } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useThemeColors } from "@/theme/useThemeColors";
import { Spacing, screens } from "@/shared/token";
import AppText from "@/components/Texts/Text";

type Props = {
  onClear: () => void;
  onSubmit: () => void;
  anyFilled: boolean;
  allFilled: boolean;
};

const OrderActionsComponent = ({
  onClear,
  onSubmit,
  anyFilled,
  allFilled,
}: Props) => {
  const Colors = useThemeColors();

  if (!anyFilled && !allFilled) return null;

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: Spacing.horizontal,
          bottom: screens.height * 0.11,
        },
      ]}
    >
      {anyFilled && (
        <Pressable
          onPress={onClear}
          style={[
            styles.button,
            {
              backgroundColor: Colors.Boxbackground,
            },
          ]}
        >
          <AppText variant="semiBold" style={{ color: Colors.red }}>
            Tozalash
          </AppText>
        </Pressable>
      )}

      {allFilled && (
        <Pressable
          onPress={onSubmit}
          style={[
            styles.button,
            {
              backgroundColor: Colors.Boxbackground,
              borderColor: Colors.green,
            },
          ]}
        >
          <AppText variant="semiBold" style={{ color: Colors.green }}>
            Davom etish
          </AppText>
        </Pressable>
      )}
    </View>
  );
};

export const OrderActions = memo(OrderActionsComponent);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 15,
    elevation: 8,
  },
});
