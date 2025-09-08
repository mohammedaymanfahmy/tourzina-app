import React from "react";
import { StatusBar } from "expo-status-bar";
import ApplicationNavigator from "@/navigation/Application";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ApplicationNavigator />
    </>
  );
}
