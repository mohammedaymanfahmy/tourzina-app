import React from "react";
import colors from "../../../colors/colors";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type Size = "sm" | "md" | "lg";
type Variant =
  | "text"
  | "outlined"
  | "contained"
  | "elevated"
  | "contained-tonal";

const SIZES: Record<Size, { h: number; px: number; fs: number }> = {
  sm: { h: 40, px: 16, fs: 14 },
  md: { h: 48, px: 24, fs: 16 },
  lg: { h: 52, px: 32, fs: 18 },
};

export interface AppButtonProps {
  label: string;
  onPress?: () => void;
  size?: Size;
  variant?: Variant;
  color?: string;
  textColor?: string;
  tonalOpacity?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const DEFAULT_COLOR = colors.primary;

const shadow = (elevation = 4): ViewStyle => ({
  elevation,
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: Math.ceil(elevation / 2) },
});

const hexToRGBA = (hex: string, alpha = 1) => {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
const AppButton: React.FC<AppButtonProps> = ({
  label,
  onPress,
  size = "lg",
  color = colors.primary,
  variant = "contained",
  tonalOpacity = 0.12,
  textColor,
  fullWidth = false,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { h, px, fs } = SIZES[size];

  let bg = "transparent";
  let fg = textColor || color;
  let borderW = 0;
  let borderC = "transparent";
  let extra: ViewStyle = {};

  switch (variant) {
    case "contained":
      bg = color;
      fg = textColor || "#FFFFFF";
      break;
    case "elevated":
      bg = color;
      fg = textColor || "#FFFFFF";
      extra = shadow(6);
      break;
    case "outlined":
      bg = "transparent";
      borderW = 2;
      fg = textColor || color;
      borderC = color;
      break;
    case "text":
      fg = textColor || color;
      break;
    case "contained-tonal":
      bg = hexToRGBA(color, tonalOpacity);
      fg = textColor || color;
      break;
  }
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          height: h,
          paddingHorizontal: px,
          borderRadius: 21,
          backgroundColor: bg,
          borderWidth: borderW,
          borderColor: borderC,
          alignSelf: fullWidth ? "stretch" : "auto",
          opacity: disabled || loading ? 0.6 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        extra,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text
          numberOfLines={1}
          style={[{ color: fg, fontSize: fs, fontWeight: "400" }, textStyle]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: { justifyContent: "center", alignItems: "center" },
});

export default AppButton;
