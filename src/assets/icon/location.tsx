import Svg, { Path } from "react-native-svg";

function LocationIcon({
  size = 24,
  color,
  ...props
}: {
  size: number;
  color: string;
}) {
  return (
    <Svg
      width={size} // aslida 18x20 bo'lganini prop bilan moslashtiramiz
      height={size}
      viewBox="0 0 18 20"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.151 19.802c1.71-.878 8.285-4.673 8.285-11.052 0-4.832-3.89-8.75-8.687-8.75C3.95 0 .062 3.918.062 8.75c0 6.38 6.575 10.174 8.285 11.052.255.132.55.132.804 0zM8.75 12.5c2.056 0 3.723-1.679 3.723-3.75C12.472 6.679 10.805 5 8.75 5S5.026 6.679 5.026 8.75c0 2.071 1.667 3.75 3.723 3.75z"
        fill={color}
      />
    </Svg>
  );
}

export default LocationIcon;
