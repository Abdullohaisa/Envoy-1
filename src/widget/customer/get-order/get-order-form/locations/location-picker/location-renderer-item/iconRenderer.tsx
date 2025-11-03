import React from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AppText from "@/components/Texts/Text";
import { locationTypeMapping } from "./location-type-mapping";

interface IconRendererProps {
  resultType: string;
  categories?: { name: string }[];
}

const IconRenderer = ({ resultType, categories }: IconRendererProps) => {
  const Colors = useThemeColors();

  const iconColors: Record<string, string> = {
    locality: Colors.borderColor,
    school: "#4caf50",
    university: "#4caf50",
    hospital: "#f44336",
    store: "#ff9800",
    factory: "#9c27b0",
    restaurant: "#7c9dff",
    unknown: "#ff4e4e",
  };

  const rawType =
    resultType === "locality"
      ? "locality"
      : categories?.[0]?.name || "unknown";
  const normalizedType = rawType.replace(/’/g, "'").toLowerCase();
  const type =
    Object.keys(locationTypeMapping).find(
      (key) => key.toLowerCase() === normalizedType
    ) || "unknown";

  const color = iconColors[locationTypeMapping[type] || "unknown"] || "gray";

  switch (locationTypeMapping[type]) {
    case "locality":
      return <FontAwesome5 name="city" size={20} color={color} />;
    case "school":
    case "university":
      return <Ionicons name="school" size={22} color={color} />;
    case "hospital":
      return (
        <MaterialCommunityIcons name="hospital-box" size={22} color={color} />
      );
    case "store":
      return <FontAwesome6 name="cart-shopping" size={22} color={color} />;
    case "factory":
      return <AppText style={{ fontSize: 22, color }}>🏭</AppText>;
    case "restaurant":
      return (
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={22}
          color={color}
        />
      );
    default:
      return <AppText style={{ fontSize: 22, color }}>📍</AppText>;
  }
};

export default IconRenderer;
