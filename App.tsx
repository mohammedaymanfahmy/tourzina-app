import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import ApplicationNavigator from "./src/navigation/Application";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ApplicationNavigator />
    </>
  );
}
