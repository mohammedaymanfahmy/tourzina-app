import React, { useState, useEffect } from "react";
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
import BackButton from "../../components/atoms/BackButton/BackButton";
import OTPInput from "../../components/atoms/OTPInput/OTPInput";
import AppTitle from "../../components/atoms/title/AppTitle";
import colors from "../../colors/colors";

interface OTPVerificationScreenProps {
  onGoBack?: () => void;
  onVerifySuccess?: (otp: string) => void;
  email?: string;
  phoneNumber?: string;
  purpose?: "signup" | "forgot-password" | "login";
}

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  onGoBack,
  onVerifySuccess,
  email,
  phoneNumber,
  purpose = "signup",
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOTPChange = (newOtp: string) => {
    setOtp(newOtp);
    if (error) {
      setError("");
    }
  };

  const handleOTPComplete = async (completedOtp: string) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success for OTP "1234", failure for others
          if (completedOtp === "1234") {
            resolve(true);
          } else {
            reject(new Error("Invalid OTP"));
          }
        }, 2000);
      });

      console.log("OTP verified:", completedOtp);
      if (onVerifySuccess) {
        onVerifySuccess(completedOtp);
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = () => {
    if (otp.length !== 4) {
      setError("Please enter the complete OTP");
      return;
    }
    handleOTPComplete(otp);
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("OTP resent to:", email || phoneNumber);
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  const getTitle = () => {
    switch (purpose) {
      case "signup":
        return "Verify Your Account";
      case "forgot-password":
        return "Verify Reset Code";
      case "login":
        return "Two-Factor Authentication";
      default:
        return "Enter Verification Code";
    }
  };

  const getDescription = () => {
    const contact = email || phoneNumber || "your registered contact";
    switch (purpose) {
      case "signup":
        return `We've sent a verification code to ${contact}. Please enter the code to complete your registration.`;
      case "forgot-password":
        return `We've sent a reset code to ${contact}. Please enter the code to reset your password.`;
      case "login":
        return `For your security, we've sent a verification code to ${contact}. Please enter the code to continue.`;
      default:
        return `We've sent a verification code to ${contact}. Please enter the code below.`;
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
            <AppTitle type="title" content={getTitle()} />
            <Text style={styles.subtitle}>{getDescription()}</Text>
          </View>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            <OTPInput
              length={4}
              onChangeText={handleOTPChange}
              onComplete={handleOTPComplete}
              error={error}
              autoFocus={true}
            />
          </View>

          {/* Timer and Resend */}
          <View style={styles.resendContainer}>
            {!canResend ? (
              <Text style={styles.timerText}>
                Resend code in {resendTimer}s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>
                  Didn't receive the code? Resend
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <AppButton
            label="Verify Code"
            onPress={handleVerify}
            variant="contained"
            color={colors.primary}
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading || otp.length !== 4}
            style={styles.verifyButton}
          />

          {/* Help Text */}
          <Text style={styles.helpText}>
            Having trouble? Make sure to check your spam folder or contact
            support.
          </Text>

          {/* Test Info */}
          <View style={styles.testInfo}>
            <Text style={styles.testTitle}>For Testing:</Text>
            <Text style={styles.testText}>Use OTP: 1234 for success</Text>
            <Text style={styles.testText}>Any other code will fail</Text>
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
  otpContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  timerText: {
    fontSize: 14,
    color: colors.gray60,
  },
  resendText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  verifyButton: {
    marginBottom: 24,
  },
  helpText: {
    fontSize: 14,
    color: colors.gray60,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },
  testInfo: {
    backgroundColor: colors.gray10,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  testTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 8,
  },
  testText: {
    fontSize: 12,
    color: colors.gray60,
    marginBottom: 2,
  },
});

export default OTPVerificationScreen;
