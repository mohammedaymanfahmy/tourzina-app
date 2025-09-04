import React from "react";
import { StyleSheet, ViewStyle, ImageBackground } from "react-native";
import Swiper from "react-native-swiper";
import Onboarding from "../components/organisms/Onboarding";

const OnboardingScreen = () => {
  return (
      <Swiper>
        <ImageBackground source={require("../../assets/onboarding1.png")} style={styles.background}>
          <Onboarding title="Find and book a great experience." subtitle="Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet id sem." buttonTitle="Continue" />
        </ImageBackground>
        <ImageBackground source={require("../../assets/onboarding2.png")} style={styles.background}>
          <Onboarding title="Simple, Fast, Trusted  Booking" subtitle="fast booking , lowest price , pleasure and safe trips only with gebna roomie" buttonTitle="Continue" />
        </ImageBackground>
        <ImageBackground source={require("../../assets/onboarding3.png")} style={styles.background}>
          <Onboarding title="Where Comfort Meets Convenience" subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry." buttonTitle="Get Started"/>
        </ImageBackground>
      </Swiper>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingScreen;