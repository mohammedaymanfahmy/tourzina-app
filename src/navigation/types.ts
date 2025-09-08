import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  [Paths.SignUpScreen]: undefined;
  [Paths.SignInScreen]: undefined;
  [Paths.ForgotPasswordScreen]: undefined;
  [Paths.NewPasswordScreen]: undefined;
  [Paths.OTPVerificationScreen]: undefined;
  [Paths.Home]: undefined;
  [Paths.Profile]: undefined;
  [Paths.Booking]: undefined;
  [Paths.Message]: undefined;
  [Paths.PersonalInfo]: undefined;
  [Paths.LanguageScreen]: undefined;
  [Paths.Notifications]: undefined;
  [Paths.HelpAndSupport]: undefined;
  [Paths.Security]: undefined;
  [Paths.UserCards]: undefined;
  [Paths.SignIn]: undefined;
  [Paths.SignUp]: undefined;
  [Paths.ForgotPassword]: undefined;
  [Paths.NewPassword]: { email: string };
  [Paths.NavStack]: undefined;
  [Paths.OTPVerification]: {
    email: string;
    purpose: "signup" | "forgot-password" | "login";
  };

};
