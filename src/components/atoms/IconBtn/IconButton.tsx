import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import colors from "../../../colors/colors";

type Size = "sm" | "md" | "lg";
type Variant = "icon" | "outlined" | "contained" | "elevated" | "contained-tonal";

export interface IconButtonProps {
  icon: React.ReactNode | ((p: { color: string; size: number }) => React.ReactNode);
  onPress?: () => void; 
  size?: Size;
  iconsize?: number;
  variant?: Variant;
  color?: string;          
  tileColor?: string;     
  pressColor?: string;
  iconColor?: string;
  borderColor?: string;
  borderWidth?: number;
  radius?: number;
  tonalOpacity?: number; 
  tonalColor?: string;
  disabled?: boolean;
  loading?: boolean;
  iconpadding?: number; 
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const SIZES: Record<Size, { side: number; icon: number }> = {
  sm: { side: 20, icon: 12 },
  md: { side: 40, icon: 16 },
  lg: { side: 60, icon: 20 },
};

const shadow = (e = 6): ViewStyle => ({
  elevation: e,
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: Math.ceil(e / 2) },
});

const hexToRGBA = (hex: string, a = 1) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = "md",
  // iconsize = 20,
  variant = "contained",
  color = colors.primary,
  tileColor,
  pressColor,
  iconColor,
  borderColor,
  borderWidth,
  radius = 14,
  tonalOpacity = 0.15,
  tonalColor,
  disabled = false,
  loading = false,
  iconpadding,
  style,
  accessibilityLabel,
}) => {
  const { side, icon: iconSize } = SIZES[size];
  const pad = Math.max(iconpadding ?? Math.ceil(iconSize * 0.25), 6);
  let bg = "transparent";
  let fg = iconColor ?? color;
  let bw = borderWidth ?? 0;
  let bc = borderColor ?? "transparent";
  let extra: ViewStyle = {};
  let pressedBg: string | undefined;

  switch (variant) {
    case "contained":
      bg = tileColor ?? "#1E2128";
      fg = iconColor ?? "#000000";
      pressedBg = pressColor ?? "#232730";
      break;
    case "elevated":
      bg = tileColor ?? "#1E2128";
      fg = iconColor ?? "#FFFFFF";
      extra = shadow(4);
      pressedBg = pressColor ?? "#232730";
      break;
    case "outlined":
      bg = "transparent";
      fg = iconColor ?? color;
      bw = borderWidth ?? 2;
      bc = borderColor ?? color;
      pressedBg = pressColor ?? hexToRGBA(color, 0.10);
      break;
    case "icon":
      bg = "transparent";
      fg = iconColor ?? color;
      pressedBg = pressColor ?? hexToRGBA(color, 0.10);
      break;
    case "contained-tonal":
      {
        const base = tonalColor ?? color;
        bg = tileColor ?? hexToRGBA(base, tonalOpacity);
        fg = iconColor ?? base;
        pressedBg = pressColor ?? hexToRGBA(base, Math.min(tonalOpacity + 0.10, 0.35));
      }
      break;
  }

  const renderIcon = () =>
    typeof icon === "function"
      ? icon({ color: fg, size: iconSize })
      : React.isValidElement(icon)
      ? React.cloneElement(icon as any, { color: fg, size: iconSize })
      : icon;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          width: side,
          height: side,
          borderRadius: radius,
          backgroundColor: pressed && pressedBg ? pressedBg : bg,
          borderWidth: bw,
          borderColor: bc,
          opacity: disabled || loading ? 0.6 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
          padding: pad,  
        },
        extra,
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={fg} /> : renderIcon()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: { alignItems: "center", justifyContent: "center" },
});

export default IconButton;
