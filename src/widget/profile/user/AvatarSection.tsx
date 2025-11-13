import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import AppText from "@/components/Texts/Text";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
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
import {
  userDataAtom,
  userDataStateAtom,
} from "@/service/user/get-user-info/controller";
import { useAtomValue } from "jotai";
import AppImage from "@/components/Image/Image";
import CustomSpinner from "@/components/Spinner/Spinner";
import { themeAtom } from "@/theme/theme";

const AvatarSection = ({
  image,
  setImage,
  setFullImage,
  setEditMode,
  editMode,
  isLoading: loading,
}: any) => {
  const Colors = useThemeColors();
  const ref = useRef<BottomSheetModalMethods>(null);
  const { t } = useTranslation();
  const userData = useAtomValue(userDataAtom);
  const { isLoading } = useAtomValue(userDataStateAtom);
  const [blur, setBlur] = useState(0);
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    if (editMode) {
      setBlur(10);
    } else {
      setTimeout(() => setBlur(0), 200);
    }
  }, [editMode]);

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
        setImage({
          uri: result.assets[0].uri,
          fileName: result.assets[0].fileName,
          mimeType: result.assets[0].mimeType,
        });
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
        setImage({
          uri: result.assets[0].uri,
          fileName: result.assets[0].fileName,
          mimeType: result.assets[0].mimeType,
        });
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

  const thisImage = image.uri ? image.uri : userData.image;

  return (
    <Animated.View style={[styles.avatarContainer, animatedStyle]}>
      <Pressable
        onPress={() => image && setFullImage(image)}
        style={[
          styles.avatarWrapper,
          { backgroundColor: Colors.Boxbackground },
        ]}
      >
        {/* {isLoading ||
          (loading && (
            <View
              style={[
                {
                  backgroundColor: "rgb(0, 0, 0, .4)",
                  position: "absolute",
                  zIndex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                },
                StyleSheet.absoluteFill,
              ]}
            >
              <CustomSpinner color={Colors.primary} />
            </View>
          ))} */}

        {image.uri || userData.image ? (
          <AppImage
            source={thisImage}
            style={[styles.avatar]}
            blurRadius={blur}
          />
        ) : (
          <AppText
            variant="bold"
            style={[styles.avatarText, { color: Colors.textPrimary }]}
          >
            {userData.username?.slice(0, 1)}
          </AppText>
        )}
      </Pressable>

      {/* Edit tugmalar */}
      <View
        style={[
          styles.editBox,
          {
            backgroundColor:
              theme === "dark"
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(255, 255, 255, 0.5)",
            // backgroundColor: Colors.pageBackground,
            borderRadius: 15,
          },
        ]}
      >
        <Pressable style={styles.editPhoto} onPress={() => setEditMode(true)}>
          <MaterialIcons name="edit" size={20} color={Colors.textPrimary} />
        </Pressable>
        <View
          style={{
            width: 1,
            height: 20,
            backgroundColor: Colors.textSecondary,
            alignSelf: "center",
          }}
        />
        <Pressable
          style={styles.editPhoto}
          onPress={() => ref.current?.present()}
        >
          <MaterialIcons
            name="add-photo-alternate"
            size={22}
            color={Colors.textPrimary}
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
