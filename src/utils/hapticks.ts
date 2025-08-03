// utils/haptics.ts
import * as Haptics from "expo-haptics";

export const lightImpact = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const mediumImpact = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const heavyImpact = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

export const selectionFeedback = () => {
  Haptics.selectionAsync();
};

export const notificationSuccess = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const notificationWarning = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};

export const notificationError = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};
