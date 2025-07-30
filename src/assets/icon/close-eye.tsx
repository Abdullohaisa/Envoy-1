import Svg, { Path } from "react-native-svg";
import { useThemeColors } from "@/theme/useThemeColors";

function EyeCloseIcon(props: any) {
  const Colors = useThemeColors();
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.94 20.486a25.595 25.595 0 002.977-3.065c.518-.628.777-.943.777-1.421 0-.478-.259-.793-.776-1.42C25.024 12.28 20.848 8 16 8c-1.305 0-2.56.31-3.737.808l3.224 3.225a4 4 0 014.48 4.48l3.974 3.973zm-2.444 1.798l-3.089-3.089a4 4 0 01-5.602-5.602l-3.251-3.251c-1.943 1.373-3.505 3.063-4.471 4.237-.518.628-.777.943-.777 1.421 0 .478.26.793.777 1.42C6.976 19.72 11.153 24 16 24c1.98 0 3.85-.715 5.496-1.716z"
        fill={props.color ? props.color : Colors.primary}
      />
      <Path d="M6.667 2.667L28 24" stroke={Colors.primary} strokeWidth={2} />
    </Svg>
  );
}

export default EyeCloseIcon;
