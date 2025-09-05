import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import AppInput from "../../atoms/AppInput";
import colors from "../../../colors/colors";
import { wp, hp } from "../../../utils/Dimensions";

interface LabeledInputProps {
  label: string;
  placeHolder: string;
  size?: "small" | "medium" | "large";
  type?: "search" | "password" | "default";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyBoardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
  error?: string;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeHolder,
  size = "large",
  type = "default",
  autoCapitalize,
  keyBoardType,
  error,
  required = false,
  style,
  labelStyle,
  inputContainerStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Label */}
      <View style={[styles.labelContainer, labelStyle]}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      {/* Input */}
      <View style={[styles.inputContainer, inputContainerStyle]}>
        <AppInput
          placeHolder={placeHolder}
          size={size}
          type={type}
          autoCapitalize={autoCapitalize}
          keyBoardType={keyBoardType}
        />
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(16),
  },
  labelContainer: {
    marginBottom: hp(8),
  },
  label: {
    fontSize: wp(16),
    fontWeight: "500",
    color: colors.white,
  },
  required: {
    color: colors.error,
  },
  inputContainer: {
    // Container for input styling if needed
  },
  errorContainer: {
    marginTop: hp(4),
    paddingHorizontal: wp(4),
  },
  errorText: {
    fontSize: wp(12),
    color: colors.error,
  },
});

export default LabeledInput;
