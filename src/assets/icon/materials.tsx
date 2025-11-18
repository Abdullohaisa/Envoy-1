import * as React from "react";
import Svg, { Path } from "react-native-svg";

function MaterialsIcon({ size = 24, color = "#222", ...props }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.218 3.08a.5.5 0 00-.42.035L3.253 6.856A.5.5 0 003 7.29v.296a.5.5 0 00.33.47l10.358 3.767a.5.5 0 00.42-.036l6.64-3.795A.5.5 0 0021 7.558V7.35a.5.5 0 00-.33-.47l-10.452-3.8zM21 11.012a.5.5 0 00-.748-.434l-5.756 3.29a1 1 0 01-.838.07l-9.987-3.631a.5.5 0 00-.671.47v1.808a.5.5 0 00.33.47l10.358 3.767a.5.5 0 00.42-.036l6.64-3.795a.5.5 0 00.252-.434v-1.545zM3.33 18.12a.5.5 0 01-.33-.47v-1.872a.5.5 0 01.67-.47l9.988 3.632a1 1 0 00.838-.072l5.756-3.289a.5.5 0 01.748.434v1.697a.5.5 0 01-.252.434l-6.547 3.741a.5.5 0 01-.419.036L3.33 18.12z"
        fill={color}
      />
    </Svg>
  );
}

export default MaterialsIcon;
