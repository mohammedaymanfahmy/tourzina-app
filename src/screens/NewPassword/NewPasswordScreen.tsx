import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../components/atoms/AppButton/AppButton";
import BackButton from "../../components/atoms/BackButton/BackButton";
import { LabeledInput } from "../../components/molecules";
import AppTitle from "../../components/atoms/title/AppTitle";
import colors from "../../colors/colors";

interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface NewPasswordFormErrors {
  password?: string;
  confirmPassword?: string;
}

interface NewPasswordScreenProps {
  onGoBack?: () => void;
  onSuccess?: () => void;
  email?: string;
}

const NewPasswordScreen: React.FC<NewPasswordScreenProps> = ({
  onGoBack,
  onSuccess,
  email,
}) => {
  const [formData, setFormData] = useState<NewPasswordFormData>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<NewPasswordFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    field: keyof NewPasswordFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field in errors && errors[field as keyof NewPasswordFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: NewPasswordFormErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Password reset for:", email);

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error("Reset password error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          {onGoBack && (
            <BackButton
              onPress={onGoBack}
              label="Back"
              color={colors.primary}
            />
          )}

          {/* Header */}
          <View style={styles.header}>
            <AppTitle type="title" content="Create New Password" />
            <Text style={styles.subtitle}>
              Your new password must be different from previously used passwords
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* New Password */}
            <LabeledInput
              label="New Password"
              placeHolder="Enter new password"
              size="large"
              type="password"
              error={errors.password}
              required
            />

            {/* Confirm Password */}
            <LabeledInput
              label="Confirm Password"
              placeHolder="Confirm new password"
              size="large"
              type="password"
              error={errors.confirmPassword}
              required
            />

            {/* Password Requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>
                Password must contain:
              </Text>
              <Text style={styles.requirement}>• At least 8 characters</Text>
              <Text style={styles.requirement}>• One uppercase letter</Text>
              <Text style={styles.requirement}>• One lowercase letter</Text>
              <Text style={styles.requirement}>• One number</Text>
            </View>

            {/* Reset Button */}
            <AppButton
              label="Reset Password"
              onPress={handleResetPassword}
              variant="contained"
              color={colors.primary}
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              style={styles.resetButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginTop: 48,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray60,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  form: {
    flex: 1,
  },
  requirementsContainer: {
    backgroundColor: colors.gray10,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 8,
  },
  requirement: {
    fontSize: 14,
    color: colors.gray60,
    marginBottom: 4,
    lineHeight: 20,
  },
  resetButton: {
    marginBottom: 24,
  },
});

export default NewPasswordScreen;
