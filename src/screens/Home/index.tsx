import React from "react";
import BottomBar from "../../components/bottomBar/bottomBar";
import { StyleSheet, Text } from 'react-native'

const Home = () => {
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
