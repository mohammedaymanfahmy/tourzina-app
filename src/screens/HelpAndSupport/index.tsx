"use client"

import React from "react"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from "react-native"
import BackBtn from "../../components/backBtn/backBtn"
import FontAwesome from "react-native-vector-icons/FontAwesome";

const HelpAndSupport = () => {
  const [searchText, setSearchText] = useState("")
  const [expandedItems, setExpandedItems] = useState<number[]>([2]) // Third item expanded by default

  const faqItems = [
    {
      id: 1,
      question: "Lorem ipsum dolor sit amet",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit amet",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      id: 3,
      question: "Lorem ipsum dolor sit amet",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      id: 4,
      question: "Lorem ipsum dolor sit amet",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      id: 5,
      question: "Lorem ipsum dolor sit amet",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
  ]

  const toggleExpanded = (itemId: number) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const filteredItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchText.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackBtn />
        <Text style={styles.headerTitle}>Help and Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}><FontAwesome name="search" size={20} color="#78828a" /></Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* FAQ List */}
      <ScrollView style={styles.faqContainer} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => {
          const isExpanded = expandedItems.includes(item.id)
          return (
            <View key={item.id} style={styles.faqItem}>
              <TouchableOpacity
                style={[styles.questionContainer, isExpanded && styles.questionContainerExpanded]}
                onPress={() => toggleExpanded(item.id)}
              >
                <Text style={[styles.questionText, isExpanded && styles.questionTextExpanded]}>{item.question}</Text>
                <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>{isExpanded ? "⌄" : "⌄"}</Text>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}

              <View style={styles.separator} />
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141416",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 20,
    color: "#ffffff",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginRight: 30, // Compensate for back button
  },
  headerSpacer: {
    width: 30,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23262f",
    borderRadius: 35,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    color: "#666",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
  },
  faqContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  faqItem: {
    marginBottom: 5,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
  },
  questionContainerExpanded: {
    // No additional styling needed for expanded state
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    marginRight: 10,
  },
  questionTextExpanded: {
    color: "#4a90e2",
  },
  chevron: {
    fontSize: 16,
    color: "#666",
    transform: [{ rotate: "0deg" }],
  },
  chevronExpanded: {
    color: "#4a90e2",
    transform: [{ rotate: "180deg" }],
  },
  answerContainer: {
    paddingBottom: 15,
    paddingRight: 30,
  },
  answerText: {
    fontSize: 14,
    color: "#999",
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 5,
  },
})

export default HelpAndSupport
