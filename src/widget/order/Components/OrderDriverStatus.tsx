import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { CheckCircle, Clock, Package, Truck } from "lucide-react-native";
import { View } from "react-native";

const Step = ({ active, icon, label, activeColor, inactiveColor }: any) => (
  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: active ? activeColor : inactiveColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </View>
    <AppText
      style={{
        fontSize: 14,
        color: active ? activeColor : "#9ca3af",
        fontWeight: active ? "600" : "400",
      }}
    >
      {label}
    </AppText>
  </View>
);

export function DriverTimeline({ status }: any) {
  const Colors = useThemeColors();

  const noActivity =
    !status?.departed && !status?.picked_up && !status?.delivered;

  if (noActivity) {
    return (
      <View
        style={{
          backgroundColor: Colors.borderColor,
          padding: 10,
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Clock color={Colors.textSecondary} size={18} />
        <AppText
          style={{
            fontSize: 14,
            color: Colors.textSecondary,
            fontWeight: "500",
          }}
        >
          Haydovchi hali yo‘lga chiqmagan
        </AppText>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: Colors.borderColor,
        padding: 10,
        borderRadius: 16,
        gap: 10,
        // elevation: 10,
      }}
    >
      <Step
        active={status?.departed}
        icon={
          <Truck
            color={status?.departed ? Colors.textPrimary : Colors.textSecondary}
            size={16}
          />
        }
        label="Haydovchi yukni ortish uchun yo‘lga chiqdi"
        activeColor={Colors.green06}
        inactiveColor={Colors.Boxbackground}
      />
      <Step
        active={status?.picked_up}
        icon={
          <Package
            color={
              status?.picked_up ? Colors.textPrimary : Colors.textSecondary
            }
            size={16}
          />
        }
        label="Haydovchi yukni ortib yo‘lga chiqdi"
        activeColor={Colors.green06}
        inactiveColor={Colors.Boxbackground}
      />
      <Step
        active={status?.delivered}
        icon={
          <CheckCircle
            color={
              status?.delivered ? Colors.textPrimary : Colors.textSecondary
            }
            size={16}
          />
        }
        label="Haydovchi yukni yetkazib bo‘ldi"
        activeColor={Colors.green06}
        inactiveColor={Colors.Boxbackground}
      />
    </View>
  );
}
