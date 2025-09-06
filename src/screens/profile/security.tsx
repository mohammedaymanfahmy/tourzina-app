"use client"
import React from "react"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Switch } from "react-native"
import BackBtn from "../../components/backBtn/backBtn"

const Security = () => {
  const [securitySettings, setSecuritySettings] = useState({
    faceId: true,
    rememberPassword: true,
    touchId: true,
  })

  const handleToggle = (setting: keyof typeof securitySettings) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const securityOptions = [
    { id: "faceId", title: "Face ID", value: securitySettings.faceId },
    { id: "rememberPassword", title: "Remember Password", value: securitySettings.rememberPassword },
    { id: "touchId", title: "Touch ID", value: securitySettings.touchId },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <BackBtn />
        <Text style={styles.headerTitle}>Security</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Security Options */}
      <View style={styles.content}>
        <View style={styles.securityContainer}>
          {securityOptions.map((option, index) => (
            <View key={option.id}>
              <View style={styles.securityItem}>
                <Text style={styles.securityText}>{option.title}</Text>
                <Switch
                  value={option.value}
                  onValueChange={() => handleToggle(option.id as keyof typeof securitySettings)}
                  trackColor={{ false: "#3a3a3a", true: "#4a90e2" }}
                  thumbColor={option.value ? "#ffffff" : "#f4f3f4"}
                  ios_backgroundColor="#3a3a3a"
                />
              </View>
              {index < securityOptions.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131315",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: "#ffffff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  securityContainer: {
    backgroundColor: "#1f1f21",
    borderRadius: 12,
    paddingVertical: 8,
  },
  securityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  securityText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "400",
  },
  divider: {
    height: 1,
    backgroundColor: "#3a3a3a",
    marginHorizontal: 20,
  },
})

export default Security
