import React from "react";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const BackBtn = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return(
  <>
    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
      <Text style={styles.backIcon}>←</Text>
    </TouchableOpacity>
  </>
  )
};

const styles = StyleSheet.create({
    backButton: {
    height: 50,
    width: 50,
    backgroundColor: "#23262f",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 20,
    color: "#b1b5c3",
  },
});

export default BackBtn;
