"use client"
import React from "react"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import BackBtn from "../../components/backBtn/backBtn"

const UserCards = () => {
  const [defaultCardId, setDefaultCardId] = useState(1)

  const cards = [
    {
      id: 1,
      type: "VISA",
      balance: "$3,242.23",
      cardNumber: "9865 3507 4863 4235",
      expiry: "12/24",
      backgroundColor: "#4A90E2",
      isDefault: true,
    },
    {
      id: 2,
      type: "mastercard",
      balance: "$4,570.80",
      cardNumber: "5294 2434 4789 9568",
      expiry: "12/24",
      backgroundColor: "#2A2A2A",
      isDefault: false,
    },
  ]

  const handleSetDefaultCard = (cardId: number) => {
    setDefaultCardId(cardId)
  }

  const handleAddCard = () => {
    console.log("Add new card")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <BackBtn />
        <Text style={styles.headerTitle}>Your Card</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Cards List */}
      <View style={styles.cardsContainer}>
        {cards.map((card) => (
          <View key={card.id} style={styles.cardWrapper}>
            {/* Card */}
            <View style={[styles.card, { backgroundColor: card.backgroundColor }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <Text style={styles.cardType}>{card.type.toUpperCase()}</Text>
              </View>
              <Text style={styles.balance}>{card.balance}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                <Text style={styles.expiry}>{card.expiry}</Text>
              </View>
            </View>

            {/* Default Payment Method Selection */}
            <TouchableOpacity style={styles.defaultOption} onPress={() => handleSetDefaultCard(card.id)}>
              <View style={styles.radioContainer}>
                <View style={[styles.radioButton, defaultCardId === card.id && styles.radioButtonSelected]}>
                  {defaultCardId === card.id && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </View>
              <Text style={styles.defaultText}>Use as default payment method</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Add Card Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
    fontSize: 20,
    color: "#ffffff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  placeholder: {
    width: 30,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.8,
  },
  cardType: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 1,
  },
  balance: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardNumber: {
    fontSize: 16,
    color: "#ffffff",
    letterSpacing: 2,
  },
  expiry: {
    fontSize: 16,
    color: "#ffffff",
  },
  defaultOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  radioContainer: {
    marginRight: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  checkmark: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  defaultText: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.8,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "300",
  },
})

export default UserCards
