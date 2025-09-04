import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  [Paths.Example]: undefined;
  [Paths.Startup]: undefined;
  [Paths.SignUpScreen]: undefined;
  [Paths.SignInScreen]: undefined;
  [Paths.ForgotPasswordScreen]: undefined;
  [Paths.NewPasswordScreen]: undefined;
  [Paths.OTPVerificationScreen]: undefined;
};
