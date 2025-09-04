import React from "react";
import { StyleSheet, ViewStyle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type OverlayProps = {
  children?: React.ReactNode;
  style?: ViewStyle; // optional custom styles
};

const Overlay = ({ children, style }: OverlayProps) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={["#110c1d", "#110c1dc4", "transparent"]}
        locations={[0, 0.4, 1]} // 0–0.6 = black, 0.6–1 = fade to transparent
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }} // top center
        style={[styles.overlay, style]} // merge default + custom styles
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    height: "100%",
    gap: 24,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 110,
    paddingHorizontal: 24,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
});

export default Overlay;
