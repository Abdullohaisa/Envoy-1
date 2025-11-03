import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import AppText from "@/components/Texts/Text";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Image } from "expo-image";
import { useRef } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { styleUser as styles } from "./style";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const AvatarSection = ({
  image,
  setImage,
  setFullImage,
  setEditMode,
  editMode,
}: any) => {
  const Colors = useThemeColors();
  const ref = useRef<BottomSheetModalMethods>(null);
  const { t } = useTranslation();

  const pickFromCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Kamera uchun ruxsat bering.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImage(result.assets[0].uri);
        ref.current?.dismiss();
      }
    } catch (error) {}
  };

  const pickFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(t("gallery_permission"));
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImage(result.assets[0].uri);
        ref.current?.dismiss();
      }
    } catch (error) {}
  };

  const animatedStyle = useAnimatedStyle(() => {
    const height = withTiming(editMode ? 0 : screens.height * 0.4, {});
    const backgroundColor = withTiming(
      editMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)"
    );
    return { height, backgroundColor };
  });

  return (
    <Animated.View style={[styles.avatarContainer, animatedStyle]}>
      <Pressable
        onPress={() => image && setFullImage(image)}
        style={[
          styles.avatarWrapper,
          { backgroundColor: Colors.Boxbackground },
        ]}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={[styles.avatar]}
            blurRadius={editMode ? 15 : 0}
          />
        ) : (
          <AppText style={[styles.avatarText, { color: Colors.textPrimary }]}>
            A
          </AppText>
        )}
      </Pressable>

      {/* Edit tugmalar */}
      <View style={styles.editBox}>
        <Pressable style={styles.editPhoto} onPress={() => setEditMode(true)}>
          <MaterialIcons name="edit" size={20} color={Colors.primary} />
        </Pressable>
        <Pressable
          style={styles.editPhoto}
          onPress={() => ref.current?.present()}
        >
          <MaterialIcons
            name="add-photo-alternate"
            size={22}
            color={Colors.primary}
          />
        </Pressable>
      </View>

      {/* Bottom Sheet */}
      <CustomBottomSheetModal ref={ref} snapPoints={["40%"]}>
        <View
          style={{
            flex: 1,
            padding: 10,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Pressable
            onPress={pickFromGallery}
            style={{
              backgroundColor: Colors.borderColor,
              height: 100,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Ionicons name="image" size={30} color={Colors.primary} />
            <AppText>{t("gallery")}</AppText>
          </Pressable>

          <Pressable
            onPress={pickFromCamera}
            style={{
              backgroundColor: Colors.borderColor,
              height: 100,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <FontAwesome name="camera" size={30} color={Colors.primary} />
            <AppText>{t("camera")}</AppText>
          </Pressable>
        </View>
      </CustomBottomSheetModal>
    </Animated.View>
  );
};

export default AvatarSection;
