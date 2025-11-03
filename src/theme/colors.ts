import { IThemeColors } from "./colors.interface";

export const lightColors: IThemeColors = {
  primary: "#007fff",
  pageBackground: "#ffffff",
  Boxbackground: "#eee",
  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  green: "#22C55E",
  yellow: "#FACC15",
  red: "#EF4444",
  borderColor: "#999999",

  // Light → oq tomonga ochilib boradi
  primary08: "#007fff",
  primary06: "#339fff",
  primary04: "#66bfff",
  primary02: "#99dfff",

  textPrimary08: "#1F2937",
  textPrimary06: "#4A5568",
  textPrimary04: "#718096",
  textPrimary02: "#A0AEC0",

  textSecondary08: "#6B7280",
  textSecondary06: "#A0AEC0",
  textSecondary04: "#CBD5E0",
  textSecondary02: "#E2E8F0",

  green08: "#22C55E",
  green06: "#4ADE80",
  green04: "#86EFAC",
  green02: "#BBF7D0",

  yellow08: "#FACC15",
  yellow06: "#FDE047",
  yellow04: "#FDE68A",
  yellow02: "#FEF9C3",

  red08: "#EF4444",
  red06: "#F87171",
  red04: "#FCA5A5",
  red02: "#FECACA",

  Boxbackground08: "#FFFFFF",
  Boxbackground06: "#F2F2F2",
  Boxbackground04: "#E6E6E6",
  Boxbackground02: "#D9D9D9",

  borderColor08: "#999999",
  borderColor06: "#B3B3B3",
  borderColor04: "#CCCCCC",
  borderColor02: "#E6E6E6",
};

export const darkColors: IThemeColors = {
  primary: "#00BEFF",
  // pageBackground: "#111111",
  pageBackground: "#171C26",
  // Boxbackground: "#333333",
  Boxbackground: "#262E3D",
  textPrimary: "#ffffff",
  textSecondary: "#999999",
  green: "#00ff4c",
  yellow: "#ffbd59",
  red: "#FF4C4C",
  // borderColor: "#555555",
  borderColor: "#2E3749",

  // Dark → qora tomonga qorayib boradi
  primary08: "#00BEFF",
  primary06: "#0099CC",
  primary04: "#006680",
  primary02: "#003344",

  textPrimary08: "#ffffff",
  textPrimary06: "#BFBFBF",
  textPrimary04: "#808080",
  textPrimary02: "#404040",

  textSecondary08: "#999999",
  textSecondary06: "#777777",
  textSecondary04: "#555555",
  textSecondary02: "#333333",

  green08: "#00ff4c",
  green06: "#00CC3D",
  green04: "#00992E",
  green02: "#00661F",

  yellow08: "#ffbd59",
  yellow06: "#CC9647",
  yellow04: "#996E35",
  yellow02: "#664623",

  red08: "#FF4C4C",
  red06: "#CC3D3D",
  red04: "#992E2E",
  red02: "#661F1F",

  Boxbackground08: "#333333",
  Boxbackground06: "#262626",
  Boxbackground04: "#1A1A1A",
  Boxbackground02: "#0D0D0D",

  borderColor08: "#555555",
  borderColor06: "#404040",
  borderColor04: "#2B2B2B",
  borderColor02: "#1A1A1A",
};

export const lightMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: lightColors.pageBackground }], // fon
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: lightColors.textPrimary }], // matn
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: lightColors.Boxbackground }], // matn atrofi
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: lightColors.borderColor04 }], // yo'llar
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: lightColors.textSecondary }], // yo'l nomlari
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: lightColors.primary02 }], // suvlar
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [{ color: lightColors.Boxbackground06 }], // binolar
  },
];

// 🔹 Dark Map Style
export const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: darkColors.pageBackground }], // fon
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: darkColors.textSecondary }], // matn
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: darkColors.Boxbackground }], // matn atrofi
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: darkColors.borderColor06 }], // yo'llar
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: darkColors.textPrimary06 }], // yo'l nomlari
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: darkColors.primary04 }], // suvlar
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [{ color: darkColors.Boxbackground04 }], // binolar
  },
];
