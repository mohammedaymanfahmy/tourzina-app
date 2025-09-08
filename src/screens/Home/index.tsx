import React from "react";
import { StyleSheet, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Paths } from "@/navigation/paths";
import Button from "@/components/atoms/Button";


const Home = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.container}>Home</Text>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#ff0000ff",
    fontSize: 34,
    textAlign: "center",
    marginTop: 50,
  },

})
export default Home;
