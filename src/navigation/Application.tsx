import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './types';
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
import { Paths } from './paths';

const Stack = createStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Paths.Home} component={Home} />
          <Stack.Screen name={Paths.Profile} component={Profile} />
          <Stack.Screen name={Paths.Booking} component={Booking} />
          <Stack.Screen name={Paths.Message} component={Message} />
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
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
