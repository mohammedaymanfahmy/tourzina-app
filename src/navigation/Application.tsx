import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Paths } from "./paths";
import {
  Booking,
  HelpAndSupport,
  Home,
  LanguageScreen,
  Message,
  Notifications,
  PersonalInfo,
  Profile,
  Security,
  UserCards,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  NewPasswordScreen,
  OTPVerificationScreen,
} from "@/screens";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Paths.Profile} component={Profile} />
      <Stack.Screen name={Paths.PersonalInfo} component={PersonalInfo} />
      <Stack.Screen name={Paths.LanguageScreen} component={LanguageScreen} />
      <Stack.Screen name={Paths.Notifications} component={Notifications} />
      <Stack.Screen name={Paths.HelpAndSupport} component={HelpAndSupport} />
      <Stack.Screen name={Paths.Security} component={Security} />
      <Stack.Screen name={Paths.UserCards} component={UserCards} />
      <Stack.Screen name={Paths.SignIn} component={SignInScreen} />
      <Stack.Screen name={Paths.SignUp} component={SignUpScreen} />
      <Stack.Screen name={Paths.ForgotPassword} component={ForgotPasswordScreen} />
      <Stack.Screen name={Paths.NewPassword} component={NewPasswordScreen} />
      <Stack.Screen name={Paths.OTPVerification} component={OTPVerificationScreen} />
    </Stack.Navigator>
  );
}

export default function ApplicationNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={Paths.Home}
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === Paths.Home) iconName = "home";
              else if (route.name === Paths.Profile) iconName = "person";
              else if (route.name === Paths.Booking) iconName = "calendar";
              else if (route.name === Paths.Message) iconName = "chatbubble";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name={Paths.Home} component={Home} />
          <Tab.Screen name={Paths.Booking} component={Booking} />
          <Tab.Screen name={Paths.Message} component={Message} />
          <Tab.Screen name={Paths.Profile} component={ProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
