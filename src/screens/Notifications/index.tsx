"use client"

import React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Switch } from "react-native"
import BackBtn from "../../components/backBtn/backBtn"

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    newEvent: true,
    delivery: true,
    message: true,
    payment: true,
  })

  const handleToggle = (type: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const notificationItems = [
    { key: "newEvent", label: "New Event" },
    { key: "delivery", label: "Delivery" },
    { key: "message", label: "Message" },
    { key: "payment", label: "Payment" },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <BackBtn />
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Notifications Section */}
      <View style={styles.content}>
        <View style={styles.notificationsContainer}>
          <Text style={styles.sectionTitle}>Messages Notifications</Text>

          {notificationItems.map((item) => (
            <View key={item.key} style={styles.notificationItem}>
              <Text style={styles.notificationLabel}>{item.label}</Text>
              <Switch
                value={notifications[item.key as keyof typeof notifications]}
                onValueChange={() => handleToggle(item.key as keyof typeof notifications)}
                trackColor={{ false: "#3a3a3a", true: "#4a90e2" }}
                thumbColor={notifications[item.key as keyof typeof notifications] ? "#ffffff" : "#f4f3f4"}
                ios_backgroundColor="#3a3a3a"
              />
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
    backgroundColor: "#141416",
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
    paddingTop: 25,
  },
  notificationsContainer: {
    backgroundColor: "#23262f",
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3a",
  },
  notificationLabel: {
    fontSize: 16,
    color: "#ffffff",
  },
})

export default Notifications;
