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
import { wp, hp } from "../../utils/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { Paths } from "@/navigation/paths";

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormErrors {
  email?: string;
}

interface ForgotPasswordScreenProps {
  onGoBack?: () => void;
  onContinue?: (email: string) => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onContinue,
}) => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });

  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation()


  const handleInputChange = (
    field: keyof ForgotPasswordFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field in errors && errors[field as keyof ForgotPasswordFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ForgotPasswordFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Reset password for:", formData.email);

        if (onContinue) {
          onContinue(formData.email);
        }
      } catch (error) {
        console.error("Forgot password error:", error);
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
          {(
            <BackButton
              onPress={() => navigation.goBack()}
              label="Back"
              color={colors.primary}
            />
          )}

          {/* Header */}
          <View style={styles.header}>
            <AppTitle type="title" content="Forgot Password?" />
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your
              password
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <LabeledInput
              label="E-mail"
              placeHolder="Enter your email"
              size="large"
              type="default"
              keyBoardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              required
            />

            {/* Continue Button */}
            <AppButton
              label="Send Reset Link"
              onPress={handleContinue}
              variant="contained"
              color={colors.primary}
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              style={styles.continueButton}
            />

            {/* Help Text */}
            <Text style={styles.helpText}>
              Remember your password?{" "}
              <Text style={styles.backToSignInText} onPress={() => navigation.navigate(Paths.SignIn)}>
                Back to Sign In
              </Text>
            </Text>
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
    paddingHorizontal: wp(24),
    paddingBottom: hp(32),
  },
  header: {
    alignItems: "center",
    marginTop: hp(48),
    marginBottom: hp(40),
  },
  subtitle: {
    fontSize: wp(16),
    color: colors.gray60,
    marginTop: hp(8),
    textAlign: "center",
    lineHeight: hp(22),
    paddingHorizontal: wp(16),
  },
  form: {
    flex: 1,
  },
  continueButton: {
    marginTop: hp(8),
    marginBottom: hp(32),
  },
  helpText: {
    fontSize: wp(14),
    color: colors.gray60,
    textAlign: "center",
  },
  backToSignInText: {
    color: colors.primary,
    fontWeight: "600",
  },
});

export default ForgotPasswordScreen;
