import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../components/atoms/AppButton/AppButton";
import IconButton from "../../components/atoms/IconBtn/IconButton";
import BackButton from "../../components/atoms/BackButton/BackButton";
import { LabeledInput, RadioOption } from "../../components/molecules";
import AppTitle from "../../components/atoms/title/AppTitle";
import colors from "../../colors/colors";
import { Image } from "react-native";

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignInFormErrors {
  email?: string;
  password?: string;
}

interface SignInScreenProps {
  onNavigateToSignUp?: () => void;
  onGoBack?: () => void;
  onForgotPassword?: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({
  onNavigateToSignUp,
  onGoBack,
  onForgotPassword,
}) => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<SignInFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    field: keyof SignInFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field in errors && errors[field as keyof SignInFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SignInFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log("Sign in with:", formData);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Handle sign in logic here
      } catch (error) {
        console.error("Sign in error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`);
    // Handle social sign in
  };

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    } else {
      console.log("Navigate to Forgot Password");
    }
  };

  const handleSignUp = () => {
    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    } else {
      console.log("Navigate to Sign Up");
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
            <AppTitle type="title" content="Welcome Back" />
            <Text style={styles.subtitle}>Sign in to your account</Text>
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

            {/* Password */}
            <LabeledInput
              label="Password"
              placeHolder="Enter your password"
              size="large"
              type="password"
              error={errors.password}
              required
            />

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <View style={styles.rememberMeContainer}>
                <RadioOption
                  label="Remember me"
                  selected={formData.rememberMe}
                  onPress={() =>
                    handleInputChange("rememberMe", !formData.rememberMe)
                  }
                  color={colors.primary}
                  size="sm"
                  labelStyle={styles.rememberMeLabel}
                />
              </View>

              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <AppButton
              label="Sign In"
              onPress={handleSignIn}
              variant="contained"
              color={colors.primary}
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              style={styles.signInButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or sign in with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Sign In */}
            <View style={styles.socialButtons}>
              <IconButton
                icon={({ size }) => (
                  <Image
                    source={require("../../../assets/google.png")}
                    style={{ width: size, height: size, resizeMode: "contain" }}
                  />
                )}
                onPress={() => handleSocialSignIn("Google")}
                size="lg"
                variant="contained"
                tileColor="white"
                pressColor="lightgrey"
                accessibilityLabel="Sign in with Google"
              />

              <IconButton
                icon={({ size }) => (
                  <Image
                    source={require("../../../assets/apple.png")}
                    style={{ width: size, height: size, resizeMode: "contain" }}
                  />
                )}
                onPress={() => handleSocialSignIn("Apple")}
                size="lg"
                variant="contained"
                tileColor="black"
                pressColor="gray"
                accessibilityLabel="Sign in with Apple"
              />

              <IconButton
                icon={({ size }) => (
                  <Image
                    source={require("../../../assets/facebook.png")}
                    style={{ width: size, height: size, resizeMode: "contain" }}
                  />
                )}
                onPress={() => handleSocialSignIn("Facebook")}
                size="lg"
                variant="contained"
                tileColor="#1877F2"
                pressColor="#166FE5"
                accessibilityLabel="Sign in with Facebook"
              />
            </View>

            {/* Sign Up Link */}
            <View style={styles.signUpSection}>
              <Text style={styles.signUpText}>
                Don't have an account?{" "}
                <Text style={styles.signUpLink} onPress={handleSignUp}>
                  Sign Up
                </Text>
              </Text>
            </View>
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
  },
  form: {
    flex: 1,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    minHeight: 40,
  },
  rememberMeContainer: {
    flex: 1,
    marginRight: 16,
  },
  rememberMeLabel: {
    fontSize: 14,
    flexShrink: 1,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
    textAlign: "right",
  },
  signInButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderColor,
  },
  dividerText: {
    color: colors.gray60,
    fontSize: 14,
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 32,
  },
  signUpSection: {
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    color: colors.gray60,
  },
  signUpLink: {
    color: colors.primary,
    fontWeight: "600",
  },
});

export default SignInScreen;
