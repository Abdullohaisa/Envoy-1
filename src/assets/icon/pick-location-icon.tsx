import { useThemeColors } from "@/theme/useThemeColors";
import Svg, { Path } from "react-native-svg";

function PickLocationIcon(props: any) {
  const Colors = useThemeColors();
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.398 17.804C13.881 17.034 19 14.016 19 9A7 7 0 105 9c0 5.016 5.119 8.035 6.602 8.804a.855.855 0 00.796 0zM12 12a3 3 0 100-6 3 3 0 000 6z"
        fill={props.outline ? "transparent" : Colors.primary}
        fillOpacity={1}
      />
      <Path
        d="M12.398 17.804l.276.533-.276-.533zm-.796 0l-.276.533.276-.533zM18.4 9c0 2.29-1.167 4.156-2.571 5.572-1.403 1.416-2.993 2.329-3.707 2.7l.552 1.065c.769-.399 2.48-1.38 4.007-2.92C18.208 13.877 19.6 11.726 19.6 9h-1.2zM12 2.6A6.4 6.4 0 0118.4 9h1.2A7.6 7.6 0 0012 1.4v1.2zM5.6 9A6.4 6.4 0 0112 2.6V1.4A7.6 7.6 0 004.4 9h1.2zm6.278 8.271c-.714-.37-2.304-1.283-3.707-2.699C6.767 13.156 5.6 11.291 5.6 9H4.4c0 2.726 1.392 4.877 2.919 6.417 1.527 1.54 3.238 2.521 4.007 2.92l.552-1.066zm.244 0a.254.254 0 01-.244 0l-.552 1.066c.426.22.922.22 1.348 0l-.552-1.066zM14.4 9a2.4 2.4 0 01-2.4 2.4v1.2A3.6 3.6 0 0015.6 9h-1.2zM12 6.6A2.4 2.4 0 0114.4 9h1.2A3.6 3.6 0 0012 5.4v1.2zM9.6 9A2.4 2.4 0 0112 6.6V5.4A3.6 3.6 0 008.4 9h1.2zm2.4 2.4A2.4 2.4 0 019.6 9H8.4a3.6 3.6 0 003.6 3.6v-1.2z"
        fill={Colors.primary}
      />
      <Path
        d="M19.794 17.5c.79.456 1.206.973 1.206 1.5s-.416 1.044-1.206 1.5c-.79.456-1.926.835-3.294 1.098-1.368.263-2.92.402-4.5.402s-3.132-.139-4.5-.402c-1.368-.263-2.504-.642-3.294-1.098C3.416 20.044 3 19.527 3 19s.416-1.044 1.206-1.5"
        stroke={Colors.primary}
        strokeWidth={1}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default PickLocationIcon;
