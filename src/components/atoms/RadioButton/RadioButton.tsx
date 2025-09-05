import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import colors from "../../../colors/colors";
import { wp, hp } from "../../../utils/Dimensions";

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
  color?: string;
  disabled?: boolean;
}

const SIZES = {
  sm: { outer: wp(16), inner: wp(8) },
  md: { outer: wp(20), inner: wp(10) },
  lg: { outer: wp(24), inner: wp(12) },
};

const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onPress,
  size = "md",
  color = colors.primary,
  disabled = false,
}) => {
  const { outer, inner } = SIZES[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {
          width: outer,
          height: outer,
          borderRadius: outer / 2,
          borderColor: selected ? color : colors.borderColor,
          backgroundColor: disabled ? colors.gray20 : "transparent",
          opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
        },
      ]}
    >
      {selected && (
        <View
          style={[
            styles.innerCircle,
            {
              width: inner,
              height: inner,
              borderRadius: inner / 2,
              backgroundColor: color,
            },
          ]}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    // Inner circle styles are set dynamically
  },
});

export default RadioButton;
