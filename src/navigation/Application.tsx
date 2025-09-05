import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { wp, hp } from "../utils/Dimensions";

// Import all screens
import SignInScreen from "../screens/SignIn/SignInScreen";
import SignUpScreen from "../screens/SignUp/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPassword/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPassword/NewPasswordScreen";
import OTPVerificationScreen from "../screens/OTPVerification/OTPVerificationScreen";

// Define navigation types
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  NewPassword: { email: string };
  OTPVerification: {
    email: string;
    purpose: "signup" | "forgot-password" | "login";
  };
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  useEffect(() => {
    console.log("Tourzina App started 🚀");
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerShown: false, // Hide headers for custom navigation
            cardStyle: { backgroundColor: "#141416" }, // Match your app background
          }}
        >
          <Stack.Screen name="SignIn" component={SignInScreenWrapper} />
          <Stack.Screen name="SignUp" component={SignUpScreenWrapper} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreenWrapper}
          />
          <Stack.Screen
            name="NewPassword"
            component={NewPasswordScreenWrapper}
          />
          <Stack.Screen
            name="OTPVerification"
            component={OTPVerificationScreenWrapper}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Screen wrappers to handle navigation
function SignInScreenWrapper({ navigation }: any) {
  return (
    <SignInScreen
      onNavigateToSignUp={() => navigation.navigate("SignUp")}
      onGoBack={() => navigation.canGoBack() && navigation.goBack()}
      onForgotPassword={() => navigation.navigate("ForgotPassword")}
    />
  );
}

function SignUpScreenWrapper({ navigation }: any) {
  return (
    <SignUpScreen
      onNavigateToSignIn={() => navigation.navigate("SignIn")}
      onGoBack={() => navigation.canGoBack() && navigation.goBack()}
      onSignUpSuccess={(email: string) =>
        navigation.navigate("OTPVerification", { email, purpose: "signup" })
      }
    />
  );
}

function ForgotPasswordScreenWrapper({ navigation }: any) {
  return (
    <ForgotPasswordScreen
      onGoBack={() => navigation.navigate("SignIn")}
      onContinue={(email: string) =>
        navigation.navigate("NewPassword", { email })
      }
    />
  );
}

function NewPasswordScreenWrapper({ navigation, route }: any) {
  const { email } = route.params;

  return (
    <NewPasswordScreen
      email={email}
      onGoBack={() => navigation.navigate("ForgotPassword")}
      onSuccess={() => navigation.navigate("SignIn")}
    />
  );
}

function OTPVerificationScreenWrapper({ navigation, route }: any) {
  const { email, purpose } = route.params;

  return (
    <OTPVerificationScreen
      email={email}
      purpose={purpose}
      onGoBack={() => {
        if (purpose === "signup") {
          navigation.navigate("SignUp");
        } else {
          navigation.navigate("ForgotPassword");
        }
      }}
      onVerifySuccess={() => {
        if (purpose === "signup") {
          navigation.navigate("Home");
        } else {
          navigation.navigate("SignIn");
        }
      }}
    />
  );
}

export default ApplicationNavigator;
