import { useThemeColors } from "@/theme/useThemeColors";
import Svg, { Path } from "react-native-svg";

function EyeOpenIcon(props: any) {
  const Colors = useThemeColors();
  return (
    <Svg
      width={22}
      height={14}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.774 8c0-.35-.191-.59-.575-1.073C21.465 4.747 17.105 0 12 0 6.896 0 2.536 4.746.802 6.927.417 7.41.225 7.651.225 8c0 .35.192.59.576 1.073C2.535 11.253 6.895 16 12 16c5.105 0 9.465-4.746 11.2-6.927.383-.483.575-.724.575-1.073zM12 12a4 4 0 100-8 4 4 0 000 8z"
        fill={props.color ? props.color : Colors.primary}
      />
    </Svg>
  );
}

export default EyeOpenIcon;
