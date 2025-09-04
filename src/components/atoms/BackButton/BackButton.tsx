import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../../colors/colors";

interface BackButtonProps {
  onPress: () => void;
  label?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  label = "Back",
  color = colors.primary,
  size = "md",
}) => {
  const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 24;
  const fontSize = size === "sm" ? 14 : size === "md" ? 16 : 18;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Arrow Icon */}
        <Text style={[styles.arrow, { color, fontSize: iconSize }]}>←</Text>
        <Text style={[styles.label, { color, fontSize }]}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  arrow: {
    fontWeight: "bold",
  },
  label: {
    fontWeight: "500",
  },
});

export default BackButton;
