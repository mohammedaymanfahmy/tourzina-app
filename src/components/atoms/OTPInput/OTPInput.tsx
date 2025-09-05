import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import colors from "../../../colors/colors";
import { wp, hp } from "../../../utils/Dimensions";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onChangeText?: (otp: string) => void;
  error?: string;
  autoFocus?: boolean;
  style?: StyleProp<ViewStyle>;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  onComplete,
  onChangeText,
  error,
  autoFocus = true,
  style,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number>(autoFocus ? 0 : -1);
  const inputRefs = useRef<(TextInput | null)[]>(Array(length).fill(null));

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChangeText = (text: string, index: number) => {
    // Only allow single digit
    const digit = text.slice(-1);
    if (!/^\d*$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpString = newOtp.join("");
    onChangeText?.(otpString);

    // Move to next input if digit entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }

    // Call onComplete when all digits are filled
    if (otpString.length === length && !otpString.includes("")) {
      onComplete?.(otpString);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChangeText?.(newOtp.join(""));
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        {Array.from({ length }, (_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.input,
              focusedIndex === index && styles.inputFocused,
              error && styles.inputError,
            ]}
            value={otp[index]}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            selectTextOnFocus
            blurOnSubmit={false}
          />
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    gap: wp(12),
  },
  input: {
    width: wp(56),
    height: hp(56),
    borderRadius: wp(12),
    borderWidth: wp(2),
    borderColor: colors.borderColor,
    backgroundColor: "#000000",
    color: colors.white,
    fontSize: wp(24),
    fontWeight: "600",
    textAlign: "center",
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: "#000000",
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: wp(12),
    color: colors.error,
    marginTop: hp(8),
    textAlign: "center",
  },
});

export default OTPInput;
