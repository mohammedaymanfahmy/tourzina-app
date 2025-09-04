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
type Variant = "text" | "outlined" | "contained" | "elevated" | "contained-tonal";

const SIZES: Record<Size, { h: number; px: number; fs: number }> = {
  sm: { h: 52, px: 30, fs: 18 },
  md: { h: 52, px: 100, fs: 20 },
  lg: { h: 52, px: 170, fs: 22 },
};

export interface AppButtonProps {
  label: string;
  onPress?: () => void;
  size?: Size;
  variant: Variant;               
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
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
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
      textColor = fg;
      break;
    case "elevated":
      bg = color;
      fg = textColor || "#FFFFFF";
      textColor = fg;
      extra = shadow(6);
      break;
    case "outlined":
      bg = "transparent";
      borderW = 2;
      fg = textColor || color;
      textColor = fg;
      borderC = color;
      break;
    case "text":
      break;
    case "contained-tonal":
      bg = color;
      fg = textColor || "#FFFFFF";
      textColor = fg;
      bg = hexToRGBA(color, tonalOpacity);
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
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          numberOfLines={1}
          style={[{ color: textColor, fontSize: fs, fontWeight: "400" }, textStyle]}
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
