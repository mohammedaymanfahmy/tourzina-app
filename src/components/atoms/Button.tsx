import React from "react";
import { StyleSheet, ViewStyle, Pressable, Text } from "react-native";
import colors from '../../colors/colors';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const Button = ({ title, onPress, style }: ButtonProps) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius:24,
    paddingHorizontal:16,
    paddingVertical:16,
    width:'100%',
    
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
});

export default Button;
