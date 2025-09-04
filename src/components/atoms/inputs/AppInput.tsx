import React, { forwardRef, useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from "react-native";
import colors from "@/colors/colors";
import { IconByVariant } from "@/components/atoms";

// Base input props interface
interface BaseInputProps {
  variant?: "default" | "search" | "floating" | "minimal";
  size?: "sm" | "md" | "lg";
  state?: "default" | "error" | "success" | "disabled";
  bg?: keyof typeof colors;
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: object;
  inputStyle?: object;
}

// Text input specific props
interface TextInputProps
  extends BaseInputProps,
    Omit<RNTextInputProps, "style"> {
  inputType?: "text" | "email" | "password" | "search" | "numeric" | "phone";
  multiline?: boolean;
  numberOfLines?: number;
}

// Search input specific props
interface SearchInputProps extends TextInputProps {
  inputType: "search";
  onClear?: () => void;
  showClearButton?: boolean;
}

// Union type for all input props
type InputProps = TextInputProps | SearchInputProps;

const AppInput = forwardRef<TextInput, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      state = "default",
      fullWidth = true,
      bg,
      label,
      placeholder,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      containerStyle,
      inputStyle,
      inputType = "text",
      multiline = false,
      numberOfLines = 1,
      ...restProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Handle password visibility toggle
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Handle clear button for search
    const handleClear = () => {
      if ("onClear" in restProps && restProps.onClear) {
        restProps.onClear();
      }
    };

    // Get background color from token if provided
    const resolvedBg = bg ? colors[bg] : undefined;

    // Determine keyboard type
    const getKeyboardType = () => {
      switch (inputType) {
        case "email":
          return "email-address";
        case "phone":
          return "phone-pad";
        case "numeric":
          return "numeric";
        default:
          return "default";
      }
    };

    // Determine if we should show password
    const isSecureTextEntry = inputType === "password" && !showPassword;

    // Get dynamic styles
    const getContainerStyle = () => [
      styles.container,
      fullWidth && styles.fullWidth,
      styles[variant],
      styles[`${size}Container`],
      styles[`${state}Container`],
      resolvedBg && { backgroundColor: resolvedBg },
      isFocused && state !== "disabled" && styles[`${state}Focused`],
      containerStyle,
    ];

    const getInputStyle = () => [
      styles.input,
      styles[`${size}Input`],
      styles[`${state}Input`],
      multiline && styles.multilineInput,
      resolvedBg && getContrastTextStyle(resolvedBg),
      inputStyle,
    ];

    const getLabelStyle = () => [styles.label, styles[`${state}Label`]];

    const getHelperStyle = () => [
      styles.helperText,
      state === "error" || errorMessage
        ? styles.errorText
        : styles.helperTextDefault,
    ];

    // Get contrast text color based on background
    const getContrastTextStyle = (bgColor: string) => {
      // Simple contrast detection - you might want to use a more sophisticated method
      const isDark =
        bgColor === colors.primary ||
        bgColor === colors.secondary ||
        bgColor === colors.background;
      return {
        color: isDark ? colors.white : colors.text,
      };
    };

    // Determine effective icon presence
    const hasLeftIconEffective = !!leftIcon || inputType === "search";
    const hasRightIconEffective =
      !!rightIcon ||
      inputType === "password" ||
      (inputType === "search" &&
        restProps.value?.toString()?.length &&
        restProps.value.toString().length > 0);

    return (
      <View style={[styles.wrapper, fullWidth && styles.fullWidth]}>
        {/* Label */}
        {label && <Text style={getLabelStyle()}>{label}</Text>}

        {/* Input container */}
        <View style={getContainerStyle()}>
          {/* Left icon */}
          {leftIcon && (
            <View style={[styles.leftIcon, styles[`${size}Icon`]]}>
              {leftIcon}
            </View>
          )}

          {/* Auto-add search icon for search inputs */}
          {inputType === "search" && !leftIcon && (
            <View style={[styles.leftIcon, styles[`${size}Icon`]]}>
              <IconByVariant
                path="search"
                width={size === "sm" ? 16 : size === "md" ? 20 : 24}
                height={size === "sm" ? 16 : size === "md" ? 20 : 24}
              />
            </View>
          )}

          {/* Input field */}
          <TextInput
            ref={ref}
            style={getInputStyle()}
            placeholder={placeholder}
            placeholderTextColor={
              resolvedBg &&
              (resolvedBg === colors.primary ||
                resolvedBg === colors.secondary ||
                resolvedBg === colors.background)
                ? colors.white + "80"
                : colors.placeHolder
            }
            keyboardType={getKeyboardType()}
            secureTextEntry={isSecureTextEntry}
            editable={state !== "disabled"}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...restProps}
          />

          {/* Password visibility toggle */}
          {inputType === "password" && (
            <TouchableOpacity
              style={[styles.rightIcon, styles[`${size}Icon`]]}
              onPress={togglePasswordVisibility}
              disabled={state === "disabled"}
            >
              <IconByVariant
                path={showPassword ? "eye" : "eye-off"}
                width={size === "sm" ? 16 : size === "md" ? 20 : 24}
                height={size === "sm" ? 16 : size === "md" ? 20 : 24}
              />
            </TouchableOpacity>
          )}

          {/* Clear button for search */}
          {inputType === "search" &&
            "showClearButton" in restProps &&
            restProps.showClearButton &&
            restProps.value?.toString()?.length &&
            restProps.value.toString().length > 0 && (
              <TouchableOpacity
                style={[styles.rightIcon, styles[`${size}Icon`]]}
                onPress={handleClear}
                disabled={state === "disabled"}
              >
                <IconByVariant
                  path="close"
                  width={size === "sm" ? 14 : size === "md" ? 18 : 22}
                  height={size === "sm" ? 14 : size === "md" ? 18 : 22}
                />
              </TouchableOpacity>
            )}

          {/* Right icon */}
          {rightIcon && inputType !== "password" && (
            <View style={[styles.rightIcon, styles[`${size}Icon`]]}>
              {rightIcon}
            </View>
          )}
        </View>

        {/* Helper text or error message */}
        {(helperText || errorMessage) && (
          <Text style={getHelperStyle()}>{errorMessage || helperText}</Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  fullWidth: {
    width: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.white,
  },

  // Variant styles
  default: {
    borderColor: colors.borderColor,
    borderRadius: 8,
  },
  search: {
    borderColor: colors.borderColor,
    borderRadius: 24,
    backgroundColor: colors.backgroundLight,
  },
  floating: {
    borderColor: colors.line,
    borderRadius: 8,
    backgroundColor: colors.backgroundLight,
  },
  minimal: {
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: colors.borderColor,
    backgroundColor: "transparent",
    borderRadius: 0,
  },

  // Size styles for containers
  smContainer: {
    height: 40,
    paddingHorizontal: 12,
  },
  mdContainer: {
    height: 48,
    paddingHorizontal: 16,
  },
  lgContainer: {
    height: 56,
    paddingHorizontal: 20,
  },

  // State styles for containers
  defaultContainer: {
    borderColor: colors.borderColor,
  },
  errorContainer: {
    borderColor: colors.error,
    backgroundColor: colors.error + "10",
  },
  successContainer: {
    borderColor: colors.success,
    backgroundColor: colors.success + "10",
  },
  disabledContainer: {
    borderColor: colors.gray30,
    backgroundColor: colors.gray10,
    opacity: 0.6,
  },

  // Focus styles
  defaultFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  errorFocused: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  successFocused: {
    borderColor: colors.success,
    borderWidth: 2,
  },

  // Input styles
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    padding: 0, // Remove default padding
  },
  smInput: {
    fontSize: 14,
  },
  mdInput: {
    fontSize: 16,
  },
  lgInput: {
    fontSize: 18,
  },
  multilineInput: {
    textAlignVertical: "top",
    paddingTop: 8,
    paddingBottom: 8,
  },

  // Input state styles
  defaultInput: {
    color: colors.text,
  },
  errorInput: {
    color: colors.text,
  },
  successInput: {
    color: colors.text,
  },
  disabledInput: {
    color: colors.gray50,
  },

  // Icon styles
  leftIcon: {
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  smIcon: {
    width: 16,
    height: 16,
  },
  mdIcon: {
    width: 20,
    height: 20,
  },
  lgIcon: {
    width: 24,
    height: 24,
  },

  // Label styles
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: colors.text,
  },
  defaultLabel: {
    color: colors.text,
  },
  errorLabel: {
    color: colors.error,
  },
  successLabel: {
    color: colors.success,
  },
  disabledLabel: {
    color: colors.gray50,
  },

  // Helper text styles
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
  helperTextDefault: {
    color: colors.gray60,
  },
  errorText: {
    color: colors.error,
  },
});

AppInput.displayName = "AppInput";

export default AppInput;
