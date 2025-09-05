"use client";

import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import BackBtn from "../../components/backBtn/backBtn";

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const suggestedLanguages = [
    { id: 1, name: "English", nativeName: "English", flag: "🇺🇸" },
    { id: 2, name: "French", nativeName: "Français", flag: "🇫🇷" },
    { id: 3, name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  ];

  const otherLanguages = [
    { id: 4, name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
    { id: 5, name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  ];

  const handleLanguageSelect = (languageName: string) => {
    setSelectedLanguage(languageName);
  };

  const renderLanguageItem = (language: any, isLast = false) => (
    <TouchableOpacity
      key={language.id}
      style={[styles.languageItem, isLast && styles.lastLanguageItem]}
      onPress={() => handleLanguageSelect(language.name)}
    >
      <View style={styles.languageContent}>
        <Text style={styles.flag}>{language.flag}</Text>
        <Text style={styles.languageText}>{language.nativeName}</Text>
      </View>
      {selectedLanguage === language.name && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
       <BackBtn />
        <Text style={styles.headerTitle}>Language</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Suggested Languages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Languages</Text>
          <View style={styles.languageContainer}>
            {suggestedLanguages.map((language, index) =>
              renderLanguageItem(
                language,
                index === suggestedLanguages.length - 1
              )
            )}
          </View>
        </View>

        {/* Other Languages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Languages</Text>
          <View style={styles.languageContainer}>
            {otherLanguages.map((language, index) =>
              renderLanguageItem(language, index === otherLanguages.length - 1)
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  backArrow: {
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
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9ca4ab",
    marginBottom: 15,
  },
  languageContainer: {
    backgroundColor: "#23262f",
    borderRadius: 12,
    paddingVertical: 8,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  lastLanguageItem: {
    borderBottomWidth: 0,
  },
  languageContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "400",
  },
  checkmark: {
    fontSize: 18,
    color: "#4a90e2",
    fontWeight: "600",
  },
});

export default LanguageScreen;
