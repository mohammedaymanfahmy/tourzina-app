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
import IconButton from "../../components/atoms/IconBtn/IconButton";
import BackButton from "../../components/atoms/BackButton/BackButton";
import { LabeledInput, RadioOption } from "../../components/molecules";
import AppTitle from "../../components/atoms/title/AppTitle";
import colors from "../../colors/colors";
import { Image } from "react-native";
import { wp, hp } from "../../utils/Dimensions";
import { useNavigation } from "@react-navigation/core";
import { Paths } from "@/navigation/paths";
interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: "personal" | "business";
  agreeToTerms: boolean;
}
interface SignUpFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}
interface SignUpScreenProps {
  onNavigateToSignIn?: () => void;
  onGoBack?: () => void;
  onSignUpSuccess?: (email: string) => void;
}
const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onNavigateToSignIn,
  onGoBack,
  onSignUpSuccess,
}) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "personal",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    field: keyof SignUpFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field in errors && errors[field as keyof SignUpFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SignUpFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      setIsLoading(true);
      console.log("Sign up with:", formData);
      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigation.navigate(Paths.OTPVerification, { formData.email, purpose: "signup" });
      } catch (error) {
        console.error("Sign up error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Handle social sign up
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
          {
            <BackButton
              onPress={() => navigation.goBack()}
              label="Back"
              color={colors.primary}
            />
          }

          {/* Header */}
          <View style={styles.header}>
            <AppTitle type="title" content="Create Account" />
            <Text style={styles.subtitle}>Join us and start your journey</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <LabeledInput
              label="Full Name"
              placeHolder="Enter your full name"
              size="large"
              type="default"
              autoCapitalize="words"
              error={errors.fullName}
              required
            />

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

            {/* Password */}
            <LabeledInput
              label="Password"
              placeHolder="Enter your password"
              size="large"
              type="password"
              error={errors.password}
              required
            />

            {/* Confirm Password */}
            <LabeledInput
              label="Confirm Password"
              placeHolder="Confirm your password"
              size="large"
              type="password"
              error={errors.confirmPassword}
              required
            />

            {/* Account Type Selection */}
            <View style={styles.accountTypeSection}>
              <Text style={styles.sectionLabel}>Account Type</Text>
              <View style={styles.radioGroup}>
                <RadioOption
                  label="Personal Account"
                  selected={formData.accountType === "personal"}
                  onPress={() => handleInputChange("accountType", "personal")}
                  color={colors.primary}
                  style={styles.radioOption}
                />
                <RadioOption
                  label="Business Account"
                  selected={formData.accountType === "business"}
                  onPress={() => handleInputChange("accountType", "business")}
                  color={colors.primary}
                  style={styles.radioOption}
                />
              </View>
            </View>

            {/* Terms Agreement */}
            <View style={styles.termsSection}>
              <RadioOption
                label="I agree to the Terms of Service and Privacy Policy"
                selected={formData.agreeToTerms}
                onPress={() =>
                  handleInputChange("agreeToTerms", !formData.agreeToTerms)
                }
                color={colors.primary}
                size="sm"
                labelStyle={styles.termsLabel}
              />
              {errors.agreeToTerms && (
                <Text style={styles.errorText}>{errors.agreeToTerms}</Text>
              )}
            </View>

            {/* Sign Up Button */}
            <AppButton
              label="Create Account"
              onPress={handleSignUp}
              size="lg"
              variant="contained"
              tonalOpacity={1}
              color={colors.primary}
              fullWidth={true}
              disabled={isLoading}
              loading={isLoading}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or sign up with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Sign Up */}
            <View style={styles.socialButtons}>
              <IconButton
                icon={({ size }) => (
                  <Image
                    source={require("../../../assets/google.png")}
                    style={{ width: size, height: size, resizeMode: "contain" }}
                  />
                )}
                onPress={() => handleSocialSignUp("Google")}
                size="lg"
                variant="contained"
                tileColor="white"
                pressColor="lightgrey"
                accessibilityLabel="Sign up with Google"
              />

              <IconButton
                icon={({ size }) => (
                  <Image
                    source={require("../../../assets/apple.png")}
                    style={{ width: size, height: size, resizeMode: "contain" }}
                  />
                )}
                onPress={() => handleSocialSignUp("Apple")}
                size="lg"
                variant="contained"
                tileColor="black"
                pressColor="gray"
                accessibilityLabel="Sign up with Apple"
              />

              <IconButton
                icon={({ size }) => (
                  <Image
                    source={require("../../../assets/facebook.png")}
                    style={{ width: size, height: size, resizeMode: "contain" }}
                  />
                )}
                onPress={() => handleSocialSignUp("Facebook")}
                size="lg"
                variant="contained"
                tileColor="#1877F2"
                pressColor="#166FE5"
                accessibilityLabel="Sign up with Facebook"
              />
            </View>

            {/* Sign In Link */}
            <View style={styles.signInSection}>
              <Text style={styles.signInText}>
                Already have an account?{" "}
                <Text
                  style={styles.signInLink}
                  onPress={() => navigation.navigate(Paths.SignIn as never)}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// onNavigateToSignIn = {() => navigation.navigate("SignIn")}
// onGoBack = {() => navigation.canGoBack() && navigation.goBack()}
// onSignUpSuccess = {(email: string) => navigation.navigate("OTPVerification", { email, purpose: "signup" })}

const navigation = useNavigation();

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
    marginTop: hp(32),
    marginBottom: hp(32),
  },
  subtitle: {
    fontSize: wp(16),
    color: colors.gray60,
    marginTop: hp(8),
    textAlign: "center",
  },
  form: {
    flex: 1,
  },
  accountTypeSection: {
    marginBottom: hp(24),
  },
  sectionLabel: {
    fontSize: wp(16),
    fontWeight: "500",
    color: colors.white,
    marginBottom: hp(12),
  },
  radioGroup: {
    gap: hp(12),
  },
  radioOption: {
    paddingVertical: hp(4),
  },
  termsSection: {
    marginBottom: hp(32),
  },
  termsLabel: {
    fontSize: wp(14),
    lineHeight: hp(20),
  },
  errorText: {
    fontSize: wp(12),
    color: colors.error,
    marginTop: hp(4),
    marginLeft: wp(32), // Align with text after radio button
  },
  signUpButton: {
    marginBottom: hp(24),
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(24),
  },
  dividerLine: {
    flex: 1,
    height: hp(1),
    backgroundColor: colors.borderColor,
  },
  dividerText: {
    color: colors.gray60,
    fontSize: wp(14),
    marginHorizontal: wp(16),
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp(16),
    marginBottom: hp(32),
  },
  signInSection: {
    alignItems: "center",
  },
  signInText: {
    fontSize: wp(14),
    color: colors.gray60,
  },
  signInLink: {
    color: colors.primary,
    fontWeight: "600",
  },
});

export default SignUpScreen;
