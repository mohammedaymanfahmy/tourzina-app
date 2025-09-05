import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import RadioButton from "../../atoms/RadioButton/RadioButton";
import colors from "../../../colors/colors";
import { wp, hp } from "../../../utils/Dimensions";

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  radioButtonStyle?: StyleProp<ViewStyle>;
  layout?: "horizontal" | "vertical";
  gap?: number;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  selected,
  onPress,
  size = "md",
  color = colors.primary,
  disabled = false,
  style,
  labelStyle,
  radioButtonStyle,
  layout = "horizontal",
  gap = wp(12),
}) => {
  const containerStyle =
    layout === "horizontal"
      ? { flexDirection: "row" as const, alignItems: "center" as const }
      : { flexDirection: "column" as const, alignItems: "center" as const };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        containerStyle,
        { gap, opacity: disabled ? 0.6 : pressed ? 0.8 : 1 },
        style,
      ]}
    >
      <View style={radioButtonStyle}>
        <RadioButton
          selected={selected}
          onPress={onPress}
          size={size}
          color={color}
          disabled={disabled}
        />
      </View>

      <Text
        style={[
          styles.label,
          {
            color: disabled ? colors.gray50 : colors.white,
            textAlign: layout === "vertical" ? "center" : "left",
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // Dynamic styles applied inline
  },
  label: {
    fontSize: wp(16),
    fontWeight: "400",
    flex: 1, // Takes remaining space in horizontal layout
  },
});

export default RadioOption;
