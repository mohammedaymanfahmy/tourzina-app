import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../../../colors/colors";

type Size = "sm" | "md";

export type RatingPillProps = {
  value: number;
  size?: Size;
  variant?: "pill" | "inline"; // pill with background vs simple inline row
  textColor?: string;
  iconColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};

const SIZES: Record<Size, { fs: number; gap: number; padX: number; padY: number; icon: number }>= {
  sm: { fs: 10, gap: 4, padX: 6, padY: 6, icon: 10 },
  md: { fs: 12, gap: 6, padX: 2, padY: 8, icon: 12 },
};

const RatingPill: React.FC<RatingPillProps> = ({
  value,
  size = "md",
  variant = "pill",
  textColor,
  iconColor = colors.warning,
  backgroundColor,
  style,
}) => {
  const S = SIZES[size];
  const bg = variant === "pill" ? (backgroundColor ?? "rgba(0,0,0,0.35)") : "transparent";
  const fg = textColor ?? (variant === "pill" ? colors.white : colors.gray20);

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: bg,
          paddingHorizontal: S.padX,
          paddingVertical: S.padY,
          borderRadius: 999,
          gap: S.gap,
        },
        style,
      ]}
    >
      <AntDesign name="star" size={S.icon} color={iconColor} />
      <Text style={{ color: fg, fontSize: S.fs, fontWeight: "600" }}>{value.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: { flexDirection: "row", alignItems: "center" },
});

export default RatingPill;

