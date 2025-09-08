import React from "react";
import { StyleSheet, ViewStyle, View } from "react-native";
import Overlay from "../atoms/Overlay";
import AppTitle from "../atoms/title/AppTitle";
import Button from "../atoms/Button";

type OnboardingProps = {
  style?: ViewStyle;
  title: string;
  subtitle: string;
  buttonTitle: string;
   // optional custom styles
};

const Onboarding = ({ style, title, subtitle, buttonTitle }: OnboardingProps) => {
  return(
    <View style={[styles.container, style]}>
    <Overlay>
        <AppTitle type="title" content={title} />
        <AppTitle type="subtitle" content={subtitle} />
        <Button title={buttonTitle} />
    </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
  },
});

export default Onboarding;