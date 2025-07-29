import { useAtomValue } from "jotai";
import { themeModeAtom } from "./theme";
import { lightColors, darkColors } from "./colors";

export const useThemeColors = () => {
  const mode = useAtomValue(themeModeAtom);
  return mode === "dark" ? darkColors : lightColors;
};
