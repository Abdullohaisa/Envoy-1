import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomBottomSheetModal from "../BottomSheets/BottomSheetModal";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Spacing } from "@/shared/token";
import {
  OrderListAddress,
  OrderListCargo,
  OrderListCustomer,
} from "../OrderInfoList/Components/Components";
import { StyleSheet } from "react-native";
import { RefObject } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { IOrder } from "@/types/order";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";

const OrderBySheet = ({
  sheetRef,
  order,
  isSheetOpen,
  setIsSheetOpen,
}: {
  sheetRef: RefObject<BottomSheetModalMethods | null>;
  order: IOrder;
  isSheetOpen: boolean;
  setIsSheetOpen: ($: boolean) => void;
}) => {
  const topInset = useSafeAreaInsets().top;
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);
  return (
    <CustomBottomSheetModal
      backdropOpacity={1}
      ref={sheetRef}
      snapPoints={["100%"]}
      backgroundStyle={{
        backgroundColor:
          theme === "light" ? Colors.Boxbackground : Colors.pageBackground,
      }}
      topInset={topInset + 5}
      handleComponent={null}
      onChange={(index) => {
        if (index === -1) setIsSheetOpen(false);
        else setIsSheetOpen(true);
      }}
    >
      <BottomSheetScrollView
        style={{
          borderRadius: 20,
          overflow: "hidden",
          padding: Spacing.horizontal,
        }}
        contentContainerStyle={styles.contentContainer}
      >
        <OrderListCustomer order={order} title="Buyurtmachi" isVisiblePhone />
        <OrderListCargo order={order} />
        <OrderListAddress locations={order?.locations} isVisibleContact />
      </BottomSheetScrollView>
    </CustomBottomSheetModal>
  );
};

export default OrderBySheet;

const styles = StyleSheet.create({
  contentContainer: {
    gap: Spacing.horizontal,
    paddingBottom: 200,
  },
});
