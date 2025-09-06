import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BottomBar from "../../components/bottomBar/bottomBar";

import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigation = useNavigation<any>();

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    // Add your logout logic here
    console.log("User logged out");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const menuItems = [
    {
      id: 1,
      title: "Your Card",
      icon: <FontAwesome name="credit-card" size={20} color="#b1b5c3" />,
      onPress: () => navigation.navigate("UserCards" as never), 
    },
    {
      id: 2,
      title: "Security",
      icon: <FontAwesome name="shield" size={23} color="#b1b5c3" />,
      onPress: () => navigation.navigate("Security" as never),
    },
    {
      id: 3,
      title: "Notification",
      icon: <FontAwesome name="bell" size={20} color="#b1b5c3" />,
      onPress: () => navigation.navigate("Notifications" as never),
    },
    {
      id: 4,
      title: "Languages",
      icon: <FontAwesome name="globe" size={20} color="#b1b5c3" />,
      onPress: () => navigation.navigate("Language" as never),
    },
    {
      id: 5,
      title: "Help and Support",
      icon: <FontAwesome name="question" size={20} color="#b1b5c3" />,
      onPress: () => navigation.navigate("HelpAndSupport" as never),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../../assets/userphoto.png")}
              style={styles.avatarImg}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Yousef Ebada</Text>
            <Text style={styles.profileUsername}>Yousef_Ebada</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("PersonalInfo" as never)}
          >
            <FontAwesome name="edit" size={25} color="#b1b5c3" />
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>{item.icon}</View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogoutPress}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIcon}>
              <Text style={styles.questionMark}>?</Text>
            </View>

            <Text style={styles.modalTitle}>Are You Sure?</Text>
            <Text style={styles.modalSubtitle}>Do you want to log out ?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.logoutModalButton}
                onPress={handleConfirmLogout}
              >
                <Text style={styles.logoutModalText}>Log Out</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelLogout}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Fixed Bottom Navigation */}
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131315",
    paddingTop: StatusBar.currentHeight,
    // paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 120, // space so logout button doesn't hide under bottom nav
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
  headerTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 14,
    color: "#888",
  },
  editButton: {
    padding: 5,
  },
  settingsSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: "#ffffff",
  },
  chevron: {
    fontSize: 20,
    color: "#666",
  },
  logoutButton: {
    marginTop: 0,
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    width: "50%",
    borderRadius: 25,
    alignSelf: "center",
    paddingVertical: 10,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f41f52",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#2a2a2a",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#f41f52",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  questionMark: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff4757",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#b1b5c3",
    textAlign: "center",
    marginBottom: 30,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 15,
  },
  logoutModalButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ff4757",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutModalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff4757",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#4a90e2",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
